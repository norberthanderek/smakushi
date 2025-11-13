import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import slugify from 'slugify';

export type Recipe = CollectionEntry<'recipes'>;

export async function getAllRecipes(): Promise<Recipe[]> {
  return await getCollection('recipes', ({ id }) => {
    return !id.startsWith('.');
  });
}

export function slugifyCategory(category: string): string {
  return slugify(category, {
    lower: true,
    strict: true,
    locale: 'pl'
  });
}

export function extractCategories(recipes: Recipe[]): string[] {
  return [...new Set(recipes.flatMap(recipe => recipe.data.categories))];
}

export function filterRecipesByCategory(recipes: Recipe[], categorySlug: string): Recipe[] {
  return recipes.filter(recipe =>
    recipe.data.categories.some(cat => slugifyCategory(cat) === categorySlug)
  );
}

export function getCategoryBySlug(recipes: Recipe[], categorySlug: string): string | undefined {
  const allCategories = extractCategories(recipes);
  return allCategories.find(cat => slugifyCategory(cat) === categorySlug);
}

export function getCategoryCount(recipes: Recipe[]): Map<string, number> {
  const categoryCounts = new Map<string, number>();

  recipes.forEach(recipe => {
    recipe.data.categories.forEach(category => {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });
  });

  return categoryCounts;
}
