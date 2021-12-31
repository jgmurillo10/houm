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
