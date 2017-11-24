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
  checkUpsells: Array<any> =[];
  public product;
  loader: any;
  upsellIdArray: any;
  allProducts: any;
  selectedUpsellProducts: Array<any> =[];

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
    this.checkUpsells = this.navParams.get("checkUpsells");
    console.log('check upsells');
    console.log(this.upsellIdArray);
    this.Revmax.products = {};
    this.Revmax.fetchProducts(this.upsellIdArray);
    this.Revmax.getDataSubject.subscribe((val)=>{
      console.log('in subs of product detail');
      this.allProducts = val.allProducts; 
      console.log(this.allProducts);      
    });
  
   console.log('here is the array data');
   console.log(this.allProducts);

  }


  closeModal(){
    this.viewCtrl.dismiss(this.selectedUpsellProducts);
  }

  addCart( product){
    this.selectedUpsellProducts.push(product);
    // element.disabled = true;
    this.checkUpsells[product.id] = true;
    this.toastCtrl.create({
      message: "Cart Updated",
      duration: 3000
    }).present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }
}
