import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { ArticleInterface } from '../../types/article.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  @Pipe({
    name: 'truncate',
  })
  class MockTruncatePipe implements PipeTransform {
    transform(
      value: string | null | undefined,
      limit: number = 100,
      trail: string = '...'
    ): string {
      return value || '';
    }
  }

  const mockArticle: ArticleInterface = {
    id: 1,
    imageUrl: '',
    title: 'Test Title',
    description: 'Test Description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent, MockTruncatePipe],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    component.article = mockArticle;
    fixture.detectChanges();
  });

  it('should create the article component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the article details correctly', () => {
    const compiled = fixture.nativeElement;
    const articleLink = compiled.querySelector('.article');
    expect(articleLink).toBeTruthy();

    const imgElement = compiled.querySelector('.article__img');
    expect(imgElement.getAttribute('src')).toContain('default');

    const titleElement = compiled.querySelector('.article__title');
    expect(titleElement.textContent).toContain('Test Title');

    const descriptionElement = compiled.querySelector('.article__description');
    expect(descriptionElement.textContent).toContain('Test Description');
  });
});
