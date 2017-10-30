import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UpgradeProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'upgrade-products',
    segment: 'upgrade-products'
  }
)
@Component({
  selector: 'page-upgrade-products',
  templateUrl: 'upgrade-products.html',
})
export class UpgradeProductsPage {
  public product;
  loader: any;
  upsellIdArray: any;
  allProducts: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    public Revmax: Revmax, 
    public loadingCtrl: LoadingController,
    private appConfig: AppConfig,
    public storage: Storage, 
    public toastCtrl: ToastController,
    ) {
    this.upsellIdArray = this.navParams.get("upsellIds");
    console.log(this.upsellIdArray);
    this.Revmax.products = {};
    this.Revmax.fetchProducts(this.upsellIdArray);
    this.Revmax.getDataSubject.subscribe((val)=>{
      console.log('in subs of product detail');
      this.allProducts = val.allProducts; 
      console.log(val.allProducts);      
      // this.allProducts.push(this.product);
    });
    // for (let productId of this.upsellIdArray) {
      // console.log(productId); 
      // this.getproductDetail(this.upsellIdArray);
      
  //  }
   console.log('here is the array data');
   console.log(this.allProducts);

  }

  // getproductDetail(this.upsellIdArray){
  //   // this.presentLoading();
  //   this.Revmax.products = {};
  //   this.Revmax.fetchProducts(productId);
 
  //   if(productId == null){
  //     // this.loader.dismiss();
  //   }
  //   else{
  //     console.log('in else');
  //     this.Revmax.getDataSubject.subscribe((val)=>{
  //       console.log('in subs of product detail');
  //       this.product = val.productInfo; 
  //       console.log(val.productInfo);      
  //       this.allProducts.push(this.product);
  //     });
  //   }
  // }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  addCart(productCat, productId, product){
    this.appConfig.addToCart(productCat, productId)
    .subscribe((response) => {
      console.log('Cart added');
      console.log(response);
      // this.toastCtrl.create({
      //   message: "Cart Updated",
      //   duration: 3000
      // }).present();
    },
    (error)=> {
      console.log('error in Add to cart');
     
    });
    this.addToCart(product);
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

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }
}
