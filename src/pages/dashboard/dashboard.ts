import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
// import { VideoPlayer ,VideoOptions } from '@ionic-native/video-player';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'dashboard',
    segment: 'dashboard'
  }
)
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Revmax: Revmax,
    //  private videoPlayer : VideoPlayer, private videoOpts : VideoOptions
    ) {
    // this.showProductDetails();
    // this.playVideo();
  }

  // public playVideo(){
  //   this.videoOpts = {volume : 1.0};
  //   this.videoPlayer.play('https://www.youtube.com/watch?v=PNzE1MX5iRU').then(() => {
  //   console.log('video completed');
  //   }).catch(err => {
  //   console.log(err);
  //   });    
// }
  // showProductDetails(){
  //   this.Revmax.products = {};
  //   this.Revmax.fetchProducts();
  //   // this.product = this.Revmax.products.productInfo;
  //   // console.log('here are the products'); 
  //   // console.log(this.product);

  //     console.log('in else');
  //     this.Revmax.getDataSubject.subscribe((val)=>{
  //       console.log('in subs of product detail');      
  //       console.log(val);
  //       this.product = val.allProducts;    
  //     });
  // }

  

}
