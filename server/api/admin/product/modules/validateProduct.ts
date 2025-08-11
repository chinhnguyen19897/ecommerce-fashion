import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string({
      error: 'Product Name is required',
      invalid_type_error: 'Product Name must be a string'
    })
    .min(3, 'Product Name must be at least 3 characters long'),

  price: z.number().positive('Price should be greather than 0'),
  categoryId: z.number().positive('Category should be greather than 0')
})

export const deleteProductSchema = z.object({
  id: z.number().positive('id should be a number')
})
