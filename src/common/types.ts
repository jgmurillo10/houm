export interface RecipeI {
  title: string;
  image: string;
  summary: string;
  id: number;
};

export interface IngredientI {
  id: number;
  image: string;
  originalString: string;
}
export interface RecipeExtendedI {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  extendedIngredients: IngredientI[];
  analyzedInstructions: {
    name: string;
    steps: {
      step: string;
    }[]
  }[];
  cookingMinutes: number;
  preparationMinutes: number;
  readyInMinutes: number;
  servings: number;
  spoonacularScore: number;
  healthScore: number;
}

export interface LinkI {
  text: string;
  url: string;
};

export interface HeroI {
  title: string;
  primary: LinkI;
  secondary: LinkI;
};

export interface PageI {
  label: string;
  route: string;
}

export interface OptionI {
  label: string;
  value: string;
}

export interface SearchParamsI {
  query: string;
  diet: OptionI | null;
  cuisine: string[];
  type: OptionI | null;
  number: number;
  offset: number;
}

export interface Indexable<T = any> {
  [key: string]: T;
}