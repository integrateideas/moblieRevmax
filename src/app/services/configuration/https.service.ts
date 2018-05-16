import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};

@Injectable()
export class HttpsService {
  url = 'https://revmax.twinspark.co/wp-json/wc/';
  creds = 'consumer_key=ck_5ecf43a297b5341dfb68c4ba5f7e83db56125b19&consumer_secret=cs_6387cb6a55c87e8cd6223fbca39a92324dbfd013';
  slug = '?';

  constructor(private http: HttpClient) { }

  post(url, body, headers?: HttpHeaders) {
    headers = this.appendHeaders(headers);
    return this.http.post(url, body, { headers });
  }

  put(url, body, headers?: HttpHeaders) {
    headers = this.appendHeaders(headers);
    return this.http.put(url, body, { headers });
  }

  get(url, headers?: HttpHeaders) {
    headers = this.appendHeaders(headers);
    return this.http.get(url, { headers });
  }
  delete(url, headers?: HttpHeaders) {
    headers = this.appendHeaders(headers);
    return this.http.delete(url, { headers });
  }


  appendHeaders(params) {
    // if (typeof params === 'undefined' || params == null) {
    //   params = null
    // }
    const head = new HttpHeaders();
    const headers = head.set('Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTUyNjYxMDY3MX0.Bl544Evak7CcLgOl1hzd9LrDlFuOCtteWyrHytftPjI');
    // requestOptions.headers.append('Content-Type','application/json');
    // requestOptions.headers.append('Accept','application/json');
    return headers;
  }
}
