import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {userId, productId, quantity} = body;
  const cartToken = getCookie(event, "cart_token");

  if (!cartToken) {
    throw createError({statusCode: 400, message: "Missing cart token"});
  }
  if (!productId || !quantity) {
    throw createError({
      statusCode: 400,
      message: "Missing required parameters",
    });
  }

  let cart;
  if (userId) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        items: true,
      },
    });
  } else if (cartToken) {
    cart = await prisma.cart.findUnique({
      where: {cartToken},
      include: {items: true},
    });
  }

  if (!cart && !userId) {
    cart = await prisma.cart.create({
      data: {
        cartToken: cartToken,
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
  } else if (!cart && userId) {
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
    const existItem = cart?.items.find((i: any) => i.productId === productId);
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
          cartId: cart?.id,
          productId: productId,
          quantity: quantity,
        },
      });
    }
  }

  return {
    cartId: cart?.id,
    cartToken: cart?.cartToken,
    message: "Cart added successfully",
  };
});
