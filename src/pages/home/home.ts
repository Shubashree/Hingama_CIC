import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoggedinPage } from '../loggedin/loggedin';

import { RegisterPage } from '../register/register';

export interface User { uid: string; email: string; }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('username') user;
  @ViewChild('password') password;

  private userCollection: AngularFirestoreCollection<User>;
  
  constructor(private afs: AngularFirestore, private alertCtrl: AlertController, private fire:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.userCollection = afs.collection<User>('users')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signInUser() {
    this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
    .then( data => {
      console.log('got some data', this.fire.auth.currentUser);
      console.log(this.fire.auth.currentUser.uid)
      const user: User = { uid: this.fire.auth.currentUser.uid, email: this.fire.auth.currentUser.email };
      this.addUser(user);
      this.alert('Success! You\'re logged in');
      this.navCtrl.setRoot( LoggedinPage );
    })
    .catch( error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
  }

  addUser(user: User) {
    let queryRef = this.userCollection.ref.where('uid', '==', user.uid);
    queryRef.get().then((res) => {
      if (res.size == 0) {
        this.userCollection.add(user);
      }
    })
  }

  register() {
  	this.navCtrl.push(RegisterPage);
  }


}