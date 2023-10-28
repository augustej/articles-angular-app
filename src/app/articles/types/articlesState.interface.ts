import { ArticleInterface } from './article.interface';

export interface ArticlesStateInterface {
  articles: ArticleInterface[];
  isLoading: boolean;
  error: string | null;
}
