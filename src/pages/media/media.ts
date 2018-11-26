import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  items: any;
  quotesList: any;
  selectedSegment: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpm: Http) {
    this.selectedSegment = 'music';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPage');
  }

  ionViewWillEnter() {
    this.fetchMedia()
    this.fetchQuotes()
  }

  fetchMedia() {
    let searchQuery = 'happy';
    this.httpm.get(
      'http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + searchQuery + '&api_key=40d539e1ec8e98ccce917bdfe054e5a7&format=json'
    ).subscribe(data => {
      console.log(data.json())
      this.items = data.json().results.albummatches.album
      console.log(this.items)
    });
  }

  fetchQuotes() {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers
    myHeaders.set('X-Mashape-Key', '0BbcWISiTJmshpeV8A9yMSbBxeOMp13mRjdjsnY5BGfKdh4UNM');
    myHeaders.append('Accept', 'application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.httpm.get(
      'https://andruxnet-random-famous-quotes.p.mashape.com/?count=20', opt
    ).subscribe(data => {
      console.log(data.json())
      this.quotesList = data.json();
      // this.q = data.json().results.albummatches.album
    });
  }

}