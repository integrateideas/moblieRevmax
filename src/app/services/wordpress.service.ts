import { Injectable } from '@angular/core';
import { HttpsService } from './configuration/https.service';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressService {

  constructor(public http: HttpsService) { }
  /* For dashboard page */
  fetchCategories() {
    return this.http.get(this.http.url + 'v1/products/categories?include=[667,303,623,525,390,469,327,617,662]&orderby=include' + '&' + this.http.creds);

  }

  fetchCategoryProducts(catId) {
    return this.http.get(this.http.url + 'v1/products?category=' + catId + '&per_page=10' + '&' + this.http.creds);
  }

  fetchProductDetail(productId) {
    return this.http.get(this.http.url + 'v1/products/' + productId + '?' + this.http.creds);
  }

}
