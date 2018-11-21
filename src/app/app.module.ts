import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform} from 'ionic-angular';
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
import { GratitudejournalPage } from '../pages/gratitudejournal/gratitudejournal';
import { MoodloggingPage } from '../pages/moodlogging/moodlogging';
import { AwesomePage } from '../pages/awesome/awesome';
import { MediaPage } from '../pages/media/media';
import { HappinessscorePage } from '../pages/happinessscore/happinessscore';
import { Visualized3Page } from '../pages/visualized3/visualized3';
import { ProfilePage } from '../pages/profile/profile';
import { AddtrustedPage } from '../pages/addtrusted/addtrusted';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { AngularFirestore } from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus';

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
    HappinessscorePage,
    Visualized3Page,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    ProfilePage,
    GratitudejournalPage,
    MoodloggingPage,
    AwesomePage,
    MediaPage,
    AddtrustedPage
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
    HappinessscorePage,
    Visualized3Page,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    GratitudejournalPage,
    MoodloggingPage,
    ProfilePage,
    AwesomePage,
    MediaPage,
    AddtrustedPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AngularFirestore,
    GooglePlus
  ]
})
export class AppModule {}
