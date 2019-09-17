import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportSidebarComponent } from './admin-report-sidebar.component';

describe('AdminReportSidebarComponent', () => {
  let component: AdminReportSidebarComponent;
  let fixture: ComponentFixture<AdminReportSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReportSidebarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the admin report sidebar component', () => {
    expect(component).toBeTruthy();
  });
});
