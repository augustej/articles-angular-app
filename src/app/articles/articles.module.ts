import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffects } from './store/effects';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';

@NgModule({
  declarations: [ArticlesComponent, ArticleComponent, ArticlePageComponent, CreateArticleComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    StoreModule.forFeature('articles', reducers),
    EffectsModule.forFeature([ArticlesEffects]),
    TruncatePipe,
  ],
  providers: [],
})
export class ArticlesModule {}
