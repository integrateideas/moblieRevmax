import { Component } from '@angular/core';
import { NavController,NavParams, } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RevmaxProvider as Revmax } from '../../providers/revmax';

@IonicPage(
  {
    name: 'landing',
    segment: 'landing/:pageName'
  }
)
@Component({
  selector: 'landing',
  templateUrl: 'home.html'
})
export class HomePage {
  qq: boolean | Promise<void>;
  public catId;
  public products;

  constructor(public navCtrl: NavController, public navParams: NavParams,public Revmax: Revmax) {
    console.log('In constructor of home');
    this.catId = this.navParams.get("catId");
    console.log(this.catId);
    if(!this.catId){
      console.log('no catId');
    }

    this.showProducts();
  }
  
  showProducts(){
    this.Revmax.fetchCategoryProducts(this.catId);
    this.products = this.Revmax.products;
    console.log('here are the products');
    console.log(this.products);

    if(this.products){
      this.products = this.Revmax.products;
    }
    else{
      console.log('in else');
      this.Revmax.categoryProductSubject.subscribe((val)=>{
        console.log('in subs');      
        console.log(val);
        this.products = val;      
            });
      }
    }

  showProductDetail(productId){
    this.navCtrl.push('product-detail',{id: productId});
  }

}
