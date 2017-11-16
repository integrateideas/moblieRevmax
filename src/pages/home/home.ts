import { Component } from '@angular/core';
import { NavController,NavParams, } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

@IonicPage(
  {
    name: 'product-category',
    segment: 'product-category/:slug/:catId'
  }
)
@Component({
  selector: 'product-category',
  templateUrl: 'home.html'
})
export class HomePage {
  slug: any;
  catData: any;
  filteredAttributeData: any;
  searchCat: any;
  title: any;
  // productCat: any;
  loader: any;
  catId: any;
  products: any;
  attResponse: Array<any> = [];
  checkIfNoProducts :boolean= false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public Revmax: Revmax, public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {
      this.showProducts();
      console.log("in constructor of home");
      // console.log(this.filteredAttributeData);
      this.slug = this.navParams.get("slug");
      this.humanize(this.slug);
  }
  
  showProducts(){
    this.presentLoading();
    this.catData = this.navParams.get("category");
    console.log("this is the cat data from dashboard");
    console.log(this.catData);
    this.catId = this.navParams.get("catId");

    // if (this.catData && this.catData.object_id){
    //   this.catId = this.catData.object_id;
    // }else{
    //   this.catId = this.catData.id
    // }

    
    
    this.Revmax.fetchCategoryProducts(this.catId);
    this.Revmax.getDataSubject.subscribe((val) => {
      this.products = val.productCategory;
     
      this.loader.dismiss();
    });
    
  }

  humanize(str) {
    var frags = str.split('-');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    this.title = frags.join(' ');
    // return frags.join(' ');
  }

  showProductDetail(productId, name){
    console.log('home navigation content. Name should be there');
    console.log(name);
    this.navCtrl.push('product-detail',{id: productId, /* productCat: this.productCat, */});
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }

  /* Product category(all) data */
  searchProductCatData() {
    this.Revmax.fetchSearchedCategories();
    this.Revmax.getDataSubject.subscribe((val) => {
      this.searchCat = val.searchedCategories;
      console.log('In dashoard');
      console.log(this.searchCat);
    });
  }

  /* Search Popover */
  presentPopover(myEvent) {
   // if (this.catData && this.catData.object_id){
    //   this.catId = this.catData.object_id;
    // }else{
    //   this.catId = this.catData.id
    // }
    let popover = this.popoverCtrl.create('search-products', {
      // 'productCat': this.searchCat,
      'category': this.catData,
      'attResponse': this.attResponse ? this.attResponse :[],
    });
    popover.onDidDismiss(data => {
      console.log('popover close ho gya h');
      console.log(data);
      this.checkIfNoProducts = false;
      if(data != null){
        this.products = data;
        this.attResponse = data.attResponse; 
        this.slug = data.catTitle;
        this.humanize(this.slug); 
      }
      if((data && data.length == 0) || data == null ){
        this.products = [];
        this.checkIfNoProducts = true;
      }
     

      
    });
    popover.present({
      ev: myEvent,
    });
  }


}
