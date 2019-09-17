import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDashboardNavigationComponent } from './app-dashboard-navigation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppDashboardNavigationComponent', () => {
  let component: AppDashboardNavigationComponent;
  let fixture: ComponentFixture<AppDashboardNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppDashboardNavigationComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDashboardNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
