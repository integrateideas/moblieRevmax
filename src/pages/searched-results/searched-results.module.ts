import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchedResultsPage } from './searched-results';

@NgModule({
  declarations: [
    SearchedResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchedResultsPage),
  ],
})
export class SearchedResultsPageModule {}
