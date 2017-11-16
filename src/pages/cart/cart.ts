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
  cartString: string;
  quantity: any;
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
                  if (item.product.force_sell_product_info){
                    this.total = this.total + (item.product.force_sell_product_info.product_price * item.quantity);
                  }
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
      if (item.product.force_sell_product_info) {
        this.total = this.total - (item.product.force_sell_product_info.product_price * quantity);
      }

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }
    
  }

  addQuantity(item, qty){
    console.log(item);
    this.storage.get("cart").then((data) => {
      for (let i = 0; i < data.length; i++) {
        
        if (item.product.id == data[i].product.id) {
          this.total = parseFloat(this.total) - parseFloat(data[i].amount);
          console.log("Product is already in the cart");
          console.log(this.total);
          data[i].quantity = qty;
          delete data[i].amount;
          data[i].amount = parseFloat(data[i].product.price) * parseFloat(data[i].quantity);
          this.total = parseFloat(this.total) + parseFloat(data[i].amount);
          console.log(this.total);
          if (item.product.force_sell_product_info) {
            console.log("in if");
            this.total = this.total - (item.product.force_sell_product_info.product_price * data[i].quantity);
            console.log(item.product.force_sell_product_info.product_price);
            console.log(qty);
            this.total = this.total + (item.product.force_sell_product_info.product_price * qty);
            console.log(this.total);
          }
        }
      }

      this.storage.set("cart", data).then(() => {
        console.log("Quantity Updated");
        console.log(data);
      })
     
    })
  }
    
  closeModal(){
    this.viewCtrl.dismiss();
  }
  
  checkout(){
    console.log("in checkout");
    this.storage.get("cart").then((data) => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].product){
          delete data[i].product;
          delete data[i].amount;
        }
      }
      console.log(data);
      this.cartString = JSON.stringify(data);

      // let modified = delete data.product;
      // console.log(modified);
      // this.cartString = JSON.stringify(data);
      // console.log(this.cartString);
    })
  }
}/* Class ends here */
