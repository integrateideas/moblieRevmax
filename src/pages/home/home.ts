import { Component } from '@angular/core';
import { NavController,NavParams, } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';

@IonicPage(
  {
    name: 'shop',
    segment: 'shop/:pageName'
  }
)
@Component({
  selector: 'shop',
  templateUrl: 'home.html'
})
export class HomePage {
  loader: any;
  public catId;
  public products;

  constructor(public navCtrl: NavController, public navParams: NavParams,public Revmax: Revmax, public loadingCtrl: LoadingController,) {
    console.log('In constructor of home');
    this.catId = this.navParams.get("catId");
    console.log(this.catId);
    if(!this.catId){
      console.log('no catId');
    }

    this.showProducts();
  }
  
  showProducts(){
    this.presentLoading();
    this.Revmax.products = {};
    this.Revmax.fetchCategoryProducts(this.catId);

    // this.products = this.Revmax.products.productCategory;
    // console.log('here are the products');
    // console.log(this.products);

    if(this.catId == null){
      // this.products = this.Revmax.products.productCategory;
      this.loader.dismiss();
    }
    else{
      this.Revmax.getDataSubject.subscribe((val)=>{
        this.products = val.productCategory;      
        this.loader.dismiss();
        });
    }
  }

  showProductDetail(productId){
    this.navCtrl.push('product-detail',{id: productId});
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }

}
