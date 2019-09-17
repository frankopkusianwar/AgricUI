import { 
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
 } from '@angular/core';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HelperFunctions } from '../../_shared/utils/helper-functions';

@Component({
  selector: 'app-edit-diagnosis-modal',
  templateUrl: './edit-diagnosis-modal.component.html',
  styleUrls: ['./edit-diagnosis-modal.component.scss']
})
export class EditDiagnosisModalComponent implements OnInit {

  constructor(
    private api: AdminApiCallsService,
    private helperFunctions: HelperFunctions,
    ) { }

  @Input() diagnosisId;
  @Input() category;
  @Input() modalId;
  @Input() action;

  @Output() closeDiagnosisModalEvent = new EventEmitter();
  @Output() refreshDiagnosisEvent = new EventEmitter();

  diagnosisInformationForm: FormGroup;

  diagnosisInformation: object;
  updatedDiagnosisInformation: object;
  loading: boolean = false;
  editDiagnosticInformationLoading: boolean = false;
  message: string;
  submitted: boolean;
  crops: any;
  file: any;
  status: string;

  // Quill editor config
  quillConfig = {
    toolbar: [
      [{ 'list': 'ordered' }],
      ['bold', 'italic', 'underline']
    ]
  };

  ngOnInit() {
    this.loadDiagnosisInformation(this.diagnosisId);
    this.loadCrops();
  }

  initializeDiagnosisForm(diagnosisInformation: any) {
    this.diagnosisInformationForm = new FormGroup({
      'name': new FormControl(diagnosisInformation.name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'cause': new FormControl(diagnosisInformation.cause, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'crop': new FormControl(diagnosisInformation.crop, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'photo': new FormControl(null),
      'control': new FormControl(diagnosisInformation.control),
      'explanation': new FormControl(diagnosisInformation.explanation)
    });
  }

  get name() { return this.diagnosisInformationForm.get('name'); }

  get cause() { return this.diagnosisInformationForm.get('cause'); }

  loadDiagnosisInformation(id: string): void {
    this.loading = true;
    this.api.getData(`diagnosis/${this.category}/${id}`).subscribe(
      res => {
        this.loading = false;
        this.diagnosisInformation = res['data'][0];
        this.initializeDiagnosisForm(this.diagnosisInformation);
      },
      err => {
        this.loading = false;
        this.message = err.error;
      }
    );
  }

  loadCrops(): void {
    this.api.getData('enterprises').subscribe(
      res => {
        this.crops = res;
      }
    );
  }

  closeEditDiagnosisModal() {
    this.closeDiagnosisModalEvent.emit();
  }

  refreshDiagnosisInformation() {
    this.refreshDiagnosisEvent.emit();
  }

  processPhoto(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      if ((/\.(jpg|jpeg|png)$/i).test(file.name) && file.size <= 2000000) {
        this.diagnosisInformationForm.controls['photo'].setErrors(null);
        this.file = file;
      } else {
        this.diagnosisInformationForm.controls['photo'].setErrors({'invalid': true});
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.diagnosisInformationForm.valid) {
      const { value } = this.diagnosisInformationForm;
      value['photo'] === null ? delete value['photo'] : null;
      let formData = new FormData();
      Object.keys(value).forEach(inputKey => {
        if (inputKey == 'photo' && this.file){
          formData.append(inputKey, this.file);
        } else {
          formData.append(inputKey, value[inputKey]);
        }
      });
      this.editDiagnosisInformation(formData);
    }
    return;
  }

  editDiagnosisInformation(newDiagnosisInformation: object) {
    this.editDiagnosticInformationLoading = true;
    this.api.postData(`diagnosis/${this.category}/${this.diagnosisId}`, newDiagnosisInformation).subscribe(
      res => {
        this.editDiagnosticInformationLoading = false;
        this.updatedDiagnosisInformation = res.data[0];
        this.refreshDiagnosisInformation();
        this.status = 'Success';
        this.message = `${this.helperFunctions.capitalize(this.category)} info has been successfully edited`;
      },
      err => {
        this.editDiagnosticInformationLoading = false;
        this.status = 'Failure';
        this.message = 'An error occurred. Please try again';
      }
    );
  }
}
