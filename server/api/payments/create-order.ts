import prisma from '@/lib/prisma'
import {orderSchema} from './modules/validateOrder';
export default defineEventHandler(async (event) => {
  const { userId, fullName, phoneNumber, email, address, province, wards, totalPrice, items } =
    await readBody(event)
  const result = orderSchema.safeParse({userId, fullName, phoneNumber, email, address,  totalPrice, items})
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields',
      data: result.error,
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
    const orderNumber = `ORD-${String(order.id).padStart(6, '0')}` // VD: ORD-000123
const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: { orderNumber }
  })

  return {
    message: 'Order created successfully.',
    order: {
      ...updatedOrder,
      items: order.items
    }
  }
})
