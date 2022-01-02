export interface RecipeI {
  title: string;
  image: string;
  summary: string;
  id: number;
};

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
export interface SearchParamsI {
  query: string;
  diet: string;
  cuisine: string;
  number: number;
  offset: number;
}
