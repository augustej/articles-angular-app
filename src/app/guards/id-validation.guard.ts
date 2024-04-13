import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { articlesSelector } from '../articles/store/selectors';
import { ArticleInterface } from '../articles/types/article.interface';
import { AppStateInterface } from '../types/appState.interface';

export const IdValidationGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppStateInterface>);
  const router = inject(Router);
  const TOTAL_ARTICLES_COUNT = 100;

  const id = route.paramMap.get('id');
  console.log('id', id);
  if (!id) return true;

  return store.select(articlesSelector).pipe(
    take(1),
    map((articles) => {
      if (articles.length === 0 && +id <= TOTAL_ARTICLES_COUNT) return true; // if article is requested directly by id

      const lastTenArticles = articles.slice(-10);
      const isValidId = lastTenArticles.some(
        (article: ArticleInterface) => article.id === +id
      );

      if (!isValidId) {
        return router.createUrlTree(['/not-found']);
      }
      return true;
    })
  );
};
