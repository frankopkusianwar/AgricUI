import { Component, OnInit, Input } from '@angular/core';
import { RequestsService } from 'src/app/_shared/services/requests.service';
import { DiagnosisData } from '../../interfaces/admin.interface';

@Component({
  selector: 'app-diagnosis-table',
  templateUrl: './diagnosis-table.component.html',
  styleUrls: ['./diagnosis-table.component.scss']
})
export class DiagnosisTableComponent implements OnInit {

  constructor(private requestService: RequestsService) {}

  @Input() type;
  loading: boolean;
  deleteDiagnosisloading: boolean;
  diagnosisViewData: object;
  deleteDiagnosisSuccess: boolean;
  showFilter = true;
  page = 1;
  count = 10;
  data: DiagnosisData[];
  message: string;
  category: string;
  diagnosisId: string;
  diagnosisAction: string;
  modalId: string;

  ngOnInit() {
    this.setCategory();
    this.loadDiagnosis();
  }

  setCategory() {
    this.category = this.type === 'Pests' ? 'pest' : 'disease';
  }

  loadDiagnosis(): void {
    this.loading = true;
    this.requestService.get(`diagnosis/${this.category}`, null).subscribe(
      res => {
        this.loading = false;
        this.data = res;
      },
      err => {
        this.loading = false;
        this.message = err.error;
      }
    );
  }

  setDiagnosisView(data: object): void {
    this.diagnosisViewData = data;
  }

  deleteDiagnosis(id: string): void {
    this.deleteDiagnosisloading = true;
    this.requestService.delete(id, `diagnosis`).subscribe(
      res => {
        this.deleteDiagnosisloading = false;
        this.deleteDiagnosisSuccess = true;
        this.loadDiagnosis();
        this.message = 'Diagnosis information deleted successfully';
      },
      err => {
        this.deleteDiagnosisloading = false;
        this.deleteDiagnosisSuccess = false;
        if (err.status === 404) {
          this.message = 'Diagnosis information not found!';
        } else {
          this.message = 'Some error occurred. Please try again';
        }
      }
    );
  }

  setDiagnosisAction(id: string, action: string, modalId: string): void {
    this.diagnosisId = id;
    this.diagnosisAction = action;
    this.modalId = modalId;
  }

  clearMessage(): void {
    this.message = '';
  }

  closeDiagnosisModal() {
    this.diagnosisId = null;
  }

  refreshDiagnosisList() {
    this.loadDiagnosis();
  }
}
