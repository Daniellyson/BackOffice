import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './users/userModel';



@Injectable({
  providedIn: 'root'
})

export class DataService {

  private titleSource = new BehaviorSubject<string>("Dashboard");
  currentTitle = this.titleSource.asObservable();

  private adminName = new BehaviorSubject<string>("Admin");
  currentAdmin = this.adminName.asObservable();

  private showMainPageEmitter = new BehaviorSubject<boolean>(false);
  showPage = this.showMainPageEmitter.asObservable();

  readonly rootUrl = 'https://youngmovapi.azurewebsites.net';
  
  header =  new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem('userToken')});
 
  constructor(private http: HttpClient) { }

  setEventEmit(logged: boolean) {
    this.showMainPageEmitter.next(logged);
  }

  changeTitle(title: string) {
    this.titleSource.next(title);
  }

  changeAdmin(name: string) {
    this.adminName.next(name);
  }

  userAuthentication(userName: string, password: string) : Observable<any> {
    let body = {"userName": userName, "password": password, "role" : "backoffice"};
    let reqHeader = new HttpHeaders( {'Content-Type' : 'application/json'} );
    return this.http.post(this.rootUrl + '/api/Jwt', (body), {headers : reqHeader});
  }

  getUsers() {
    return this.http.get(this.rootUrl + '/api/Users', {headers : this.header});
  }

  //TODO
  getOneUser(value: number) : Observable<any> {
    //it is necessary the same variable(exemple here userName) in API
    //let params = new HttpParams().set('id','2');
    return this.http.get<User[]>(this.rootUrl + '/api/Users/' + value, {headers : this.header});
  }

  getUserById(id: number) {
    return this.http.get(this.rootUrl + '/api/Users/' + id, {headers : this.header});
  }

  getUserByUserName(userName: string) {
    return this.http.get(this.rootUrl + '/api/Users/' + userName, {headers : this.header});
  }

  updateUser(id: number, user: User) : Observable<any> {
    alert(id + " " + user);
    return this.http.put(this.rootUrl + '/api/Users/' + id, (user), {headers : this.header});
  }

  deleteUser(id: number) {
    return this.http.delete(this.rootUrl + '/api/Users/' + id, {headers : this.header});
  }

  getCarpooling() {
    return this.http.get(this.rootUrl + '/api/Carpoolings', {headers : this.header});
  }

  getPictureValidation() {
    return this.http.get('https://jsonplaceholder.typicode.com/photos');
  }
}