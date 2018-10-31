import { Component } from '@angular/core';
import { ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AwesomePage } from '../awesome/awesome';

/**
 * Generated class for the MoodloggingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moodlogging',
  templateUrl: 'moodlogging.html',
})
export class MoodloggingPage {

  @ViewChild('slides') slides: any;
  //iterarray:any;
  list: Array <number>;
  filenames: Array<string>;
  datapush: AngularFireList<any>;
  feelings: any;
  currentuser: any;
  todaydate: any;
  m: any;
  d: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebased: AngularFireDatabase, private fire: AngularFireAuth, public toastctrl: ToastController, public loadctrl: LoadingController) {
  	this.list=[1,2,3,4,5];
  	this.filenames=['./../../assets/imgs/frowning.png','./../../assets/imgs/slightlyfrowning.png','./../../assets/imgs/neutralface.png','./../../assets/imgs/slightlyhappy.png','./../../assets/imgs/happy.png']
  	console.log(this.list);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoodloggingPage');
  }

  moveup(){
  	this.slides.slideNext();
  	console.log("slidenext");
  }
  movedown(){
  	this.slides.slidePrev();
  	console.log("slideprev");
  }
  displayimage()
  {

  }
  submitmood(i){
    var load = this.loadctrl.create({
    content: "Awesome!"
    });
    load.present();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
    this.d = '0'+dd
     } 

    if(mm<10) {
    this.m = '0'+mm
    } 

    this.todaydate = mm + '/' + dd + '/' + yyyy;


    this.currentuser = this.fire.auth.currentUser.uid
    console.log(this.currentuser);
    this.datapush = this.firebased.list('/' + this.currentuser +'/moodlog');
    this.datapush.push({
      detail: this.feelings,
      emotion: i,
      date: this.todaydate
    }).then(resolve =>{
      load.dismiss();
      this.navCtrl.push(AwesomePage);
      this.feelings = "";
      },error =>
      {
        load.dismiss();
        let toast = this.toastctrl.create({
        message: "An error occured, please enter again",
        duration: 4000,
        position: ''
        });
        toast.present();

        this.feelings = "";
      });


  }


}
