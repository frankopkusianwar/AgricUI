import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WelcomeDetailsComponent } from './welcome-details.component';

describe('WelcomeDetailsComponent', () => {
  let component: WelcomeDetailsComponent;
  let fixture: ComponentFixture<WelcomeDetailsComponent>;

  function setup() {
    const fixture = TestBed.createComponent(WelcomeDetailsComponent);
    const app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    return { fixture, app, component };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should simulate toggleVidoe', () => {
    component.toggleVideo();
    fixture.detectChanges();
    expect(component.src).toContain('.mp4');
  });

  it('should render video element ', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const video = compile.querySelector('video');
    expect(video).toBeTruthy();
  });

  it('should toggle video modal', () => {
    const { component, fixture } = setup();
    spyOn(component, 'toggleVideo');
    fixture.detectChanges();
    const cancelBtn = fixture.debugElement.query(By.css('#cancel-btn'))
      .nativeElement;
    expect(cancelBtn).toBeTruthy();
    cancelBtn.click();
    expect(component.toggleVideo).toHaveBeenCalled();
  });
});
