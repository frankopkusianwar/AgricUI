import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agronomical',
  templateUrl: './agronomical.component.html',
  styleUrls: ['./agronomical.component.scss']
})
export class AgronomicalComponent implements OnInit {
  page = 1;
  count = 10;
  showFilter = true;
  type = 'maize';
  data = [];
  ngOnInit(): void {
    this.data = [
      {
        activity: 'Planting',
        image: 'https://images.unsplash.com/photo-1529313780224-1a12b68bed16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80',
        crop: 'maize',
        title: 'When to Plain',
        description: 'The recommend spacing for maize',
      },
      {
        activity: 'Planting',
        image: 'https://images.unsplash.com/photo-1529313780224-1a12b68bed16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80',
        crop: 'maize',
        title: 'When to Plain',
        description: 'The recommend spacing for maize',
      },
      {
        activity: 'Planting',
        image: 'https://images.unsplash.com/photo-1529313780224-1a12b68bed16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80',
        crop: 'maize',
        title: 'When to Plain',
        description: 'The recommend spacing for maize',
      }
    ]
  }
}
