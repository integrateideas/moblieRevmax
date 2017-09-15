import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'product-detail',
    segment: 'product-detail/:id'
  }
)
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  loader: any;
  public productId;
  public product;
  header: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public Revmax: Revmax, public loadingCtrl: LoadingController) {
    this.productId = this.navParams.get("id");
    console.log(this.productId);
    this.showProductDetails()
  }

  showProductDetails(){
    this.presentLoading();
    this.Revmax.products = {};
    this.Revmax.fetchProductInfo(this.productId);
    // this.product = this.Revmax.products.productInfo;
    // console.log('here are the products'); 
    // console.log(this.product);

    if(this.productId == null){
      // this.product = this.Revmax.products.productInfo;
      // this.header =  'description';
      this.loader.dismiss();
    }
    else{
      console.log('in else');
      this.Revmax.getDataSubject.subscribe((val)=>{
        console.log('in subs of product detail');      
        console.log(val);
        this.product = val.productInfo;    
        this.header =  'description'; 
        this.loader.dismiss(); 
      });
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }

}
