import prisma from "~/lib/prisma";
import { signUpSchema } from "./modules/validateUser";
import { hashPassword } from "./modules/brcypt";
import { USER_EMAIL_TYPE, USER_ROLE } from "~/constants/auth/user.constant";
import { generateOtp } from "./modules/generateOtpCode";
import { sendEmailVerification } from "./modules/sendEmailVerification";
export default defineEventHandler(async (event) => {
  const { email, name, password } = await readBody(event);
  const result = signUpSchema.safeParse({ email, name, password });

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation User",
      data: result.error.flatten(),
    });
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) {
    throw createError({
      statusCode: 400,
      statusMessage: "This email is already been taken",
    });
  }

  const otpCode = generateOtp();
  const hashPwd = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      isValidEmail: USER_EMAIL_TYPE.INVALID_EMAIL,
      otpCode: otpCode,
      password: hashPwd,
      role: USER_ROLE.CUSTOMER,
    },
  });

  await sendEmailVerification(email, otpCode);
  return { message: "User created successfully", user, redirect: true };
});
