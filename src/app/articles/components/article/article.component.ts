import { Component, Input } from '@angular/core';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article!: ArticleInterface;
}
