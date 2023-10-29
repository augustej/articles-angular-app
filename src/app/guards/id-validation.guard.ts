import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { articlesSelector } from '../articles/store/selectors';
import { ArticleInterface } from '../articles/types/article.interface';
import { AppStateInterface } from '../types/appState.interface';

export const IdValidationGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppStateInterface>);
  const router = inject(Router);

  const id = route.paramMap.get('id');
  if (!id) return true;

  return store.select(articlesSelector).pipe(
    map((articles) => {
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
