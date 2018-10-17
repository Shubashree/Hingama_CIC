import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { HappinesssurveyPage } from '../pages/happinesssurvey/happinesssurvey';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LoggedinPage } from '../pages/loggedin/loggedin';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';

const firebaseAuth = {
  apiKey: "AIzaSyDXNvcoUEIsV7R-MzrXHVVSSkLCb2qzAP4",
  authDomain: "hingama-5c741.firebaseapp.com",
  databaseURL: "https://hingama-5c741.firebaseio.com",
  projectId: "hingama-5c741",
  storageBucket: "hingama-5c741.appspot.com",
  messagingSenderId: "554590151118"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HappinesssurveyPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    LoggedinPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HappinesssurveyPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    LoggedinPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
