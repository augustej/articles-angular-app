import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.articles;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const articlesSelector = createSelector(
  selectFeature,
  (state) => state.articles
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
