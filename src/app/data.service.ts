import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './users/model';



@Injectable({
  providedIn: 'root'
})

export class DataService {

  private titleSource = new BehaviorSubject<string>("Dashboard");
  currentTitle = this.titleSource.asObservable();
 
  constructor(private http: HttpClient) { }

  changeTitle(title: string) {
    this.titleSource.next(title);
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getCarpooling() {
    return this.http.get('');
  }

  getPictureValidation() {
    return this.http.get('https://jsonplaceholder.typicode.com/photos');
  }
  

  readonly rootUrl = 'https://jsonplaceholder.typicode.com';

  get_A_User: Observable<any>;

  getOneUser(value: string) {
    //it is necessary the same variable(exemple here username) in API
    let params = new HttpParams().set('username', value);
    this.get_A_User = this.http.get(this.rootUrl + '/users', { params });
    return this.get_A_User;
  }

  /*userAuthentication(userName: string, password: string) {
    let params = new HttpParams().set('username', userName);
    this.get_A_User = this.http.get(this.rootUrl + '/users', { params }); 
  }*/

  /*registerUser(user: User) {
    const body: User = {
      id: user.id,
      phone: user.phone,
      name: user.name,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }*/

  /*userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  getUserClaims(){
    return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }*/


}
