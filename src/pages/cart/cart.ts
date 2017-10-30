import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'cart',
    segment: 'cart'
  }
)
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public storage: Storage, 
    public viewCtrl: ViewController, private appConfig: AppConfig) {
      this.total = 0.0; 
      this.storage.ready().then(()=>{
        this.storage.get("cart").then( (data)=>{
          console.log('getting cart data');
          console.log(data);
          this.cartItems = data;
          console.log(this.cartItems);
        
          if(this.cartItems != null){
              if(this.cartItems.length > 0){
                this.cartItems.forEach( (item, index)=> {
                  this.total = this.total + (item.product.price * item.qty)
                })
        
              } else {
        
                this.showEmptyCartMessage = true;
        
              }
          }
        })
    
      })

  } /* Constructor ends here */

  removeFromCart(item, i){ 
    let price = item.product.price;
    let qty = item.qty;  
    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
    
  }
    
  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  checkout(){
    console.log('In checkout');
    console.log(this.cartItems);
    var urlString =  this.appConfig.wordpressStagingUrl+'/cart/?add-to-cart='
    this.cartItems.forEach( (data, index)=> {
      if(data.variationId == ""){
        urlString += ','+ data.product.id + ':'+ data.qty;
      }else{
        let body = new URLSearchParams();
        for(let key in data.variationData){
          let key1 = key.toLowerCase( );
          console.log('after lower case');
           key1 = key1.replace(/\s/g, "-");
           key1 = "attribute_"+key1;
           body.set(key1, data.variationData[key]);
          }
        urlString += ','+ data.product.id + ':'+ data.qty + '&variation_id=' + data.variationId
        +'&'+ body.toString().replace(/ /g,'');
      }
    })
    console.log('this is the final url string');
    console.log(urlString);
    window.open(urlString, '_system', 'location=yes');
        
  }
}/* Class ends here */
