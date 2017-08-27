import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {API} from './../../api_config/api_config';

@Injectable()
export class Title {

  public value = 'Angular 2';

  constructor(
    public http: Http
  ) {}

  public registerData(email: any , password: any): any{
    // pre registration if not added
    let url = API.API_REGISTER;
    let body = 'username=' + email + '&password=' + password;
    let head = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(url, body, {headers: head})
      .map((res) => res.json());
  }

  public getData() {
    console.log('Title#getData(): Get Data');
    /**
     * return this.http.get('/assets/data.json')
     * .map(res => res.json());
     */
    return {
      value: 'AngularClass'
    };
  }

  public attemptLogin(email: any, password: any): any {
    let urlaccess = API.API_ACCESSTOKEN;
    let body2 = 'username=' + email + '&password=' + password + '&grant_type=password';

    let authdata = btoa('test' + ':' + 'secret');
    let head2 = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + authdata
    });

    return this.http.post(urlaccess, body2, {headers: head2})
      .map((res) => res.json());
  }
}
