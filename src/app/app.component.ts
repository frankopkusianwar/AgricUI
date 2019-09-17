import { Component, OnInit } from "@angular/core";
import { environment } from "../environments/environment";
import { AuthenticationService } from "./_services/authentication.service";
import { User } from "./_models/User";
import { NgxGtagModule } from "ngx-gtag";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "EzyAgricUI";
  ngOnInit() {}
}
