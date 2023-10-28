import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { ArticleInterface } from '../types/article.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<ArticleInterface[]> {
    return this.http
      .get<ArticleInterface[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(catchError(this.handleError));
  }

  addArticle(article: ArticleInterface) {
    console.log('called');
    return of(article);
  }

  private handleError(error: HttpErrorResponse) {
    // Pass the error to the consumer of the service
    return throwError(() => new Error(error.message));
  }
}
