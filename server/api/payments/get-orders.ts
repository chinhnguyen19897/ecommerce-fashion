import prisma from "~/lib/prisma";


export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const orderId = query?.orderId as string;
    const orderNumberId = parseInt(orderId)
    const result = validateOrder.safeParse({orderId: orderNumberId});
    if(!result.success) {
        throw new createError({
            statusCode: 400,
            statusMessage: 'Validation Failed',
                        data: result.error.flatten(),

        })    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderNumberId,
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