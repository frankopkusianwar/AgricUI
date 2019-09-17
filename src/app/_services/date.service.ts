import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  today: number;
  year: number;

  constructor() {
    const date = new Date();
    this.today = date.getTime();
    this.year = date.getFullYear();
  }
}
