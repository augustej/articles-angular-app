import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as ArticlesActions from '../../store/actions';
import { articlesSelector } from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent {
  articles$: Observable<ArticleInterface[]>;
  isArticlesEmpty: boolean | undefined;

  constructor(private router: Router, private store: Store<AppStateInterface>) {
    this.articles$ = this.store.pipe(select(articlesSelector));

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

  ngOnInit() {
    if (this.isArticlesEmpty)
      this.store.dispatch(ArticlesActions.getArticles());
  }

  added() {
    this.store.dispatch(
      ArticlesActions.addArticle({
        article: {
          id: 123,
          imageUrl: 'bla',
          title: 'strin',
          description: 'string',
        },
      })
    );
    this.articles$.subscribe(() => {
      this.router.navigate(['/articles']);
    });
  }
}
