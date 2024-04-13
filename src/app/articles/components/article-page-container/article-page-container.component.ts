import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map, take } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { specificArticleSelector } from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-article-page-container',
  templateUrl: './article-page-container.component.html',
  styleUrls: ['./article-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageContainerComponent implements OnInit {
  article: ArticleInterface | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}

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

  getArticleFromStore(id: number | null) {
    if (!id) {
      this.router.navigate(['/articles']);
      return;
    }

    const storeSubscription = this.store
      .select(specificArticleSelector(id))
      .pipe(map((article) => (this.article = article)))
      .subscribe();

    this.subscription.add(storeSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
