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
                  this.total = this.total + (item.product.price * item.quantity)
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
    let quantity = item.quantity;  
    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * quantity);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
    
  }
    
  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  checkout(){
    
    this.appConfig.checkout(this.cartItems).subscribe((response) => {
     
      console.log('response of checkout');
      console.log(response);
    },
    (error)=> {
      console.log('in error');          
      console.log('error in getting response of checkout');
      console.log(error);
      
    });
  }
}/* Class ends here */
