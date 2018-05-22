import { Injectable } from '@angular/core';
import { HttpsService } from './configuration/https.service';
import 'rxjs/add/operator/map';
import { Options } from 'selenium-webdriver/safari';

@Injectable()
export class WordpressService {
  productCatList: any;
  attributeOptions: Array<any> = [];
  allAttributes: any;

  constructor(public http: HttpsService) { 
    this.fetchAttributes();
    this.fetchSearchedCategories();
  }
  /* For dashboard page */
  fetchCategories() {
    return this.http.get(this.http.url + 'v1/products/categories?include=[667,303,623,525,390,469,327,617,662]&orderby=include' + '&' + this.http.creds);
  }

  /* fetch products by category (For products page) */
  fetchCategoryProducts(catId) {
    return this.http.get(this.http.url + 'v1/products?category=' + catId + '&per_page=10' + '&' + this.http.creds);
  }

  /* Fetch product detail (For product detail page) */
  fetchProductDetail(productId) {
    return this.http.get(this.http.url + 'v1/products/' + productId + '?' + this.http.creds);
  }

  /* List of attributes for categories use in filter*/
  fetchAttributes() {
    this.http.get(this.http.url + 'v1/products/attributes?' + this.http.creds)
       .subscribe(attributes => {
         this.allAttributes = attributes;
         this.attributeOptions = [];
         this.allAttributes.forEach(element => {
           this.fetchAttributesOptions(element.id);
         });
       }), (error) => console.log(error);
  }

  /* Fetch all attribute terms for all attributes use in filter*/
  fetchAttributesOptions(id) {
    this.http.get(this.http.url + 'v1/products/attributes/' + id + '/terms?per_page=100&' + this.http.creds)
      .subscribe(options => {
        this.attributeOptions[id] = options;
      }), (error) => console.log(error);
      
  }

  /* List of categories use in filter */
  fetchSearchedCategories() {
    this.http.get(this.http.url + 'v1/products/categories?per_page=30&' + this.http.creds)
      .subscribe(options => {
       this.productCatList = options;
      }), (error) => console.log(error);
  }

}
