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

  get_A_User: Observable<any>;

  readonly rootUrl = 'https://youngmovapi.azurewebsites.net';

  readonly header =  new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('userToken')});
 
  constructor(private http: HttpClient) { }

  changeTitle(title: string) {
    this.titleSource.next(title);
  }

  userAuthentication(userName: string, password: string) : Observable<any>{
    let body = {"userName": userName, "password": password};
    let reqHeader = new HttpHeaders( {'Content-Type' : 'application/json'} );
    return this.http.post(this.rootUrl + '/api/Jwt', (body), {headers : reqHeader});
  }

  getUsers() {
    return this.http.get(this.rootUrl + '/api/Users', {headers : this.header});
  }

  //TODO
  /*getOneUser(value: string) {
    //it is necessary the same variable(exemple here username) in API
    let params = new HttpParams().set('userName', value);
    this.get_A_User = this.http.get(this.rootUrl + '/api/Users/', { headers : this.header, params});
    return this.get_A_User;
  }*/

  getCarpooling() {
    return this.http.get('');
  }

  getPictureValidation() {
    return this.http.get('https://jsonplaceholder.typicode.com/photos');
  }

  getTodos() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
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
      lastName: user.lastName,
      completed: user.completed
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post('http://localhost:5000'+'/api/Users/Register', body,{headers : reqHeader});
  }*/

  /*https://youngmovapi.azurewebsites.net/api/Jwt
  http://localhost:5000/api/Jwt
   userAuthentication(userName: string, password: string) : Observable<any>{
    //let body = "userName=" + userName + "&password=" + password;
    let body = {"userName": userName, "password": password};
   
    //let body : string = JSON.stringify({ userName, password });
    //let params = new HttpParams().set('params', body);
    //let reqHeader = new HttpHeaders().set('Content-type','application/json');

    //let params = new HttpParams().set('params', body);
    //x-www-form-urlencoded
    let reqHeader = new HttpHeaders( {'Content-Type' : 'application/json'} );
    // Body -> raw in Postman
    return this.http.post('https://youngmovapi.azurewebsites.net/api/Jwt', (body), {headers : reqHeader});
  }
  */
}
