import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FirebaseListObservable } from '@angular/fire/database-deprecated';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Generated class for the HappinesssurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-happinesssurvey',
  templateUrl: 'happinesssurvey.html',
})
export class HappinesssurveyPage {

  @ViewChild('slides') slides: any;

  ans_completed: boolean = false;
  questions: any;
  score = 0;
  overall_score: any;
  scorepush: AngularFireList<any>;
  currentuser: any;
  todaydate: any;
  m: any;
  d: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public dataprovide: DataProvider, private firebased: AngularFireDatabase, private fire: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HappinesssurveyPage');

    this.slides.lockSwipes(true);

    this.dataprovide.fetchdata().then((data) => {
      console.log(data)
    	data.map((happinesssurvey) => {
    		return happinesssurvey;
    	});

    this.questions = data;


    })
  }

  next()
  {
  	if(this.ans_completed==true)
  	{
    this.slides.lockSwipes(false);
  	this.ans_completed=false;
  	this.slides.slideNext();
  	this.slides.lockSwipes(true);
  	}
  	else
  	{
  		//do nothing
  	}

  }

  afteranswer(answer,optselected,question){
  	this.ans_completed = true;
    answer.selected = true;
    console.log(optselected);
    if (optselected == "Strongly disagree")
    {
      this.score = this.score + 6;
    }
    else if (optselected == "Moderately disagree") {
      this.score = this.score + 5;
    }
    else if (optselected == "Slightly disagree") {
      this.score = this.score + 4;
    }
    else if (optselected == "Slightly agree") {
      this.score = this.score + 3;
    }
    else if (optselected == "Moderately agree") {
      this.score = this.score + 2;
    }
    else if (optselected == "Strongly agree") {
      this.score = this.score + 1;
    }
    console.log(this.score);
    

    

  }

  getscore() {
    this.overall_score = this.score / 29;
    console.log(this.overall_score);
    this.currentuser = this.fire.auth.currentUser.uid
    console.log(this.currentuser);
    this.scorepush = this.firebased.list('/' + this.currentuser +'/happiness-scores');
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

    this.todaydate = this.m + '/' + this.d + '/' + yyyy;


    this.scorepush.push({
      HappinessScore: this.overall_score,
      Date: this.todaydate
    });
  }


checkifnotlast(i)
{
	if(i != 28)
	{
		return true;
	}
}

checkiflast(i)
{
	if(i == 28)
	{
		return true;
	}
}

}
