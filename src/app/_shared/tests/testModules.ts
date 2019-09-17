import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseComponent } from '../utils/base-component';

export const testModules = [
  FormsModule,
  ReactiveFormsModule,
  BrowserModule,
  HttpClientModule,
  RouterTestingModule.withRoutes([
    {
      path: '**',
      component: BaseComponent
    }
  ])
];
