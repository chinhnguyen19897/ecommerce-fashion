import prisma from "~/lib/prisma";
import createProduct from "~/server/api/admin/product/create-product";
import {reviewSchema} from "~/server/api/e-commerce/product/modules/validateReview";

export default defineEventHandler(async (event) => {

  const {userId, starNumber, productId, comment} = await readBody(event)

  const result = reviewSchema.safeParse({comment})

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Failed',
      data: result.error.flatten()
    })
  }
  const customerReview = await prisma.productReview.findFirst({
    where: {
      productId: productId,
      userId: userId
    }
  })
  if (customerReview) {
    throw createError({
      statusCode: 422,
      message: 'You already review this product'
    })
  }

  await prisma.productReview.create({
    data: {
      userId: userId,
      starNumber: starNumber,
      productId: productId,
      comment: comment
    }
  })

  const productStar = await prisma.productStar.findFirst({
    where: {
      productId: productId
    }
  })
  await createProductStarPercent(productId, starNumber)
  if (productStar) {
    const actualReceivedStar = productStar?.receivedStars
    const updateStars = actualReceivedStar + starNumber
    await prisma.productStar.update({
      where: {
        id: productStar?.id
      },
      data: {
        receivedStars: updateStars
      }
    })
  } else {
    await prisma.productStar.create({
      data: {
        receivedStars: starNumber,
        productId: productId
      }
    })
  }

  return {
    message: 'Review saved successfully'
  }

})

async function createProductStarPercent(productId: number, starNumber: number) {
  const starPercentExist = await prisma.productStarPercent.findFirst({
    where: {
      productId: productId,
      star: starNumber
    }
  })

  if (starPercentExist) {
    const nbrTimes = starPercentExist?.times
    const updateTimes = nbrTimes + 1
    await prisma.productStarPercent.update({
      where: {
        id: starPercentExist?.id
      },
      data: {
        times: updateTimes,
        productId: productId,
        star: starNumber
      }
    })
  } else {
    await prisma.productStarPercent.create({
      data: {
        times: 1,
        productId: productId,
        star: starNumber
      }
    })
  }
}