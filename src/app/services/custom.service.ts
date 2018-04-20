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
      // .map((response) => console.log('menu response'));
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
}
