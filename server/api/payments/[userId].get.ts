export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const orderId = query?.orderId as string;
    const userId = query?.userId as string;
    const orderIdNumber  = parseInt(orderId);
    const userIdNumber = parseInt(userId);
    const result = await validateCustomerOrder.safeParse({orderId: orderIdNumber, userId: userIdNumber});
    if(!result.success) {
        throw new createError({
            statusCode: 400,
            statusMessage: 'Validation Failed',
            data: result.error.flatten(),
        })
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: userId,
        },
        include: {
            items: {
                include: {
                    product: true
                }
            },
            payment: true,
        }
    })
    return {order}
})