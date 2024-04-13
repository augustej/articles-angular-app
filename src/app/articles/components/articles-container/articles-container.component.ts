import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as ArticlesActions from '../../store/actions';
import {
  articlesSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-articles-container',
  templateUrl: './articles-container.component.html',
  styleUrls: ['./articles-container.component.scss'],
})
export class ArticlesContainerComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  articles$: Observable<ArticleInterface[]>;
  isArticlesEmpty: boolean | undefined;

  constructor(private store: Store<AppStateInterface>, private router: Router) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.articles$ = this.store.pipe(select(articlesSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.checkIfArticlesEmpty();
  }

  ngOnInit(): void {
    if (this.isArticlesEmpty) {
      this.store.dispatch(ArticlesActions.getArticles());
    }
  }

  navigateToCreateArticleContainer() {
    this.router.navigate(['/articles/create-new-article']);
  }

  checkIfArticlesEmpty() {
    this.articles$
      .pipe(
        map((articles) => {
          return articles.length === 0;
        })
      )
      .subscribe((isEmpty) => {
        this.isArticlesEmpty = isEmpty;
      });
  }
}