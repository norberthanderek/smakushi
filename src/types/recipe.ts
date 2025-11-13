export interface RecipeMetadata {
  title: string;
  description: string;
  thumbnail: string;
  categories: string[];
  timeEstimate?: number;
  prepTime?: number;
  cookTime?: number;
  portions: number;
  featured: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  steps: string[];
  tags?: string[];
  nutritionalInfo?: NutritionalInfo;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}
