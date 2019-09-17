import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ViewModule } from "./views/view.module";
import { ComponentsModule } from "./components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminApiCallsService } from "./_services/admin-api-calls.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorsService } from "./_services/http-interceptors.service";
import { NgxPaginationModule } from "ngx-pagination";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ChartsModule } from "ng2-charts";
import { CommonModule } from "@angular/common";
import { OrderModule } from "ngx-order-pipe";
import { QuillModule } from "ngx-quill";
import { NgxGtagModule } from "ngx-gtag";

import { CacheIntercepror } from "./_services/cache-interceptor.service";
import { RequestsService } from "./_shared/services/requests.service";
import { ServerErrorInterceptor } from "./_services/server-error.interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ViewModule,
    ComponentsModule,
    HttpClientModule,
    NgxPaginationModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartsModule,
    OrderModule,
    QuillModule,
    NgxGtagModule.forRoot({
      trackingId: "UA-144853798-1",
      options: { send_page_view: true }
    })
  ],
  providers: [
    AdminApiCallsService,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorsService,
      multi: true
    },
    RequestsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheIntercepror,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
