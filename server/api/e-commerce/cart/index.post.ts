import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, productId, quantity } = body;

  if (!userId || !productId || !quantity) {
    throw createError({
      statusCode: 400,
      message: "Missing required parameters",
    });
  }

  let cart = await prisma.cart.findFrist({
    where: {
      userId: userId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: userId,
        items: {
          create: {
            productId: productId,
            quantity: quantity,
          },
        },
      },
      include: {
        items: true,
      },
    });
  } else {
    const existItem = cart.items.find((i: any) => i.productId === productId);
    if (existItem) {
      await prisma.cartItem.update({
        where: {
          id: existItem.id,
        },
        data: {
          quantity: existItem.quantity + quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });
    }
  }

  return { message: "Cart added successfully" };
});
