import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpfulLinksPage } from './helpful-links';

@NgModule({
  declarations: [
    HelpfulLinksPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpfulLinksPage),
  ],
})
export class HelpfulLinksPageModule {}
