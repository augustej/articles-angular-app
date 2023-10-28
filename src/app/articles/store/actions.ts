import { createAction, props } from '@ngrx/store';
import { ArticleInterface } from '../types/article.interface';

export const getArticles = createAction('[Articles] Get Articles');

export const getArticlesSuccess = createAction(
  '[Articles] Get Articles Success',
  props<{ articles: ArticleInterface[] }>()
);

export const getArticlesFailure = createAction(
  '[Articles] Get Articles Failure',
  props<{ error: string }>()
);

export const addArticle = createAction(
  '[Articles] Add Article',
  props<{ article: ArticleInterface }>()
);

export const addArticleSuccess = createAction(
  '[Articles] Add Article Success',
  props<{ article: ArticleInterface }>()
);

export const addArticleFailure = createAction(
  '[Articles] Add Article Failure',
  props<{ error: string }>()
);
