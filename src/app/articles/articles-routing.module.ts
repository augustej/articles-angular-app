import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdValidationGuard } from '../guards/id-validation.guard';
import { ArticlePageContainerComponent } from './components/article-page-container/article-page-container.component';
import { ArticlesContainerComponent } from './components/articles-container/articles-container.component';
import { CreateArticleContainerComponent } from './components/create-article-container/create-article-container.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesContainerComponent,
    pathMatch: 'full',
  },
  {
    path: 'create-new-article',
    component: CreateArticleContainerComponent,
  },
  {
    path: ':id',
    component: ArticlePageContainerComponent,
    canActivate: [IdValidationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
