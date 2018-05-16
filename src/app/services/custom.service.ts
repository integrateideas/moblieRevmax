import { Injectable } from '@angular/core';
import { HttpsService } from './configuration/https.service';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomService {

  url = "https://revmax.twinspark.co";
  constructor(public http: HttpsService, public customHttp: Http) { }

  fetchMenuItems() {
    return this.http.get(this.url + '/wp-json/wp-api-menus/v2/menus/2184');
  }

  /* Fetch the product variation */
  getProductVariation(requestData, product, productId) {
    let body = new URLSearchParams();
    body.set('product_id', productId);
    for (let key in requestData) {
      body.set(key, requestData[key]);
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = this.url + "/product/" + product + "/?wc-ajax=get_variation";
    return (this.customHttp.post(url, body.toString().replace(/ /g, ''), options)
      .map((response) => response.json()));
  }

  /* Use to filter products (on product page) */
  filterProducts(productCat, attResponse) {
    // http://revmax.twinspark.co/wp-json/instant/v1/search?product_cat=combo-kit&pa_make=ford
    if (attResponse == null) {
      return this.http.get(this.url + '/wp-json/instant/v1/search?product_cat=' + productCat + '&');
    } else {
      console.log('I am getting this attribute response');
      var search = ""
      Object.keys(attResponse).forEach(function (key) {
        console.log('In for each');
        search = search + '&' + key + '=' + attResponse[key];
        console.log(key, attResponse[key]);

      });
      console.log('Final search');
      console.log(search);
      return this.http.get(this.url + '/wp-json/instant/v1/search?product_cat=' + productCat + search);
    }
  }
}
