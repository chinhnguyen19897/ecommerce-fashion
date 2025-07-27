import prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const itemId = event.context.params?.itemId;

  if (!itemId) {
    throw createError({
      statusCode: 400,
      message: "Missing itemId",
    });
  }

  const cartItem = await prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });

  return cartItem;
});
