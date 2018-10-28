import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoggedinPage } from '../loggedin/loggedin';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { RegisterPage } from '../register/register';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';

export interface User { uid: string; email: string; }

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  private userState: Observable<firebase.User>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore, private alertCtrl: AlertController, private fire: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private gplus: GooglePlus, private platform: Platform) {

    this.userCollection = afs.collection<User>('users')
    this.userState = this.fire.authState;
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
      .then(data => {
        const user: User = { uid: this.fire.auth.currentUser.uid, email: this.fire.auth.currentUser.email };
        this.addUser(user);
        this.alert('Success! You\'re logged in');
        this.navCtrl.setRoot(LoggedinPage);
      })
      .catch(error => {
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

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '554590151118-9leguguj92evoc1c115m8uqrt75jpmep.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      await this.fire.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch (err) {
      console.log(err)
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.fire.auth.signInWithPopup(provider);
      credential.user;
    } catch (err) {
      console.log(err)
    }
  }

  async googleLogin() {
    if (this.platform.is('cordova')) {
      await this.nativeGoogleLogin();
    } else {
      await this.webGoogleLogin();
    }

    try {
      const user: User = { uid: this.fire.auth.currentUser.uid, email: this.fire.auth.currentUser.email };
      this.addUser(user);
      this.alert('Success! You\'re logged in');
      this.navCtrl.setRoot(LoggedinPage);
    } catch (err) {
      console.log('got an error', err);
      this.alert(err.message);
    }
    
  }

  signOut() {
    this.fire.auth.signOut();
  }



}