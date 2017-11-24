import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstallationInstructionsPage } from './installation-instructions';

@NgModule({
  declarations: [
    InstallationInstructionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstallationInstructionsPage),
  ],
})
export class InstallationInstructionsPageModule {}
