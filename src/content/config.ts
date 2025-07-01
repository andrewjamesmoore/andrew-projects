import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    publishDate: z.string().transform((str) => new Date(str)),
  }),
});

export const collections = {
  blog: blogCollection,
};
