import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { SMS } from '@ionic-native/sms';


/**
 * Generated class for the AddtrustedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtrusted',
  templateUrl: 'addtrusted.html',
})
export class AddtrustedPage {

  @ViewChild('ctname') contactname;
  @ViewChild('phnumber') phone;
  public currentuser:any;
  public dataref: any;
  public sms: SMS;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebased: AngularFireDatabase, private fire: AngularFireAuth, public toastctrl: ToastController) {
  }

addcontact()
{	console.log("Im here");
	this.currentuser = this.fire.auth.currentUser.uid;
	this.dataref = this.firebased.list('/' + this.currentuser +'/trustedcontacts');
	this.dataref.push({ContactName: this.contactname.value, PhoneNumber: this.phone.value,Confirmed: "No"}).then(resolve =>{
      let toast = this.toastctrl.create({
        message: "Request Sent! If the contact accepts your request, it his/her details will be displayed in the Contact page",
        duration: 4000,
        position: ''
        });
        toast.present();
      },error =>
      {
        let toast = this.toastctrl.create({
        message: "Data Not submitted",
        duration: 4000,
        position: ''
        });
        toast.present();
      });
}

sendsmsrequest()
{
	this.sms.send(this.phone.value,'Would you like to support'+this.currentuser+'in their endeavor? If yes, please click on the following link:');
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtrustedPage');
  }

}
