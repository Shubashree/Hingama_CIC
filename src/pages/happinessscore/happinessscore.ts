import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HappinessscorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-happinessscore',
  templateUrl: 'happinessscore.html',
})
export class HappinessscorePage {
  final_score:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.final_score=navParams.get('surveyscore');
  console.log(this.final_score);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappinessscorePage');
  }

}
