import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, map, take } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import {
  isArticlesEmptySelector,
  specificArticleSelector,
} from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';
import * as ArticlesActions from '../../store/actions';

@Component({
  selector: 'app-article-page-container',
  templateUrl: './article-page-container.component.html',
  styleUrls: ['./article-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageContainerComponent implements OnInit {
  article: ArticleInterface | undefined;
  isArticlesEmpty$: Observable<boolean>;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.isArticlesEmpty$ = this.store.pipe(select(isArticlesEmptySelector));
  }

  ngOnInit() {
    const routeSubscription = this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        map((id) => (id ? +id : null)),
        take(1)
      )
      .subscribe((id) => this.getArticleFromStore(id));

    this.subscription.add(routeSubscription);
  }

  initializeArticleIfEmpty(id: number) {
    const emptyArticleSubscription = this.isArticlesEmpty$.subscribe(
      (isEmpty) => {
        if (isEmpty) {
          this.store.dispatch(ArticlesActions.getArticle({ id }));
        }
      }
    );

    this.subscription.add(emptyArticleSubscription);
  }

  getArticleFromStore(id: number | null) {
    if (!id) {
      this.router.navigate(['/articles']);
      return;
    }

    this.initializeArticleIfEmpty(id);

    const storeSubscription = this.store
      .select(specificArticleSelector(id))
      .pipe(map((article) => (this.article = article)))
      .subscribe(() => this.cdr.markForCheck());

    this.subscription.add(storeSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
