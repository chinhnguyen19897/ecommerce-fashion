import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const { userId, fullName, phoneNumber, email, address, province, wards, totalPrice, items } =
    await readBody(event)

  if (!fullName || !phoneNumber || !email || !address || !items || items.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
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
          amount: parseInt(item.product.price)
        }))
      }
    },
    include: {
      items: true
    }
  })

  return {
    message: 'Order created successfully.',
    order
  }
})
