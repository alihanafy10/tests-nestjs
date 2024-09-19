import { z } from 'zod';

export const createCatSchema = z
  .object({
      name: z.string().optional(),
      email:z.string(),
    password: z.string(),
  }).strict()
  
  export const querySchema=z
  .object({
     
    age: z.string(),
    
  }).strict()