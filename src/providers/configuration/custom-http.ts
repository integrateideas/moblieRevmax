import { Injectable } from '@angular/core';
import { Http, Headers, ResponseOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the CustomHttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CustomHttpProvider {

  constructor(public http: Http) {
    
  }

  post(url, body, requestOptions?:ResponseOptionsArgs){
    
    requestOptions = this.appendHeaders(requestOptions);
    return this.http.post(url, body, requestOptions);
  }

  put(url, body, requestOptions?:ResponseOptionsArgs){
    requestOptions = this.appendHeaders(requestOptions);
    return this.http.put(url, body, requestOptions);
  }

  get(url, requestOptions?:ResponseOptionsArgs){
    requestOptions = this.appendHeaders(requestOptions);
    return this.http.get(url, requestOptions);
  }

  appendHeaders(requestOptions?:ResponseOptionsArgs){

    if(typeof requestOptions == 'undefined' || requestOptions == null){
      requestOptions = {}
    }

    if(typeof requestOptions.headers == 'undefined' || requestOptions.headers == null){
      requestOptions.headers = new Headers();
    }

    requestOptions.headers.append('Content-Type','application/json');
    requestOptions.headers.append('Accept','application/json');
    return requestOptions;
  
  }

}