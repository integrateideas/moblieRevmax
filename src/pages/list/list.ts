import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { WooApiService } from 'ng2woo';
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private woo: WooApiService) {
   
  }
  ngOnInit(): void {
    // Fetch all products
    this.woo.fetchItems('products/categories?per_page=10')
      .then(products => console.log(products));
  }
}
