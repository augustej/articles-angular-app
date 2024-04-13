import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as ArticlesActions from '../../store/actions';
import {
  articlesSelector,
  errorSelector,
  isLoadingSelector,
  isArticlesEmptySelector,
} from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-articles-container',
  templateUrl: './articles-container.component.html',
  styleUrls: ['./articles-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesContainerComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isArticlesEmpty$: Observable<boolean>;
  error$: Observable<string | null>;
  articles$: Observable<ArticleInterface[]>;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppStateInterface>, private router: Router) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.articles$ = this.store.pipe(select(articlesSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isArticlesEmpty$ = this.store.pipe(select(isArticlesEmptySelector));
  }

  ngOnInit() {
    this.initializeArticlesIfEmpty();
  }

  initializeArticlesIfEmpty() {
    const emptyArticleSubscription = this.isArticlesEmpty$.subscribe(
      (isEmpty) => {
        if (isEmpty) this.store.dispatch(ArticlesActions.getArticles());
      }
    );

    this.subscription.add(emptyArticleSubscription);
  }

  navigateToCreateArticleContainer() {
    this.router.navigate(['/articles/create-new-article']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
