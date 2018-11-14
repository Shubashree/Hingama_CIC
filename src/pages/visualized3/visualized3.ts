import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as d3Time from 'd3-time-format';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
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
   public startdatestring:any;
   public endDate:any;
   public enddatestring:any;
   public finaldata:Array<any> = [];
   public today: any;
   public ionsel:any;

   margin = {top: 20, right: 20, bottom: 20, left: 20};
   width: number;
   height: number;
   x: any;
   y:any;
   valueline: any;
   svg:any;
   xaxis: any;
   yaxis: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private firebased: AngularFireDatabase, private fire: AngularFireAuth) {

    this.width = 300 - this.margin.left - this.margin.right,
    this.height = 300 - this.margin.top - this.margin.bottom;


    this.currentuser = this.fire.auth.currentUser.uid;
    console.log("Current user:");
    console.log(this.currentuser);
    this.firebaseref = firebase.database().ref('/' + this.currentuser + '/moodlog');
  }

  changesegment(event){
  	console.log(event.value);
  	this.ionsel=event.value;
    d3.select("svg").remove();
    this.initsvg();
  	var today=new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    this.enddatestring = mm + '/' + dd + '/' + yyyy;
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
	    	  this.startdatestring=(12- (mm-1))+ '/' + (30-(dd-7)) + '/' + (yyyy-1);
	    		this.startDate= new Date((12- (mm-1))+ '/' + (30-(dd-7)) + '/' + (yyyy-1)).getTime();

	    	}
	    	else
	    	{
          this.startdatestring=(mm-1)+ '/' + (30-(dd-7)) + '/' + yyyy;
	    		this.startDate= new Date((mm-1)+ '/' + (30-(dd-7)) + '/' + yyyy).getTime();

	    	}
	    }
	    else
	    {
        this.startdatestring=mm + '/' + (dd-7) + '/' + yyyy;
	    	this.startDate= new Date(mm + '/' + (dd-7) + '/' + yyyy).getTime();
	    }
    }
    else if (this.ionsel == 'Month')
    {
    	//month

	    	if((mm-1)<=0)
	    	{
	    	  this.startdatestring=(12- (mm-1))+ '/' + (30-(dd-7)) + '/' + (yyyy-1);
	    		this.startDate= new Date((12- (mm-1))+ '/' + (30-(dd-7)) + '/' + (yyyy-1)).getTime();

	    	}
	    	else
	    	{
          this.startdatestring=(mm-1)+ '/' + dd + '/' + yyyy;
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
      console.log("Before formatting");
      console.log(this.retrievedata);
      this.retrievedata.forEach( d => {
      d.date = d.date;
      d.emotion = +d.emotion;
      });
      console.log("After formatting");
      console.log(this.retrievedata);

      this.x = d3Scale.scaleTime().domain([this.startDate, this.endDate]).range([0, this.width]);
      this.y = d3Scale.scaleLinear().range([this.height, 0]);

      this.valueline = d3Shape.line()
        .x( d => { 
          console.log("insidevalueline xaxis");
          console.log(d.date);
          return this.x(d.date);})
        .y( d => { 
          console.log("insidevalueline yaxis");
          console.log(d.emotion);
          return this.y(d.emotion);})

      this.x.domain(d3Array.extent(this.retrievedata, d => {
        return d.date;
      }));
      this.y.domain([1, 1+d3Array.max(this.retrievedata, d => {
        return d.emotion;
      })]);

      this.xaxis = this.svg.append("g")
                       .attr("transform", "translate(0," + this.height + ")")
                       .attr("class","x axis").call(d3Axis.axisBottom(this.x).tickFormat(d3Time.timeFormat("%a %d")).ticks(7));
      this.yaxis = this.svg.append("g")
                       .attr("class","y axis")
                       .call(d3Axis.axisLeft(this.y).ticks(5));

      this.svg.append("path")
      .attr("class","line")
      .attr("fill","none").attr("stroke","blue").attr("stroke-width","1")
      .attr("d", this.valueline(this.retrievedata));

    });


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Visualized3Page');
    this.initsvg();
  }

  initsvg()
  {
    this.svg = d3.select("#plot")
    .append("svg")
        .style("width", this.width + this.margin.left + this.margin.right + "px")
        .style("height", this.height + this.margin.top + this.margin.bottom + "px")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform","translate(" + this.margin.left + "," + this.margin.top + ")")
        .attr("class", "svg");

  }

}
