import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "../../../environments/environment";
import { httpMock } from "../tests/spies.spec";
import { RequestsService } from "./requests.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe("RequestsService", () => {
  let requestService: RequestsService;
  httpMock.post.and.returnValue(of({}));
  httpMock.get.and.returnValue(of({}));
  httpMock.patch.and.returnValue(of({}));
  httpMock.put.and.returnValue(of({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [RequestsService, { provide: HttpClient, useValue: httpMock }]
    });
    requestService = TestBed.get(RequestsService);
  });

  it("should be created", () => {
    const service: RequestsService = TestBed.get(RequestsService);
    expect(service).toBeTruthy();
  });
  it("should make a post request", () => {
    requestService.post("", {}).subscribe(() => {
      expect(httpMock.post).toHaveBeenCalled();
    });
  });
  it("should make a get request", () => {
    requestService.get("", {}).subscribe(() => {
      expect(httpMock.get).toHaveBeenCalled();
    });
  });
  it("should make a patch request", () => {
    requestService.patch("", "", {}).subscribe(() => {
      expect(httpMock.patch).toHaveBeenCalled();
    });
  });
  it("should make a put request", () => {
    requestService.put("", {}).subscribe(() => {
      expect(httpMock.put).toHaveBeenCalled();
    });
  });
  it("should make a put when updating text field and files", () => {
    requestService.putWithImage("", "").subscribe(() => {
      expect(httpMock.putWithImage).toHaveBeenCalled();
    });
  });
  it("should make a delete request", () => {
    requestService.delete("data", "laravel");
  });
});
