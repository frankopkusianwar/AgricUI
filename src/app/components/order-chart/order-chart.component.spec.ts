import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { OrderChartComponent } from './order-chart.component';
import { ChartsModule } from 'ng2-charts';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrderChartComponent', () => {
  let component: OrderChartComponent;
  let fixture: ComponentFixture<OrderChartComponent>;
  let requestService: RequestsService;
  let injector: TestBed;

  const response = {
    category: 'fertilizer',
    orderDistribution: [
      {
        created_at: Date()
      },
      {
        created_at: Date()
      },
      {
        created_at: Date()
      },
      {
        created_at: Date()
      }
    ]
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderChartComponent],
      imports: [ChartsModule, HttpClientTestingModule],
      providers: [RequestsService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderChartComponent);
    component = fixture.componentInstance;
    requestService = fixture.debugElement.injector.get(RequestsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should load data', () => {
    const spy = spyOn(requestService, 'get').and.returnValue(
      of(response)
    );
    component.getOrderData('fertilizer');
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);

  });
});
