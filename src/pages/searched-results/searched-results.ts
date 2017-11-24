import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular'

/**
 * Generated class for the SearchedResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'searched-results',
  segment: 'searched-results'
})
@Component({
  selector: 'page-searched-results',
  templateUrl: 'searched-results.html',
})
export class SearchedResultsPage {
  title: any;
  loader: any;
  catId: any;
  products: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public Revmax: Revmax, public loadingCtrl: LoadingController) {
    // this.showProducts();
    this.products = this.navParams.get("categoryData");
    console.log("in searched results");
    console.log(this.products.length);

  }

  // showProducts() {
  //   this.presentLoading();
  //   this.catId = this.navParams.get("catId");
  //   // this.title = this.navParams.get("page");
  //   // this.productCat = this.navParams.get("pageName");
  //   console.log(this.catId);
  //   if (!this.catId) {
  //     console.log('no catId');
  //   }
  //   // this.Revmax.products = {};
  //   this.Revmax.fetchCategoryProducts(this.catId);

  //   // this.products = this.Revmax.products.productCategory;
  //   // console.log('here are the products');
  //   // console.log(this.products);

  //   if (this.catId == null) {
  //     // this.products = this.Revmax.products.productCategory;
  //     this.loader.dismiss();
  //   }
  //   else {
  //     this.Revmax.getDataSubject.subscribe((val) => {
  //       this.products = val.productCategory;
  //       this.loader.dismiss();
  //     });
  //   }
  // }

  // presentLoading() {
  //   this.loader = this.loadingCtrl.create({
  //     content: "Loading...",
  //   });
  //   this.loader.present();
  // }

  showProductDetail(productId, name) {
    console.log('home navigation content. Name should be there');
    console.log(name);
    this.navCtrl.push('product-detail', { id: productId, /* productCat: this.productCat, */ });
  }

  back(){
    this.navCtrl.setRoot('dashboard');
  }

}
