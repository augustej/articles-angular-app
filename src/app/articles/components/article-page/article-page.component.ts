import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { specificArticleSelector } from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent {
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {}

  article: ArticleInterface | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.store
        .select(specificArticleSelector(+id))
        .pipe(
          map((article) => {
            this.article = article;
          })
        )
        .subscribe();
    });
  }
}
