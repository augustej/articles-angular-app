import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesContainerComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  articles$: Observable<ArticleInterface[]>;
  isArticlesEmpty: boolean | undefined;
  private subscription: Subscription = new Subscription();

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
    const emptyArtcileSubscription = this.articles$
      .pipe(map((articles) => articles.length === 0))
      .subscribe((isEmpty) => (this.isArticlesEmpty = isEmpty));

    this.subscription.add(emptyArtcileSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
