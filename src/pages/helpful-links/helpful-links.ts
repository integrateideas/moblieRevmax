import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpfulLinksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'helpful-links',
    segment: 'helpful-links'
  }
)
@Component({
  selector: 'page-helpful-links',
  templateUrl: 'helpful-links.html',
})
export class HelpfulLinksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
