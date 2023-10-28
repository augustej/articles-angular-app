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
  on(ArticlesActions.getArticles, (state) => ({ ...state, isLoading: true }))
);
