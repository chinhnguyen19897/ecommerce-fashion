import prisma from '@/lib/prisma'

export default defineEventHandler(async (event) => {
  const { items, amount, orderId } = await readBody(event)
  if (amount <= 0) {
    throw createError({ statusCode: 422, message: 'Amount must be greater than zero' })
  }
  const payment = await prisma.payment.create({
    data: {
      amount: parseInt(amount.toString()),
      status: 'PENDING',
      orderId: orderId
    }
  })
  return {
    message: 'Payment created successfully',
    payment
  }
})
