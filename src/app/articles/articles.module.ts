import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffects } from './store/effects';

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    StoreModule.forFeature('articles', reducers),
    EffectsModule.forFeature([ArticlesEffects]),
  ],
  providers: [],
})
export class ArticlesModule {}
