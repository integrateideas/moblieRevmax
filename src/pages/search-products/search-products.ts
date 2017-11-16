import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';

/**
 * Generated class for the SearchProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'search-products',
  segment: 'search-products'
})
@Component({
  selector: 'page-search-products',
  templateUrl: 'search-products.html',
})
export class SearchProductsPage {
  catSlug: any;
  products: any;
  recievedData: any;
  attributeOptions: Array<any> = [];
  attributeResponse: any;
  attributes: any;
  productCategories: any;
  productCatResponse:any;
  productCatResponseName: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public Revmax: Revmax,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private appConfig: AppConfig,
    public app: App
    ) {
    this.productCategories = this.Revmax.searchedCategories;
    this.productCatResponse = this.navParams.get("category");
    this.attributeResponse = this.navParams.get("attResponse");
    
    this.attributes = this.Revmax.allAttributes;
    this.attributeOptions = this.Revmax.attributeOptions;
    console.log("Category response from home");
    console.log(this.productCatResponse);
    console.log('allllll attributes');
    console.log(this.attributeResponse);
    // this.fetchAttributes();
  }


  /* search result only for product category  */
  getProductCategory(){
    console.log('In category function');
    console.log(this.productCatResponse);
    if (this.productCatResponse){
          this.viewCtrl.dismiss().then(() => {
            this.app.getRootNav().setRoot('product-category', {
              'category': this.productCatResponse,
              'slug': this.productCatResponse.slug,
              'catId': this.productCatResponse.id
            });
          });
        
      
    }
  }

  getProductAttribute(){
    if (typeof this.productCatResponse != "undefined" && this.productCatResponse != null){
      console.log('here is the attribute response');
      console.log(this.attributeResponse);
      
      this.appConfig.filterProducts(this.productCatResponse.slug, this.attributeResponse)
        .subscribe((response) => {
          console.log('searched response');
          console.log(response);
          this.recievedData = response;
          if (this.recievedData != null){
            this.recievedData.attResponse = this.attributeResponse;
            this.recievedData.catTitle = this.productCatResponse.name;
          }
          this.viewCtrl.dismiss(this.recievedData);
        },
        (error) => {
          console.log('in error');
          console.log('error in getting variations for this product');
          console.log(error);

        });



      // this.Revmax.searchResult(this.productCatResponseId, this.attributeResponse);
      // this.Revmax.getDataSubject.subscribe((val) => {
      // this.recievedData = val.searchResult;
      // console.log("this is the filtered data");
      // console.log(this.recievedData);
      // this.recievedData.attResponse = this.attributeResponse;
      // this.viewCtrl.dismiss(this.recievedData);
      // });
     
    }else{
      const alert = this.alertCtrl.create({
        title: 'Select Category',
        subTitle: 'Please select product category first.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  
}
