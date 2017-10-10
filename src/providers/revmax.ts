import { Injectable } from '@angular/core';
import {CustomHttpProvider  } from './configuration/custom-http';
import 'rxjs/add/operator/map';
import { WooApiService } from 'ng2woo';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RevmaxProvider {
  getDataSubject:Subject<any>; 
  wooCommerceStagingUrl:string="http://revmax.twinspark.co";
  wooCommerceLiveUrl:string="http://revmax.twinspark.co";
  wooCommerceConsumerKey:string="ck_5ecf43a297b5341dfb68c4ba5f7e83db56125b19";
  wooCommerceConsumerSecret:string="cs_6387cb6a55c87e8cd6223fbca39a92324dbfd013";
  wooCommerceVersion:string="wc/v1";
  
  products:any = {};
  // productInfo:any = false;
  constructor(  public http: CustomHttpProvider, private woo: WooApiService) {

    this.getDataSubject = new Subject();
    
  }
  fetchCategoryProducts(catId){
    if(!catId){
      return false;
    }
    console.log('In category products');
    return this.woo.fetchItems('products?category='+catId+'&per_page=10')
        .then((products) => {
          this.products.productCategory = products;
          this.gotData();
        }
      )
        .catch(error => console.log(error));
  }

  /* Subject to return the category product.*/
  gotData(){
    this.getDataSubject.next(this.products);
  }


  fetchProductInfo(productId){
    if(!productId){
      return false;
    }
    console.log('info');
    this.woo.fetchItems('products/'+productId)
    // this.woo.fetchItems('products/attributes/36')
      .then(products => { 
        this.products.productInfo = products;
        this.gotData();
        console.log(this.products.productInfo);
      }
    )
      .catch(error => console.log(error));
  }
  
  
  fetchCategories(){
    console.log('In categories');
    this.woo.fetchItems('products/categories')
      .then(products => console.log(products))
      .catch(error => console.log(error));
  }  
  
  /* For dashboard page */
  
  fetchProducts(){  
    console.log('all products');
    this.woo.fetchItems('products/')
    // this.woo.fetchItems('products/attributes/36')
      .then(products => { 
        this.products.allProducts = products;
        this.gotData();
        console.log(this.products.allProducts);
      }
    )
      .catch(error => console.log(error));
  }

}