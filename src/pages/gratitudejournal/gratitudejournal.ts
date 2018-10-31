import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FirebaseListObservable } from '@angular/fire/database-deprecated';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AwesomePage } from '../awesome/awesome';

/**
 * Generated class for the GratitudejournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gratitudejournal',
  templateUrl: 'gratitudejournal.html',
})
export class GratitudejournalPage {

  currentuser: any;
  datapush: AngularFireList<any>;
  textinput: any;
  date: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebased: AngularFireDatabase, private fire: AngularFireAuth, public loadctrl: LoadingController, public toastctrl: ToastController) {
  }

  savedata()
  {

  	var load = this.loadctrl.create({
    content: "Awesome!"
    });
    load.present();

  	this.currentuser = this.fire.auth.currentUser.uid
    console.log(this.currentuser);
    this.datapush = this.firebased.list('/' + this.currentuser +'/gratitudejournal');
    this.datapush.push({
      journaltext: this.textinput,
      Date: this.date
    }).then(resolve =>{
    	load.dismiss();
    	this.navCtrl.push(AwesomePage);
    	this.textinput = "";
    	this.date = "";
    	},error =>
    	{
    		load.dismiss();
    		let toast = this.toastctrl.create({
    		message: "An error occured, please enter again",
    		duration: 4000,
    		position: ''
    		});
    		toast.present();

    		this.textinput = "";
    		this.date = "";
    	});



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GratitudejournalPage');
  }

}
