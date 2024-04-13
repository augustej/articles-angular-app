import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as ArticlesActions from '../../store/actions';
import {
  articlesSelector,
  errorSelector,
  lastIdSelector,
} from '../../store/selectors';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-create-article-container',
  templateUrl: './create-article-container.component.html',
  styleUrls: ['./create-article-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleContainerComponent {
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

  private subscription: Subscription = new Subscription();

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

    const articlesSubscription = this.articles$.subscribe(() =>
      this.router.navigate(['/articles'])
    );

    this.subscription.add(articlesSubscription);
  }

  checkIfArticlesEmpty() {
    const emptyArtcileSubscription = this.articles$
      .pipe(map((articles) => articles.length === 0))
      .subscribe((isEmpty) => (this.isArticlesEmpty = isEmpty));

    this.subscription.add(emptyArtcileSubscription);
  }

  getLastId(lastId$: Observable<number | null>) {
    const lastIdSubscription = lastId$
      .pipe(map((id) => id || null))
      .subscribe((id) => (this.lastId = id));

    this.subscription.add(lastIdSubscription);
  }

  addArticleToStore() {
    this.store.dispatch(
      ArticlesActions.addArticle({
        article: this.CreateArticleContainerObject(),
      })
    );
  }

  CreateArticleContainerObject(): ArticleInterface {
    let newId: number = this.lastId ? this.lastId + 1 : 0;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
