export default defineNuxtPlugin(() => {
  const cartToken = useCookie("cart_token", {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  if (!cartToken.value) {
    cartToken.value = crypto.randomUUID();
  }
});
