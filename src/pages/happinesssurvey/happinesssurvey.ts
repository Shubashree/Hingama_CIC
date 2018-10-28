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
    this.scorepush = this.firebased.list('/' + this.fire.auth.currentUser.email +'/');


    this.scorepush.push({
      HappinessScore: this.overall_score
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
