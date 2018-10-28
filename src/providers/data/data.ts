import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';



/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
	data: any;

  constructor(public http: HttpClient, public httpm: Http) {
    console.log('Hello DataProvider Provider');
  }

  fetchdata()
  {
  	if(this.data)
  	{
  		return Promise.resolve(this.data);
  	}

  	return new Promise(resolve => {

  		this.httpm.get('assets/data/questions.json').subscribe(data => {
  			this.data = data.json().happinesssurvey;
  			resolve(this.data);
        });
    });
  }
  }

  


