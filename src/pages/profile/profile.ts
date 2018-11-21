import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Contacts, Contact, ContactField,ContactName, ContactFindOptions, ContactFieldType} from '@ionic-native/contacts';
import { AddtrustedPage } from '../addtrusted/addtrusted';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public trustedcontactname: any;
  public trustedcontactnum: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  notificationstoggle()
  {
  console.log("Notifstoggle");
  }
  addtrustedcontacts()
  {
  console.log("Trusted Contacts");
  this.navCtrl.push(AddtrustedPage);
  }
  viewtrustedcontacts()
  {
  console.log("Trusted Contacts");
  }
  logout()
  {
  console.log("Log out");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
