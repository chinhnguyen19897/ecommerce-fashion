import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.category.findMany()
    return {categories}
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Server error"
    })
  }
})