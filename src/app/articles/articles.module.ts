import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { ArticlesContainerComponent } from './components/articles-container/articles-container.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffects } from './store/effects';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { ArticlePageContainerComponent } from './components/article-page-container/article-page-container.component';
import { CreateArticleContainerComponent } from './components/create-article-container/create-article-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoBackComponent } from '../components/go-back/go-back.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    ArticlesContainerComponent,
    ArticleComponent,
    ArticlePageContainerComponent,
    CreateArticleContainerComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ArticlesRoutingModule,
    StoreModule.forFeature('articles', reducers),
    EffectsModule.forFeature([ArticlesEffects]),
    TruncatePipe,
    ReactiveFormsModule,
    GoBackComponent,
  ],
  providers: [],
})
export class ArticlesModule {}
