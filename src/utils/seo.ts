import type { CollectionEntry } from 'astro:content';

export interface RecipeSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image?: string;
  author?: {
    '@type': string;
    name: string;
  };
  datePublished?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeYield?: string;
  recipeCategory?: string[];
  keywords?: string;
  nutrition?: {
    '@type': string;
    calories?: string;
    proteinContent?: string;
    carbohydrateContent?: string;
    fatContent?: string;
  };
  recipeIngredient?: string[];
  recipeInstructions?: Array<{
    '@type': string;
    text: string;
  }>;
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    ratingCount: string;
  };
}

export function generateRecipeSchema(recipe: CollectionEntry<'recipes'>, siteUrl: string): RecipeSchema {
  const { title, description, thumbnail, prepTime, cookTime, timeEstimate, portions, categories, tags, ingredients, steps, nutritionalInfo } = recipe.data;

  const totalMinutes = prepTime && cookTime ? prepTime + cookTime : timeEstimate;
  const imageUrl = thumbnail ? new URL(thumbnail.src, siteUrl).href : undefined;

  const schema: RecipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    description: description,
  };

  if (imageUrl) {
    schema.image = imageUrl;
  }

  schema.author = {
    '@type': 'Organization',
    name: 'Smakushi'
  };

  if (prepTime) {
    schema.prepTime = `PT${prepTime}M`;
  }

  if (cookTime) {
    schema.cookTime = `PT${cookTime}M`;
  }

  if (totalMinutes) {
    schema.totalTime = `PT${totalMinutes}M`;
  }

  if (portions) {
    schema.recipeYield = `${portions} porcji`;
  }

  if (categories && categories.length > 0) {
    schema.recipeCategory = categories;
  }

  if (tags && tags.length > 0) {
    schema.keywords = tags.join(', ');
  }

  if (nutritionalInfo) {
    schema.nutrition = {
      '@type': 'NutritionInformation',
    };

    if (nutritionalInfo.calories) {
      schema.nutrition.calories = `${nutritionalInfo.calories} calories`;
    }

    if (nutritionalInfo.protein) {
      schema.nutrition.proteinContent = `${nutritionalInfo.protein}g`;
    }

    if (nutritionalInfo.carbs) {
      schema.nutrition.carbohydrateContent = `${nutritionalInfo.carbs}g`;
    }

    if (nutritionalInfo.fat) {
      schema.nutrition.fatContent = `${nutritionalInfo.fat}g`;
    }
  }

  if (ingredients && ingredients.length > 0) {
    schema.recipeIngredient = ingredients.map(ing => `${ing.amount} ${ing.name}`);
  }

  if (steps && steps.length > 0) {
    schema.recipeInstructions = steps.map(step => ({
      '@type': 'HowToStep',
      text: step
    }));
  }

  return schema;
}

export function generateBreadcrumbSchema(items: Array<{ label: string; href?: string }>, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: new URL(item.href, siteUrl).href })
    }))
  };
}
