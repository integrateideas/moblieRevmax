import { Injectable } from '@angular/core';
import {CustomHttpProvider  } from './custom-http';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppConfigurationProvider {
  //Enviornment variables
  wordpressStagingUrl:string="http://revmax.twinspark.co";
  wordpressLiveUrl:string="http://revmax.twinspark.co";
  
  constructor(  public http: CustomHttpProvider, private customhttp: Http ) {
    
  }
  
  fetchMenuItems(){
    // var menuOptions = [];
       return this.http.get(this.wordpressStagingUrl+'/wp-json/wp-api-menus/v2/menus/2184')
                          .map((response) => response.json());
  }  
  
  /* Fetch the product variation */
    getProductVariation(requestData, product, productId){
      let body = new URLSearchParams();
      body.set('product_id',productId);
      for(let key in requestData){
       let key1 = key.toLowerCase( );
        key1 = key1.replace(/\s/g, "-");
        key1 = "attribute_"+key1;
        body.set(key1, requestData[key]);
        console.log('In App configuration');
        console.log(body);
      }
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let url = this.wordpressStagingUrl +"/product/"+product+"/?wc-ajax=get_variation";
      return this.customhttp.post(url, body.toString().replace(/ /g,''),options)
      .map((response) => response.json());
       }

  /* Add product to cart with no variation.*/
    addToCart(productCategory, productId){
      return this.http.get(this.wordpressStagingUrl+'/product-category/'+productCategory+'/?add-to-cart='+productId)
      .map((response) => response.json());
      /* Example */
    // <a href="http://revmax.twinspark.co/product-category/performance-valve-bodies/performance-valve-bodies-ford-diesel/?add-to-cart=4849">Add to Cart</a>
  }

  /* Add to cart with variations. */
  addToCartVariation(productCategory, productId, variations, variationId){
    let body = new URLSearchParams();
    for(let key in variations){
      let key1 = key.toLowerCase( );
       key1 = key1.replace(/\s/g, "-");
       key1 = "attribute_"+key1;
       body.set(key1, variations[key]);
       console.log('In App configuration');
       console.log(body);
     }
    
    return this.http.get(this.wordpressStagingUrl+'/product-category/'+productCategory+'/?add-to-cart='+productId+'&variation_id='+variationId+'&'+body.toString().replace(/ /g,''))
    .map((response) => response.json());
    /* Example */
  // http://revmax.twinspark.co/product/dodge-rebuilt-48re-signature-series-transmission/?add-to-cart=8490&variation_id=8531&attribute_select-vehicle=2%20Wheel%20Drive&attribute_torque-converter-stall-speed=Stock%20Stall&attribute_valve-body-options=Standard%20High%20Performance%20/%20Towing
  }

  getFrontPage(){
    return this.http.get(this.wordpressStagingUrl+'/wp-json/wp/v2/frontpage')
    .map((response) => response.json());
  }


  }