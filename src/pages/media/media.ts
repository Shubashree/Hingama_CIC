import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpm: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPage');
  }

  ionViewWillEnter() {
    this.fetchMedia()
  }

  fetchMedia() {
    let searchQuery = 'happy';
    this.httpm.get(
      'http://ws.audioscrobbler.com/2.0/?method=album.search&album='+searchQuery+'&api_key=40d539e1ec8e98ccce917bdfe054e5a7&format=json'
    ).subscribe(data => {
      console.log(data.json())
      this.items = data.json().results.albummatches.album
    });
  }

}