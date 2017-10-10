import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { WooApiModule, WooApiService } from 'ng2woo';

const WooCommerceConfig = {
    url:   'http://revmax.twinspark.co', 
    consumerKey:    'ck_5ecf43a297b5341dfb68c4ba5f7e83db56125b19',
    consumerSecret:  'cs_6387cb6a55c87e8cd6223fbca39a92324dbfd013',
    wp_api: true,
    version: 'wc/v1'
  };
@NgModule({
  declarations: [ListPage],
  imports: [IonicPageModule.forChild(ListPage) ,WooApiModule.forRoot(WooCommerceConfig)],
  providers: [ WooApiService ]
})
export class HomePageModule { }