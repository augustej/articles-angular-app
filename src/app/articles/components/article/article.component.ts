import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ArticleInterface } from '../../types/article.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @Input() article!: ArticleInterface;
}
