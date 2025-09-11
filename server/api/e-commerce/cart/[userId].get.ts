import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId

  if (!userId) {
    throw createError({
      statusCode: 400,
      message: 'Missing userId'
    })
  }

  const cart = await prisma.cart.findFirst({
    where: {
      userId: Number(userId)
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })
  if (!cart) {
    return {
      items: [],
      totalAmount: 0
    }
  }
  const totalAmount = cart.items.reduce((acc, item: any) => {
    return acc + item.quantity * item.product.price
  }, 0)

  return {
    ...cart,
    totalAmount
  }
})
