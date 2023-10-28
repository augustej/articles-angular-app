import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as ArticlesActions from '../../store/actions';
import {
  articlesSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  articles$: Observable<ArticleInterface[]>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.articles$ = this.store.pipe(select(articlesSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(ArticlesActions.getArticles());
  }

  added() {
    this.store.dispatch(
      ArticlesActions.addArticle({
        article: {
          id: '123',
          imageUrl: 'bla',
          title: 'strin',
          description: 'string',
        },
      })
    );
  }
}
