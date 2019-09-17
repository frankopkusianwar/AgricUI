import {
  async,
  ComponentFixture,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableComponent } from './data-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { requestMock } from 'src/app/_shared/tests/spies.spec';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { CSV2JSONModule } from '../../../../node_modules/angular2-csv2json';
import { OrderModule } from 'ngx-order-pipe';
import { By } from '@angular/platform-browser';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let injector: TestBed;
  let requestService: RequestsService;
  let authService: AuthenticationService;
  const authMock = jasmine.createSpyObj('AuthenticationService', [
    'getCurrentUserValue'
  ]);

  authMock.getCurrentUserValue.and.returnValue({ user: '' });

  const event = {
    type: 'success',
    data: [
      {
        va_country: 'Nigeria',
        va_phonenumber: 56789,
        va_district: 'lagos',
        va_gender: 'male',
        va_region: 'maryland',
        va_subcounty: 'really',
        partner_id: 234,
        ma_id: 3245
      }
    ]
  };

  const invalidEvent = {
    type: 'success',
    data: [
      {
        va_phonenumber: 56789,
        va_gender: 'male',
        va_region: 'maryland',
        va_subcounty: 'really',
        partner_id: 234,
        ma_id: 3245
      }
    ]
  };

  const csvData = [
    {
      account_name: '',
      username: '',
      contact_person: '',
      phone_number: '',
      value_chain: '',
      created_at: '',
      status: ''
    }
  ];

  const csvDataVillageAgents = [
    {
      master_agent: 'nicks',
      va_name: '',
      va_phonenumber: '',
      va_district: '',
      total_number_of_farmers: '',
      devt_partner:'N/A' ,
      created_at: '',
    }
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableComponent,
        NavigationComponent,
        EditModalComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        CSV2JSONModule,
        OrderModule
      ],
      providers: [
        { provide: RequestsService, useValue: requestMock },
        { provide: AuthenticationService, useValue: authMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    requestService = injector.get(RequestsService);
    authService = injector.get(AuthenticationService);
  }));

  const result = [
    {
      _id: '-0m-bri',
      account_name: 'letty',
      username: 'letty',
      contact_person: 'letty',
      phonen_umber: '09098987676',
      value_chain: 'Crop',
      status: 'demo',
      created_at: '2019-09-10 09:47:45'
    }
  ];
  requestMock.get.and.returnValue(of({ result }));
  requestMock.patch.and.returnValue(of({ result }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  beforeAll(() => {
    requestMock.get.calls.reset();
    requestMock.patch.calls.reset();
  });

  afterEach(() => {
    requestMock.get.calls.reset();
    requestMock.patch.calls.reset();
  });

  it('should create the DataTable component', () => {
    expect(component).toBeTruthy();
  });

  it('should update datatable on edit', () => {
    component.updateOnEdit();
    expect(component.action).toEqual(null);
    expect(component.actionSuccess).toEqual(false);
  });

  it('should set userId and id to null', () => {
    component.closeEditModal();
    expect(component.id).toEqual(null);
    expect(component.userId).toEqual(null);
  });

  it('should trigger activate action', () => {
    fixture.detectChanges();
    const select = fixture.debugElement.nativeElement.querySelector(
      '.activate'
    );
    select.click();
    fixture.detectChanges();
    expect(component.action).toEqual('Activate');
  });

  it('should trigger change status', () => {
    fixture.detectChanges();
    spyOn(component, 'getData');
    component.action = 'suspend';
    component.selectedUser = result[0];
    fixture.detectChanges();
    const select = fixture.debugElement.nativeElement.querySelector('.status');
    select.click();
    fixture.detectChanges();
    requestMock.patch().subscribe(() => {
      expect(component.getData).toHaveBeenCalled();
      expect(component.actionSuccess).toEqual(true);
    });
  });

  it('should set users action', () => {
    const user = { _id: '304iotn2304iore' };
    component.setAction(user, 'edit');
    fixture.detectChanges();
    expect(component.userId).toEqual(user._id);
  });

  it('should set current id', () => {
    component.setCurrentId(true);
    fixture.detectChanges();
    expect(component.currentId).toBeTruthy();
  });

  it('should simulate upload success', () => {
    component.type = 'masteragent';
    component.onUpload(event);
    fixture.detectChanges();
    expect(component.apiSuccessMessage).toEqual({ success: '' });
  });

  it('should set error if required field is missing', () => {
    component.validateField(component.requiredField, invalidEvent);
    fixture.detectChanges();
    expect(component.errors).toEqual({});
  });

  it('should correctly generate data for CSV', () => {
    component.data = result;
    const exportCSVMethodCall = component.onExportCSV();
    fixture.detectChanges();
    expect(component.data).toBeTruthy();
  });

  it('should correctly export CSV data', () => {
    const generatedCSVData = component.generateDataForCSV(csvData);
    fixture.detectChanges();
    expect(generatedCSVData).toBeTruthy();
  });

  it('should change the page limit', () => {
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.selectLimit).toEqual('page changed');
  });

  it('should correctly export CSV data for village agents', () => {
    requestMock.get.and.returnValue(of( csvDataVillageAgents ));
    component.hideActionsColumn = false;
    const generatedCSVData = component.generateDataForCSV(csvDataVillageAgents);
    fixture.detectChanges();
    expect(generatedCSVData).toBeTruthy();
  });

  it('should correctly invoke print function', () => {
    component.data = result;
    const printTableMethodCall = component.printable();
    fixture.detectChanges();
    expect(component.data).toBeTruthy();
  });

  it('should simulate upload', () => {
    const error = {
      status: 422,
      error: [['errors']]
    };
    component.type = 'offtaker';
    requestMock.post.and.returnValue(throwError(error));
    component.onUpload(event);
    fixture.detectChanges();
    expect(component.apiError).toEqual(['errors']);
  });

  
});
