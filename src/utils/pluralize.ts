type PluralForm = {
  one: string;
  few: string;
  many: string;
};

const PLURAL_FORMS: Record<string, PluralForm> = {
  recipe: {
    one: 'przepis',
    few: 'przepisy',
    many: 'przepisów',
  },
  category: {
    one: 'kategorię',
    few: 'kategorie',
    many: 'kategorii',
  },
  portion: {
    one: 'porcja',
    few: 'porcje',
    many: 'porcji',
  },
};

export function pluralize(count: number, key: keyof typeof PLURAL_FORMS): string {
  const forms = PLURAL_FORMS[key];

  if (count === 1) return forms.one;
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return forms.few;
  }
  return forms.many;
}
