import { z } from 'zod';

export const enquiryStatusEnum = z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED']);

export const createEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name cannot be empty')
    .max(100, 'Name is too long (maximum 100 characters)'),
  company: z
    .string()
    .trim()
    .min(1, 'Company name cannot be empty')
    .max(150, 'Company name is too long (maximum 150 characters)'),
  country: z
    .string()
    .trim()
    .min(1, 'Country cannot be empty')
    .max(100, 'Country name is too long (maximum 100 characters)'),
  email: z
    .string()
    .trim()
    .min(1, 'Email cannot be empty')
    .email('Please enter a valid email address')
    .max(150, 'Email is too long'),
  phone: z
    .string()
    .trim()
    .max(50, 'Phone number is too long')
    .optional()
    .or(z.literal('')),
  product: z
    .string()
    .trim()
    .max(150, 'Product name is too long')
    .optional()
    .or(z.literal('')),
  application: z
    .string()
    .trim()
    .max(150, 'Application is too long')
    .optional()
    .or(z.literal('')),
  quantity: z
    .string()
    .trim()
    .max(100, 'Quantity is too long')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(3000, 'Message is too long (maximum 3000 characters)')
});

export const updateEnquiryStatusSchema = z.object({
  status: enquiryStatusEnum
});

export type CreateEnquirySchemaType = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryStatusSchemaType = z.infer<typeof updateEnquiryStatusSchema>;
