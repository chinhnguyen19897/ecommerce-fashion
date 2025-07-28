import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const itemId = event.context.params?.itemId;
  const body = await readBody(event);
  const {quantity} = body;

  if (!itemId || typeof quantity !== "number") {
    throw createError({
      statusCode: 400,
      message: "Invalid request",
    });
  }
  return prisma.cartItem.update({
    where: {
      id: Number(itemId),
    },
    data: {
      quantity: quantity,
    },
  });
});
