import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticleContainerComponent } from './create-article-container.component';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import * as ArticlesActions from '../../store/actions';

describe('CreateArticleContainerComponent', () => {
  let component: CreateArticleContainerComponent;
  let fixture: ComponentFixture<CreateArticleContainerComponent>;
  let mockStore: any;
  let mockRouter: any;

  @Component({
    selector: 'app-go-back',
    template: '<div></div>',
  })
  class MockGoBackComponent {}

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
      imports: [ReactiveFormsModule],
      declarations: [CreateArticleContainerComponent, MockGoBackComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the create article component', () => {
    expect(component).toBeTruthy();
  });

  it('should add article to store on form submission', () => {
    component.newArticleForm.setValue({
      title: 'Valid test title',
      description: 'Test Description',
      imageUrl: 'Test Image URL',
    });
    component.lastId = 111;
    component.submitForm();
    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      ArticlesActions.addArticle({
        article: {
          title: 'Valid test title',
          description: 'Test Description',
          imageUrl: 'Test Image URL',
          id: 112,
        },
      })
    );
  });

  it('should navigate to articles page after adding article', () => {
    component.newArticleForm.setValue({
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'Test Image URL',
    });
    component.submitForm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/articles']);
  });
});
