import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdValidationGuard } from '../guards/id-validation.guard';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { ArticlesComponent } from './components/articles/articles.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
  },
  {
    path: ':id',
    component: ArticlePageComponent,
    canActivate: [IdValidationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
