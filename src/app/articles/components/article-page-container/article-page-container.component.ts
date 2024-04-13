import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { specificArticleSelector } from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-article-page-container',
  templateUrl: './article-page-container.component.html',
  styleUrls: ['./article-page-container.component.scss'],
})
export class ArticlePageContainerComponent {
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {}

  article: ArticleInterface | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return this.router.navigate(['/articles']);

      this.getArticleFromStore(+id);
      return;
    });
  }

  getArticleFromStore(id: number) {
    this.store
      .select(specificArticleSelector(id))
      .pipe(
        map((article) => {
          this.article = article;
        })
      )
      .subscribe();
  }
}
