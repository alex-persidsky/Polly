// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a schema for each collection you'd like to validate.
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    // category: z.array(z.string()),
    category: z.string(),
    date: z.date(),
    author: z.enum(["Poly"]),
    description: z.string(),
    draft: z.boolean(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = { blog };