import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ArticlesActions from '../../store/actions';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ArticlesActions.getArticles());
  }
}
