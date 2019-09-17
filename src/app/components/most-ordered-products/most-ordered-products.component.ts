import { Component, OnInit } from '@angular/core';
import { AdminApiCallsService } from '../../_services/admin-api-calls.service';
import { FilterData } from '../../interfaces/admin.interface';
import { HelperFunctions } from '../../_shared/utils/helper-functions';

@Component({
  selector: 'app-most-ordered-products',
  templateUrl: './most-ordered-products.component.html',
  styleUrls: ['./most-ordered-products.component.scss']
})
export class MostOrderedProductsComponent implements OnInit {
  constructor(private api: AdminApiCallsService, private helperFunction: HelperFunctions) {}

  public filterData: FilterData[];
  public errorMessage: string;
  public filterLoaded: boolean;
  public filterType: string = 'enterprises';
  public productsAndServicesLoaded: boolean;
  public products: Array<object>;
  public services: Array<object>;
  
  // common bar chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  timeline = true;
  roundEdges = false;
  colorScheme = {
    domain: ['#77b8e9']
  };

  // product specific chart options
  xAxisLabelProducts = 'No of products';
  productView = [600, 250];
  
  // product specific chart options
  xAxisLabelServices = 'No of service orders';
  serviceView = [600, 300];


  /**
   * Loads the first value in the filterData arrray when the page loads
   */
  ngOnInit() {
    this.api.getData('enterprises').subscribe(
      ((res: any) => {
        this.filterData = res;
        this.filterLoaded = true;
        this.getProductsAndServices(res.data[0].name);
      }),
      (errorResponse => {
        this.errorMessage = errorResponse.error.error;
      })
    );
  }

  filterTypeChange(type: string): void {
    this.filterType = type;
    this.loadFilter(this.filterType);
  }
  
  /**
   * Transforms the products data from the API compatible with the requirement of the,
   * ngx-chart package.
   * @param data API response containing raw data
   */
  extractProducts(data: any): void {
    const nonDuplicateProducts = {};
    const finalProducts = [];
    const { data: { products: duplicateProducts }} = data;
    duplicateProducts.forEach(duplicateProduct => {
      duplicateProduct.forEach(product => {
        if(nonDuplicateProducts.hasOwnProperty(product)) {
          nonDuplicateProducts[product] += 1;
        } else {
          nonDuplicateProducts[product] = 1;
        }
      });
    });
    Object.keys(nonDuplicateProducts).forEach(nonDuplicateProductKey => {
      const productObject = {};
      productObject['name'] = nonDuplicateProductKey;
      productObject['value'] = nonDuplicateProducts[nonDuplicateProductKey];
      finalProducts.push(productObject);
    });
    this.products = finalProducts;
  }

   /**
   * Transforms the services data from the API compatible with the requirement of the,
   * ngx-chart package.
   * @param data API response containing raw data
   */
  extractServices(data: any): void {
    const finalServices = [];
    const { data: { services } } = data;
    services.forEach(service => {
      let name = Object.keys(service)[0];
      const value = Object.values(service)[0];
      if (name.includes('_')) {
        name = name.replace('_', ' ');
        name = this.helperFunction.capitalize(name);
      } else {
        name = this.helperFunction.capitalize(name);
      }
      finalServices.push({
        name,
        value
      });
    });
    this.services = finalServices;
  }

  loadFilter(type: string): void {
    this.filterLoaded = false;
    this.api.getData(type).subscribe(
      ((res: any) => {
        this.filterData = res;
        this.filterLoaded = true;
      }),
      (errorResponse => {
        this.errorMessage = errorResponse.error.error;
      })
    );
  }

  getProductsAndServices(value: string): void {
    this.productsAndServicesLoaded = false;
    this.api.getData(`most-ordered?type=${this.filterType}&filter=${value}`).subscribe(
      ((res: any) => {
        this.extractProducts(res);
        this.extractServices(res);
        this.productsAndServicesLoaded = true;
      }),
      (errorResponse => {
        this.errorMessage = errorResponse.error.error;
      })
    );
  }
}
