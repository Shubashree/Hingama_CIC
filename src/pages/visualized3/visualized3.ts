import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';


/**
 * Generated class for the Visualized3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualized3',
  templateUrl: 'visualized3.html',
})
export class Visualized3Page {

   public currentuser:any;
   public firebaseref: firebase.database.Reference;
   public retrievedata: Array<any> = [];
   public extracted_value:any;
   public startDate: any;
   public endDate:any;
   public finaldata:Array<any> = [];
   public today: any;
   public ionsel:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebased: AngularFireDatabase, private fire: AngularFireAuth) {

    this.currentuser = this.fire.auth.currentUser.uid;
    console.log("Current user:");
    console.log(this.currentuser);
    this.firebaseref = firebase.database().ref('/' + this.currentuser + '/moodlog');

/*    this.startDate="10/29/2018";
    this.endDate="10/30/2018";
    console.log("Sorted");*/

/*    this.firebaseref.orderByChild("date").startAt(this.startDate).endAt(this.endDate).on('value',whatever=>{
    	this.retrievedata=[];
    	whatever.forEach(okok=>{
    		this.retrievedata.push(okok.val());
    	});
    	//console.log(whatever.val());
    	console.log("Inside sorting");
    	console.log(this.retrievedata);
    });
*/
 /*   this.firebaseref.on('value', item =>{
    	this.retrievedata = [];
    	item.forEach( itemsnap =>{
    		this.retrievedata.push(itemsnap.val());
    	});
    	console.log(this.retrievedata);

    });*/

  }

  changesegment(event){
  	console.log(event.value);
  	this.ionsel=event.value;

  	var today=new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    //this.today = mm + '/' + dd + '/' + yyyy;
    this.today=today.getTime();
    console.log("Today's date");
    console.log(this.today);
    if(this.ionsel == 'Week')
    {
	    //week
	    if((dd-7)<=0)
	    {	
	    	if((mm-1)<=0)
	    	{
	    	
	    		this.startDate= new Date((12- (mm-1))+ '/' + (30-(dd-7)) + '/' + (yyyy-1)).getTime();

	    	}
	    	else
	    	{
	    		this.startDate= new Date((mm-1)+ '/' + (30-(dd-7)) + '/' + yyyy).getTime();

	    	}
	    }
	    else
	    {
	    	this.startDate= new Date(mm + '/' + (dd-7) + '/' + yyyy).getTime();
	    }
    }
    else if (this.ionsel == 'Month')
    {
    	//month

	    	if((mm-1)<=0)
	    	{
	    	
	    		this.startDate= new Date((12- (mm-1))+ '/' + (30-(dd-7)) + '/' + (yyyy-1)).getTime();

	    	}
	    	else
	    	{
	    		this.startDate= new Date((mm-1)+ '/' + dd + '/' + yyyy).getTime();

	    	}
    }
    
    //month
    console.log("Start Date");
    console.log(this.startDate);
    this.endDate=this.today;
    //startdate=enddate-7days
    //startat futuredatestamp/current and end at past date stamp
    this.firebaseref.orderByChild("date").startAt(this.startDate).endAt(this.endDate).on('value',whatever=>{
    	this.retrievedata=[];
    	whatever.forEach(okok=>{
    		this.retrievedata.push(okok.val());
    		let k=okok.val();
    	});
    	console.log("Inside sorting");
    	console.log(this.retrievedata);
    	console.log("Each iteration");
    	//console.log(new Date(this.retrievedata[0]["date"]).getTime());
    });


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Visualized3Page');
  }

}
