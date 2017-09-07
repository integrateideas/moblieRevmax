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
  public catId;
  public products;

  constructor(public navCtrl: NavController, public navParams: NavParams,public Revmax: Revmax) {
    this.catId = navParams.get("catId");
    this.Revmax.fetchCategoryProducts(this.catId);
    console.log(this.Revmax.products);
  }

}
