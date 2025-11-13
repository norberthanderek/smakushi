export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'badge-soft badge-success',
  medium: 'badge-soft badge-warning',
  hard: 'badge-soft badge-error',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'łatwy',
  medium: 'średni',
  hard: 'trudny',
};

export function getDifficultyColor(difficulty: Difficulty): string {
  return DIFFICULTY_COLORS[difficulty];
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  return DIFFICULTY_LABELS[difficulty];
}
