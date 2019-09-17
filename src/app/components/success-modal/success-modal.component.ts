import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  @Input() message:any;
  @Output() clearInputEvent = new EventEmitter();
  clear(){
    this.clearInputEvent.emit();
  }
}
