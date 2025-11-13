import { defineCollection, z } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: image().optional(),
    categories: z.array(z.string()),
    timeEstimate: z.number().optional(),
    prepTime: z.number().optional(),
    cookTime: z.number().optional(),
    portions: z.number(),
    featured: z.boolean().default(false),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    ingredients: z.array(z.object({
      name: z.string(),
      amount: z.string(),
    })),
    steps: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    nutritionalInfo: z.object({
      calories: z.number().optional(),
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fat: z.number().optional(),
    }).optional(),
  }).refine(
    (data) => data.timeEstimate || (data.prepTime && data.cookTime),
    {
      message: "Either timeEstimate or both prepTime and cookTime must be provided",
    }
  ),
});

export const collections = {
  recipes: recipesCollection,
};
