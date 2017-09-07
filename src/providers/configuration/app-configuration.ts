import { Injectable } from '@angular/core';
import {CustomHttpProvider  } from './custom-http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigurationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppConfigurationProvider {
  //Enviornment variables
  wordpressStagingUrl:string="http://revmax.twinspark.co";
  wordpressLiveUrl:string="http://revmax.twinspark.co";
  constructor(  public http: CustomHttpProvider, ) {
    
  }
  
  fetchMenuItems(){
    // var menuOptions = [];
       return this.http.get(this.wordpressStagingUrl+'/wp-json/wp-api-menus/v2/menus/2184')
                          .map((response) => response.json());
  }                    
}