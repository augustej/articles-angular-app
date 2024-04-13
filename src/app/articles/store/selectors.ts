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

export const specificArticleSelector = (articleId: number) =>
  createSelector(articlesSelector, (articles) =>
    articles.find((article) => article.id === articleId)
  );

export const lastIdSelector = createSelector(articlesSelector, (articles) => {
  if (articles.length > 0) {
    return articles[articles.length - 1].id;
  }
  return null;
});

export const isArticlesEmptySelector = createSelector(
  articlesSelector,
  (articles) => articles.length < 2 // single article can be preloaded if user navigates to article page directly
);
