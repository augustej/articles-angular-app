import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { ArticlePageComponent } from './article-page.component';

describe('ArticlePageComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      select: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      declarations: [ArticlePageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useValue: mockStore }],
    });
    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
