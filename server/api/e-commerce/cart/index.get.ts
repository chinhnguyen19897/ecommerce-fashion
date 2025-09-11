import { getCookie } from 'h3'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const cartToken = getCookie(event, 'cart_token')

  if (!cartToken) {
    throw createError({
      statusCode: 400,
      message: 'Missing cart token'
    })
  }

  const cart = await prisma.cart.findUnique({
    where: {
      cartToken: cartToken
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true
            }
          }
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
