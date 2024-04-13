import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { ArticleInterface } from '../types/article.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ArticleFromServerInterface } from '../types/articleFromServer.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<ArticleInterface[]> {
    return this.http
      .get<ArticleFromServerInterface[]>(
        'https://jsonplaceholder.typicode.com/posts'
      )
      .pipe(
        map((items: ArticleFromServerInterface[]) => {
          return items.map((item) => this.modifyInterface(item));
        }),
        catchError(this.handleError)
      );
  }

  getArticle(id: number): Observable<ArticleInterface> {
    return this.http
      .get<ArticleFromServerInterface>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
      .pipe(
        map((item) => this.modifyInterface(item)),
        catchError(this.handleError)
      );
  }

  addArticle(article: ArticleInterface) {
    return of(article);
  }

  modifyInterface(item: ArticleFromServerInterface): ArticleInterface {
    const articleItem = {
      id: item.id,
      description: item.body,
      title: item.title,
    };
    return articleItem;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
