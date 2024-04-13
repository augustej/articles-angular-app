import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { ArticlePageContainerComponent } from './article-page-container.component';

describe('ArticlePageContainerComponent', () => {
  let component: ArticlePageContainerComponent;
  let fixture: ComponentFixture<ArticlePageContainerComponent>;
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      select: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      declarations: [ArticlePageContainerComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useValue: mockStore }],
    });
    fixture = TestBed.createComponent(ArticlePageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
