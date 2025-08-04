import prisma from '@/lib/prisma';

export default defineEventHandler(async (event) => {
    const {userId, fullName, phoneNumber, email, address, province, wards, paymentsMethod, totalPrice, items} = await readBody(event)

    if(!fullName || !phoneNumber || !email || !address || !province || !wards || !paymentsMethod || !items || items.length === 0) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const order = await prisma.order.create({
            data: {
                userId: userId || null,
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email,
                address: address,
                totalPrice: totalPrice,
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,}))
                }
            },
            include: {
                items: true,
            }
    });
    const payment = await prisma.payment.create({
          data: {
            method: paymentsMethod,
            amount: totalPrice,
            status: "PENDING",
            order: {
              connect: { id: order.id }
            }
          }
        })
    await prisma.order.update({
  where: { id: order.id },
  data: {
    paymentId: payment.id
  }
})
    return {
        message: 'Order created successfully.',
        order
    }
})