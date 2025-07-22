import prisma from "~/lib/prisma";
import {isArray} from "lodash-es"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = query?.search as string
  const page = parseInt(query?.page as string) || 1
  const limit = parseInt(query?.limit as string) || 10

  const filters = []

  const categories = isArray(query?.categories) ? query?.categories : (query?.categories as string || '').split(',').map(Number).filter(i => i > 0)
  const colors = isArray(query?.colors) ? query?.colors : (query?.colors as string || '').split(',').filter(i => i !== '')
  const prices = isArray(query?.prices) ? query?.prices : (query?.prices as string || '').split(',').map(Number).filter(i => i > 0)

  if (categories.length > 0) {
    filters.push({categoryId: {in: categories}})
  }

  if (colors.length > 0) {
    filters.push({color: {in: colors}})
  }

  if (prices.length === 2) {
    filters.push({price: {gte: prices[0], lte: prices[1]}})
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: filters.length > 0 ?
        {AND: filters} : {},
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        category: true,
        images: true,
        stars: true,
        _count: {
          select: {
            reviews: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit
    }),

    prisma.product.count({
      where: search ? {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      } : {}
    })
  ])

  const starRatingFilter = query?.starRating ?
    parseInt(query.starRating.toString()) : NaN
  const newProductArray = !Number.isNaN(starRatingFilter) ? products.filter(item => {
    if (isArray(item.stars)) {
      if (item.stars.length > 0) {
        if (item.stars[0].receivedStars === (starRatingFilter * item._count.reviews)) {
          return item
        }
        if (item.stars[0].receivedStars === ((starRatingFilter * item._count.reviews) + 1)) {
          return item
        }
      }
    }
  }) : products
  return {
    products: newProductArray,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
})