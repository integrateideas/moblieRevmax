import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
    IonicStorageModule.forRoot()
  ],
})
export class CartPageModule {}
