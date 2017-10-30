import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import { RevmaxProvider as Revmax } from '../../providers/revmax';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfigurationProvider as AppConfig } from '../../providers/configuration/app-configuration';
import { AlertController } from 'ionic-angular';

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
  title: any;
  name: any;
  showUpgradeButton: boolean;
  isVariation: boolean;
  variationLength: number;
  variationId: any;
  productCat: any;
  updatedPrice: any;
  instalationIns: string;
  loader: any;
  variationsData: Array<any> =[];
  productName:any;
  public productId;
  public product:any;
  header: string;
  selectedUpsellProducts: Array<any> =[];
  checkUpsell : Array<any> =[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public Revmax: Revmax, 
     public loadingCtrl: LoadingController,
     public storage: Storage, 
     public toastCtrl: ToastController, 
     public modalCtrl: ModalController,
     private appConfig: AppConfig,
     public alertCtrl: AlertController
    ) {
    this.productId = this.navParams.get("id");
    this.productCat = this.navParams.get("productCat");
    console.log('In product detail params');
    console.log(this.name);
    this.showUpgradeButton = false;
    this.isVariation = false;
   
    this.showProductDetails();
  }

  showProductDetails(){
    this.presentLoading();
    this.Revmax.products = {};
    this.Revmax.fetchProductInfo(this.productId);
 
    if(this.productId == null){
      // this.product = this.Revmax.products.productInfo;
      // this.header =  'description';
      this.loader.dismiss();
    }
    else{
      console.log('in else');
      this.Revmax.getDataSubject.subscribe((val)=>{
        console.log('in subs of product detail');      
        this.product = val.productInfo; 
        // console.log(this.product.data);
        this.instalationIns = this.product.short_description;   
        this.header =  'description'; 
        this.productName = this.product.slug;
        this.title = this.product.categories[0].name;
        

        if(this.product.attributes.length > 0){
          for (let pro of this.product.attributes) {
            console.log(pro.variation); 
            if(pro.variation  == true){
              this.isVariation = true;
            }    
         }
        }

        if(this.product.upsell_ids.length > 0){
          this.showUpgradeButton = true;
          console.log(this.showUpgradeButton);
          console.log(this.product.upsell_ids);
        }
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


  addCart(product) {

    if(this.product.upsell_product_info){
      if(this.selectedUpsellProducts.length == 0){
        const alert = this.alertCtrl.create({
          title: 'Select Upgrades',
          message: "You haven't selected any upgrades. Please be aware that after orders are finalized, upgrades cannot be added.",
          buttons: [
            {
              text: 'Show me the upgrades',
              handler: () => {
                this.modalCtrl.create('upgrade-products', {
                  'upsellIds':this.product.upsell_ids
                }).present();
                console.log('show upgrades');
              }
            },
            {
              text: "No, I don't want upgrades" ,
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                 /* Check for variations */
                if(this.isVariation == true && (this.variationId == null || typeof this.variationId == "undefined")){
                  // alert("Please select all the variations.");
                  console.log("Please select all the variations.")
                  const alert = this.alertCtrl.create({
                    title: 'Select Variations',
                    subTitle: 'Please select all the variations.',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else{
                  this.addProductToStorage(product);
                }
              }
            }
          ]
        });
        alert.present();
      }
      if(this.selectedUpsellProducts.length &&(this.selectedUpsellProducts.length < this.product.upsell_product_info.length)){
        const alert = this.alertCtrl.create({
          title: 'Select Upgrades',
          message: "You haven't selected all the upgrades, you only have 24 hours after you purchase to make the decision.",
          buttons: [
            {
              text: 'Show me the upgrades',
              handler: () => {
                this.modalCtrl.create('upgrade-products', {
                  'upsellIds':this.product.upsell_ids
                }).present();
                console.log('show upgrades');
              }
            },
            {
              text: "No, I don't want upgrades" ,
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                 /* Check for variations */
                 if(this.isVariation == true && (this.variationId == null || typeof this.variationId == "undefined")){
                  // alert("Please select all the variations.");
                  console.log("Please select all the variations.");
                  const alert = this.alertCtrl.create({
                    title: 'Select Variations',
                    subTitle: 'Please select all the variations.',
                    buttons: ['Ok']
                  });
                  alert.present();
                }else{
                  this.addProductToStorage(product);
                }
              }
            }
          ]
        });
        alert.present();
      }
    } else if(this.isVariation == true && (this.variationId == null || typeof this.variationId == "undefined")){
      const alert = this.alertCtrl.create({
        title: 'Select Variations',
        subTitle: 'Please select all the variations.',
        buttons: ['Ok']
      });
      alert.present();
       /* Check for variations */
    // if(this.isVariation == true && this.variationId != null && typeof this.variationId != "undefined"){
    //   alert("Please select all the variations.");
    // }else{
    //   this.addProductToStorage(product);
    // }
    } else {
      this.addProductToStorage(product);
    }
  }

  addProductToStorage(product){
    console.log('in add to cart');
    this.storage.get("cart").then((data) => {
      console.log(data);
      if (data == null || data.length == 0) {
        data = [];
        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(this.product.price),
          "productId": product.id,
          "variationId": this.variationId ? this.variationId: "" ,
          "variationData": this.variationsData ? this.variationsData: "",
        })
      } else {
        let added = 0;
          for (let i = 0; i < data.length; i++) {
            if (product.id == data[i].product.id) {
              let qty = data[i].qty;
              console.log("Product is already in the cart");
              data[i].qty = qty + 1;
              data[i].amount = parseFloat(data[i].amount) + parseFloat(this.product.price);
              added = 1;
            }
          }

        if (added == 0) {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(this.product.price),
            "productId": product.id,
            "variationId": this.variationId ? this.variationId: "" ,
            "variationData": this.variationsData ? this.variationsData: "",
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

        if(this.selectedUpsellProducts.length > 0) {
        this.selectedUpsellProducts.forEach( (upsell, index)=> {
          data.push({
                  "product": upsell,
                  "qty": 1,
                  "amount": parseFloat(upsell.price),
                  "productId": upsell.id,
                  "variationId": "",
                  "variationData": ""

                })
        })
        
        this.storage.set("cart", data).then(() => {
                console.log("Cart Updated");
                console.log(data);
               })
              }
      })
    })
  }
    
  openCart(){
    this.modalCtrl.create('cart').present();
  }

  installationInstructions(){
    this.modalCtrl.create('installations', {
      'instructions':this.instalationIns
    }).present();
  }

  getProductVariations(){
    console.log('In getting variation data');
    console.log(this.variationsData);
    console.log(this.productName);
    // if(this.variationLength >0){
      // this.variationLength = Object.keys(this.variationsData).length;
      this.appConfig.getProductVariation(this.variationsData, this.productName, this.productId)
      .subscribe((response) => {
        this.updatedPrice = response.price_html;
        this.variationId = response.variation_id;
        this.product.price = response.display_price;
        console.log('success in getting variations for this product');
            console.log(response);
      },
      (error)=> {
        console.log('in error');          
        console.log('error in getting variations for this product');
        console.log(error);
        
      });
    // }
  }

  upgradeProduct(){
    let chooseModal = this.modalCtrl.create('upgrade-products', {
      'upsellIds':this.product.upsell_ids,
      'checkUpsells':this.checkUpsell
    });
    chooseModal.onDidDismiss(data => {
      console.log(data);
       data.forEach( (product, index)=> {
        this.selectedUpsellProducts.push(product);
        this.checkUpsell[product.id] = true;
                  })
      
    });
    chooseModal.present();
  }

  /* To add upsell products in an array (selectedUpsellProducts) */
  addedProduct(element, product){
    // element.textContent = text;
    element.disabled = true;
    this.selectedUpsellProducts.push(product);
    this.checkUpsell[product.id] = true;
    console.log('Array of upsell products');
    console.log(this.selectedUpsellProducts);
  }


}
