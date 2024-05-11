export interface IPost {
  // id: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
}

export interface IPostMarkdown {
  [key: string]: any;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
}