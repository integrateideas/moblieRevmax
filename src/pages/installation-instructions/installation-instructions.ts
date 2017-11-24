import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the InstallationInstructionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'installations',
    segment: 'installations'
  }
)
@Component({
  selector: 'page-installation-instructions',
  templateUrl: 'installation-instructions.html',
})
export class InstallationInstructionsPage {
  instructions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public sanitizer: DomSanitizer) {
    this.instructions = this.navParams.get("instructions");
    console.log('these are instructions');
    console.log(this.instructions);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
