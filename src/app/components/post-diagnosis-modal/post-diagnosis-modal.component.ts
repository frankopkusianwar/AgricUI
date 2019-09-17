import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminApiCallsService } from 'src/app/_services/admin-api-calls.service';

declare var jQuery: any;
@Component({
  selector: 'app-post-diagnosis-modal',
  templateUrl: './post-diagnosis-modal.component.html',
  styleUrls: ['./post-diagnosis-modal.component.scss']
})
export class PostDiagnosisModalComponent implements OnInit {

  @Input() category: string;
  model: any = {};
  submitted = false;
  success = false;
  loading = false;
  crops: any;
  message: string;
  file: File = null;
  status: string;
  explanationTitle: string;

  requiredField: any = {
    control: false,
    explanation: false,
    photo: false,
  };

  @Output() reloadDiagnosisEvent = new EventEmitter();

  // quillJS editor config
  quillConfig = {
    toolbar: [
      [{ 'list': 'ordered' }],
      ['bold', 'italic', 'underline']
    ]
  };

  constructor(
    private requestService: AdminApiCallsService,
  ) {}

  ngOnInit() {
    this.getCrops();
    this.displayExplanation(this.category);
  }

  displayExplanation(category) {
    this.explanationTitle = (category === 'pest' ? 'effects' : 'symptoms');
  }

  getCrops() {
    this.loading = true;
    this.requestService.getData('enterprises').subscribe(
      res => {
        this.loading = false;
        this.crops = res;
      }
    );
  }

  postDiagnosis(data: object) {
    this.loading = true;
    this.requestService.postData(`diagnosis/${this.category}`, data).subscribe(
      res => {
        this.loading = false;
        this.message = res.message;
        this.success = true;
        this.status = 'success';
        this.refreshDiagnosisInfo();
        this.displayAlert(this.message, this.status);
        this.closeModal();
      },
      err => {
        const { error } = err;
        this.loading = false;
        this.status = 'error';
        this.message = error.error;
        this.displayAlert(this.message, this.status);
      }
    );
  }

  closeModal() {
    jQuery(document).ready(() => {
      jQuery('#diagnosisForm')[0].reset();
      jQuery('#diagnosisModal').modal('hide');
    });
  }

  handleSubmit(createDiagnosisForm) {
    this.submitted = true;
    const formData = new FormData();

    if (!createDiagnosisForm.control) {
      this.requiredField.control = true;
    } else if (!createDiagnosisForm.explanation) {
      this.requiredField.explanation = true;
    } else if (!this.file || !(/\.(jpg|jpeg|png)$/i).test(this.file.name) || this.file.size > 2000000) {
      this.requiredField.photo = true;
    } else {
      formData.append('name', createDiagnosisForm.name);
      formData.append('cause', createDiagnosisForm.cause);
      formData.append('crop', createDiagnosisForm.crop);
      formData.append('control', createDiagnosisForm.control);
      formData.append('explanation', createDiagnosisForm.explanation);
      formData.append('photo', this.file, this.file.name);

      this.postDiagnosis(formData);
    }
  }

  processPhoto(event) {
    this.file =  event.target.files[0] as File;
  }

  displayAlert(message, status) {
    const title = status.charAt(0).toUpperCase() + status.slice(1);
    Swal.fire(
      title,
      message,
      status
    );
  }

  refreshDiagnosisInfo() {
    this.reloadDiagnosisEvent.emit();
  }

  clearErrorMessage(input) {
    if (input.name === 'explanation') {
      this.requiredField.explanation = false;
    } else if (input.name === 'control') {
      this.requiredField.control = false;
    }
  }
}
