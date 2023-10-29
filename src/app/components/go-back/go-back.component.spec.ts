import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoBackComponent } from './go-back.component';

describe('GoBackComponent', () => {
  let component: GoBackComponent;
  let fixture: ComponentFixture<GoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the go back component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a router link to the homepage', () => {
    const compiled = fixture.nativeElement;
    const linkElement = compiled.querySelector('.link');
    expect(linkElement.getAttribute('routerLink')).toBe('/');
  });
});
