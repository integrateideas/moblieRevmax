import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'product-detail',
    segment: 'product-detail/:id'
  }
)
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  loader: any;
  public productId;
  public product;
  header: string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public Revmax: Revmax, 
     public loadingCtrl: LoadingController,
     public storage: Storage, 
     public toastCtrl: ToastController, 
     public modalCtrl: ModalController
    ) {
    this.productId = this.navParams.get("id");
    console.log(this.productId);
    this.showProductDetails();
  }

  showProductDetails(){
    this.presentLoading();
    this.Revmax.products = {};
    this.Revmax.fetchProductInfo(this.productId);
    // this.product = this.Revmax.products.productInfo;
    // console.log('here are the products'); 
    // console.log(this.product);

    if(this.productId == null){
      // this.product = this.Revmax.products.productInfo;
      // this.header =  'description';
      this.loader.dismiss();
    }
    else{
      console.log('in else');
      this.Revmax.getDataSubject.subscribe((val)=>{
        console.log('in subs of product detail');      
        console.log(val);
        this.product = val.productInfo;    
        this.header =  'description'; 
        this.loader.dismiss(); 
      });
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }

  addToCart(product) {

    console.log('in add to cart');
        this.storage.get("cart").then((data) => {
    
          if (data == null || data.length == 0) {
            data = [];
    
            data.push({
              "product": product,
              "qty": 1,
              "amount": parseFloat(product.price)
            })
          } else {
    
            let added = 0;
    
            for (let i = 0; i < data.length; i++) {
    
              if (product.id == data[i].product.id) {
                let qty = data[i].qty;
    
                console.log("Product is already in the cart");
    
                data[i].qty = qty + 1;
                data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
                added = 1;
              }
    
            }

            if (added == 0) {
              data.push({
                "product": product,
                "qty": 1,
                "amount": parseFloat(product.price)
              })
            }
    
          }
    
          this.storage.set("cart", data).then(() => {
            console.log("Cart Updated");
            console.log(data);
    
            this.toastCtrl.create({
              message: "Cart Updated",
              duration: 3000
            }).present();
    
          })
    
        })
    
      }
    
      openCart(){
    
        this.modalCtrl.create('cart').present();
    
      }

}
