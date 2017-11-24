import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchProductsPage } from './search-products';

@NgModule({
  declarations: [
    SearchProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchProductsPage),
  ],
})
export class SearchProductsPageModule {}
