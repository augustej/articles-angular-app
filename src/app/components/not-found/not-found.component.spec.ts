import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  @Component({
    selector: 'app-go-back',
    template: '<div></div>',
  })
  class MockGoBackComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent, MockGoBackComponent],
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
