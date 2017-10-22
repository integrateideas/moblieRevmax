import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';


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
  products: any;
  pages: any;
  response: any;
  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Revmax: Revmax,
            
    ) {
      this.dashboard();
  }

  dashboard(){
    this.Revmax.fetchCategories();
    this.Revmax.getDataSubject.subscribe((val)=>{
      this.products = val.allCategories;   
      console.log('In dashoard');
      console.log(this.products);   
      });
  }

  showProductDetail(id, name){
    // this.Revmax.products = {};
    // this.Revmax.fetchCategoryProducts(id);
    // this.Revmax.getDataSubject.subscribe((val)=>{
    //   this.products = val.productCategory;      
    
    //   });
    this.navCtrl.setRoot('shop',{
      'catId':id,
      'page' : name
    });
  }
  

}
