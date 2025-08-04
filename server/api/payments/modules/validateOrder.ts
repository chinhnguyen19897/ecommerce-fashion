import {z} from 'zod';

export const validateOrder = z.object({
    orderId: z.number().positive('orderId is should be a number'),
})

export const validateCustomerOrder = z.object({
    orderId: z.number().positive('orderId is should be a number'),
    userId: z.number().positive('userId is should be a number'),
})