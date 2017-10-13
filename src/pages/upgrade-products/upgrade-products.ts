import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';

/**
 * Generated class for the UpgradeProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'upgrade-products',
    segment: 'upgrade-products'
  }
)
@Component({
  selector: 'page-upgrade-products',
  templateUrl: 'upgrade-products.html',
})
export class UpgradeProductsPage {
  public product;
  loader: any;
  upsellIdArray: any;
  allProducts: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public Revmax: Revmax, 
    public loadingCtrl: LoadingController,
    private appConfig: AppConfig
    ) {
    this.upsellIdArray = this.navParams.get("upsellIds");
    console.log(this.upsellIdArray);
    this.Revmax.products = {};
    this.Revmax.fetchProducts(this.upsellIdArray);
    this.Revmax.getDataSubject.subscribe((val)=>{
      console.log('in subs of product detail');
      this.allProducts = val.allProducts; 
      console.log(val.allProducts);      
      // this.allProducts.push(this.product);
    });
    // for (let productId of this.upsellIdArray) {
      // console.log(productId); 
      // this.getproductDetail(this.upsellIdArray);
      
  //  }
   console.log('here is the array data');
   console.log(this.allProducts);

  }

  // getproductDetail(this.upsellIdArray){
  //   // this.presentLoading();
  //   this.Revmax.products = {};
  //   this.Revmax.fetchProducts(productId);
 
  //   if(productId == null){
  //     // this.loader.dismiss();
  //   }
  //   else{
  //     console.log('in else');
  //     this.Revmax.getDataSubject.subscribe((val)=>{
  //       console.log('in subs of product detail');
  //       this.product = val.productInfo; 
  //       console.log(val.productInfo);      
  //       this.allProducts.push(this.product);
  //     });
  //   }
  // }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  addCart(productCat, productId){
    this.appConfig.addToCart(productCat, productId)
    .subscribe((response) => {
      console.log('Cart added');
      console.log(response);
      // this.toastCtrl.create({
      //   message: "Cart Updated",
      //   duration: 3000
      // }).present();
    },
    (error)=> {
      console.log('error in Add to cart');
     
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }
}
