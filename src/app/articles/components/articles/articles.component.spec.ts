import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticlesComponent } from './articles.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as ArticlesActions from '../../store/actions';
import { Router } from '@angular/router';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let mockStore: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockStore = {
      pipe: jasmine.createSpy().and.returnValue(of([])),
      dispatch: jasmine.createSpy(),
      select: jasmine.createSpy().and.returnValue(of([])),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ArticlesComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
  });

  it('should create the articles component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getArticles action if articles are empty', () => {
    component.isArticlesEmpty = true;
    fixture.detectChanges();

    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      ArticlesActions.getArticles()
    );
  });

  it('should NOT dispatch getArticles action if articles are NOT empty', () => {
    component.isArticlesEmpty = false;
    fixture.detectChanges();

    component.ngOnInit();

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      ArticlesActions.getArticles()
    );
  });

  it('should navigate to create article page', () => {
    component.navigateToCreateArticle();
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/articles/create-new-article',
    ]);
  });
});
