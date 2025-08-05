import {z} from 'zod';

export const validateOrder = z.object({
    orderId: z.number().positive('orderId is should be a number'),
})

export const validateCustomerOrder = z.object({
    orderId: z.number().positive('orderId is should be a number'),
    userId: z.number().positive('userId is should be a number'),
})

export const orderSchema = z.object({
    userId: z.number().positive().optional(),
    fullName: z.string({
        error: "fullName is required",
    }),
phoneNumber: z.string({
    error: "phoneNumber is required",
}),
email: z.string({
    error: "email is required",
}),
address: z.string({
    error: "address is required",
}),
totalPrice: z.number({
    error: "totalPrice is required",
}),
items: z.array(z.object({
    productId: z.number().positive("productId is required"),
    quantity: z.number().positive("quantity is required"),
    product: z.object({
    price: z.string().or(z.number())
  })
  })),
})