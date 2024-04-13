import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ArticlesService } from '../services/articles.service';
import * as ArticlesActions from './actions';

@Injectable()
export class ArticlesEffects {
  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.getArticles),
      mergeMap(() => {
        return this._articlesService.getArticles().pipe(
          map((articles) => ArticlesActions.getArticlesSuccess({ articles })),
          catchError((error) =>
            of(ArticlesActions.getArticlesFailure({ error: error }))
          )
        );
      })
    )
  );

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.getArticle),
      mergeMap(({ id }) => {
        return this._articlesService.getArticle(id).pipe(
          map((article) => ArticlesActions.getArticleSuccess({ article })),
          catchError((error) =>
            of(ArticlesActions.getArticleFailure({ error: error }))
          )
        );
      })
    )
  );

  addArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.addArticle),
      mergeMap(({ article }) => {
        return this._articlesService.addArticle(article).pipe(
          map((newArticle) =>
            ArticlesActions.addArticleSuccess({ article: newArticle })
          ),
          catchError((error) =>
            of(ArticlesActions.addArticleFailure({ error: error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private _articlesService: ArticlesService
  ) {}
}
