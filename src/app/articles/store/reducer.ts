import { createReducer, on } from '@ngrx/store';
import { ArticlesStateInterface } from '../types/articlesState.interface';
import * as ArticlesActions from './actions';

export const initialState: ArticlesStateInterface = {
  articles: [],
  isLoading: false,
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(ArticlesActions.getArticles, (state) => ({ ...state, isLoading: true })),

  on(ArticlesActions.getArticlesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    articles: action.articles,
  })),

  on(ArticlesActions.getArticlesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(ArticlesActions.addArticle, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(ArticlesActions.addArticleSuccess, (state, { article }) => ({
    ...state,
    isLoading: false,
    articles: [...state.articles, article],
  })),

  on(ArticlesActions.addArticleFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
