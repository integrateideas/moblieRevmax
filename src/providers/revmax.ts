import { Injectable } from '@angular/core';
import {CustomHttpProvider  } from './configuration/custom-http';
import 'rxjs/add/operator/map';
import { WooApiService } from 'ng2woo';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RevmaxProvider {
  wooCommerceStagingUrl:string="http://revmax.twinspark.co";
  wooCommerceLiveUrl:string="http://revmax.twinspark.co";
  wooCommerceConsumerKey:string="ck_5ecf43a297b5341dfb68c4ba5f7e83db56125b19";
  wooCommerceConsumerSecret:string="cs_6387cb6a55c87e8cd6223fbca39a92324dbfd013";
  wooCommerceVersion:string="wc/v2";

  products:any;
  constructor(  public http: CustomHttpProvider, private woo: WooApiService) {
    
  }
  fetchCategoryProducts(catId){
    return this.woo.fetchItems('products?category='+catId+'&per_page=10')
      .then((products)=>this.products = products)
      .catch(error => console.log(error));
  }
  fetchProductInfo(){
    this.woo.fetchItems('products?category=623&per_page=10')
      .then(products => console.log(products))
      .catch(error => console.log(error));
  }    
}