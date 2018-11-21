import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FirebaseListObservable } from '@angular/fire/database-deprecated';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { HappinessscorePage } from '../happinessscore/happinessscore';

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
  slidenumber=0;
  array_of_scores:number[]=[];
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
      if(this.slidenumber!=28)
      {
        this.slides.lockSwipes(false);
        this.slidenumber=this.slidenumber+1;
        console.log("In next() current slidenumber is ")
        console.log(this.slidenumber);
        this.ans_completed=false;
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      }

  	}
  	else
  	{
  		//do nothing
  	}

  }

  prev()
  {
    console.log("Before clicking on Prev");
    console.log(this.slidenumber);
    this.slides.lockSwipes(false);

    //subtracting current score if present
    if(this.ans_completed==true)
    {
      this.score=this.score-this.array_of_scores[this.slidenumber];
      /*delete this.array_of_scores[this.slidenumber];
*/  this.array_of_scores.pop();  
    }
    //subtracting previous slide's score 
    this.score=this.score-this.array_of_scores[this.slidenumber-1];
    /*delete this.array_of_scores[this.slidenumber-1];*/
    this.array_of_scores.pop();

    this.ans_completed=false;
    this.slidenumber=this.slidenumber-1;
    console.log("Clicked on Prev");
    console.log("Subtracted score");
    console.log(this.score);
    console.log(this.slidenumber);
    this.slides.slidePrev();

    /*this.slides.lockSwipes(true);*/
  }

  afteranswer(answer,optselected,question){
    console.log("beg of ans_completed");
    console.log(this.ans_completed);
  	
    answer.selected = true;
    /*console.log(optselected);*/
    if(this.ans_completed==false)
    {
      if (optselected == "Strongly disagree")
      {
        this.array_of_scores.push(6);
        this.score = this.score + 6;
      }
      else if (optselected == "Moderately disagree") {
        this.array_of_scores.push(5);
        this.score = this.score + 5;
      }
      else if (optselected == "Slightly disagree") {
        this.array_of_scores.push(4);
        this.score = this.score + 4;
      }
      else if (optselected == "Slightly agree") {
        this.array_of_scores.push(3);
        this.score = this.score + 3;
      }
      else if (optselected == "Moderately agree") {
        this.array_of_scores.push(2);
        this.score = this.score + 2;
      }
      else if (optselected == "Strongly agree") {
        this.array_of_scores.push(1);
        this.score = this.score + 1;
      }
    }
    console.log(this.score);
    this.ans_completed = true;
    console.log("end of ans_completed");
    console.log(this.ans_completed);
    this.next();

  }

  getscore() {
    console.log("total score before dividing");
    console.log(this.score);
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

    //this.todaydate = this.m + '/' + this.d + '/' + yyyy;
    this.todaydate=new Date().getTime();
    console.log("Today's date");
    console.log(this.todaydate);

    this.scorepush.push({
      HappinessScore: this.overall_score,
      Date: this.todaydate
    });
    this.navCtrl.push(HappinessscorePage,{
      'surveyscore':this.overall_score
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

checkifnotfirst(i)
{ 
  if(i > 0)
  {
    return true;
  }
}

}
