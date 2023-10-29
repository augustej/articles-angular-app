import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as ArticlesActions from '../../store/actions';
import {
  articlesSelector,
  errorSelector,
  lastIdSelector,
} from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent {
  articles$: Observable<ArticleInterface[]>;
  isArticlesEmpty: boolean | undefined;
  lastId: number | null | undefined;
  error$: Observable<string | null>;

  titleError = '';
  descriptionError = '';
  fieldRequiredMsg = 'Required field missing.';
  maxLengthMsg = 'Too many symbols. Max length: ';
  minLengthMsg = 'Not enought symbols. Min length: ';

  newArticleForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),

    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(300),
    ]),

    imageUrl: new FormControl(''),
  });

  constructor(private router: Router, private store: Store<AppStateInterface>) {
    this.articles$ = this.store.pipe(select(articlesSelector));
    const lastId$ = this.store.pipe(select(lastIdSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.checkIfArticlesEmpty();
    if (lastId$) this.getLastId(lastId$);
  }

  ngOnInit() {
    if (this.isArticlesEmpty)
      this.store.dispatch(ArticlesActions.getArticles());
  }

  submitForm() {
    this.resetErrors();

    if (this.newArticleForm.invalid) {
      this.displayErrors();
      return;
    }

    this.addArticleToStore();

    this.articles$.subscribe(() => {
      this.router.navigate(['/articles']);
    });
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

  // get id of last article in store
  getLastId(lastId$: Observable<number | null>) {
    lastId$
      .pipe(
        map((id) => {
          return id ? id : null;
        })
      )
      .subscribe((id) => (this.lastId = id));
  }

  addArticleToStore() {
    this.store.dispatch(
      ArticlesActions.addArticle({
        article: this.createArticleObject(),
      })
    );
  }

  createArticleObject(): ArticleInterface {
    let newId: number = 0;

    if (this.lastId) {
      newId = this.lastId + 1;
    }

    const article = { ...this.newArticleForm.value, id: newId };

    return article as ArticleInterface;
  }

  resetErrors() {
    this.titleError = '';
    this.descriptionError = '';
  }

  displayErrors() {
    this.titleError = this.getErrorMessage('title');
    this.descriptionError = this.getErrorMessage('description');
  }

  getErrorMessage(fieldName: string): string {
    const errors = this.newArticleForm.get(fieldName)?.errors;

    if (errors) {
      if (errors['required']) {
        return this.fieldRequiredMsg;
      }
      if (errors['minlength']) {
        return `${this.minLengthMsg} ${errors['minlength']['requiredLength']}`;
      }
      if (errors['maxlength']) {
        return `${this.maxLengthMsg} ${errors['maxlength']['requiredLength']}`;
      }
    }

    return '';
  }
}
