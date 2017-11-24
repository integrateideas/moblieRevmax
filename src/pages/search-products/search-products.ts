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
  actualProductCategories: any;
  attributeResponse: {};
  attributes: any;
  productCategories: Array<any> =[];
  productCatResponse:any;
  productCatResponseName: any;
  productCatSlug:any;
  productCatName: any;
  refreshFlag : boolean;

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
    console.log('these are the categories from provider');
    console.log(this.productCategories);
    // this.actualProductCategories.forEach((singleProduct, index) => {
      
    //   var data = {
    //     id: singleProduct.id,
    //     slug: singleProduct.slug,
    //     name: singleProduct.name,

    //   };
    //   this.productCategories.push(data);
   
      
    //   console.log("these are the modified categories");
    //   console.log(this.productCategories);
    // })
    this.refreshFlag = true;
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
  getProductCategory(data){
    console.log('In category function');
    console.log("this is the event");
    console.log(data);
    console.log(this.productCatResponse);
    for (let i = 0; i < this.productCategories.length; i++) {
      if (this.productCatResponse == this.productCategories[i].id) {
        this.productCatSlug = this.productCategories[i].slug;
        this.productCatName = this.productCategories[i].name;

      }
    }

    if (this.productCatResponse){
          this.viewCtrl.dismiss().then(() => {
            this.app.getRootNav().setRoot('product-category', {
              'category': this.productCatResponse,
              'slug': this.productCatSlug,
              'catId': this.productCatResponse
            });
          });
        
      
    }
  }

  getProductAttribute(){
    if (typeof this.productCatResponse != "undefined" && this.productCatResponse != null){
      for (let i = 0; i < this.productCategories.length; i++) {
        if (this.productCatResponse == this.productCategories[i].id) {
          this.productCatSlug = this.productCategories[i].slug;
          this.productCatName = this.productCategories[i].name;
        }
      }
      console.log('here is the attribute response');
      console.log(this.attributeResponse);
      
      this.appConfig.filterProducts(this.productCatSlug, this.attributeResponse)
        .subscribe((response) => {
          console.log('searched response');
          console.log(response);
          this.recievedData = response;
          if (this.recievedData != null){
            this.recievedData.attResponse = this.attributeResponse;
            this.recievedData.catTitle = this.productCatSlug;
          }
          console.log(this.recievedData);
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

  refresh(){
    this.refreshFlag = false;
    console.log("before empty");
    console.log(this.attributeResponse);
    console.log("In refresh");
    this.attributeResponse = {} ;
    console.log(this.attributeResponse)
  }

  
}
