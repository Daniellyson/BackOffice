import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './users/userModel';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

const pageSize: number = 5;

const token: string = localStorage.getItem('userToken');

@Injectable({
  providedIn: 'root'
})

export class DataService {

  appComponenet: AppComponent = new AppComponent();

  private titleSource = new BehaviorSubject<string>("Dashboard");
  currentTitle = this.titleSource.asObservable();

  private adminName = new BehaviorSubject<string>("Admin");
  currentAdmin = this.adminName.asObservable();

  private showMainPageEmitter = new BehaviorSubject<boolean>(false);
  showPage = this.showMainPageEmitter.asObservable();

  readonly rootUrl = 'https://youngmovapi.azurewebsites.net';
  
  header =  new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : 'Bearer ' + token});
 
  constructor(private http: HttpClient, private router: Router) { }

  setEventEmit(logged: boolean) {
    this.showMainPageEmitter.next(logged);
  }

  changeTitle(title: string) {
    this.titleSource.next(title);
  }

  changeAdmin(name: string) {
    this.adminName.next(name);
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('logged');
    localStorage.removeItem('administrator');
    localStorage.removeItem('myPassword');
    localStorage.removeItem('firstTime');
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }

  userAuthentication(userName: string, password: string) : Observable<User> {
    let body = {"userName": userName, "password": password, "role" : "backoffice"};
    let reqHeader = new HttpHeaders( {'Content-Type' : 'application/json'} );
    return this.http.post<User>(this.rootUrl + '/api/Jwt/Login', (body), {headers : reqHeader});
  }

  getNbUsers() {
    return this.http.get(`${this.rootUrl}/api/NbUsers`, {headers : this.header});
  }

  getNbUsersGender(gender: string) {
    return this.http.get(`${this.rootUrl}/api/NbUsers?gender=${gender}`, {headers : this.header});
  }

  getUsers() {
    return this.http.get(this.rootUrl + '/api/Users', {headers : this.header});
  }

  getUsersPagination(pageIndex: number) {
    return this.http.get(`${this.rootUrl}/api/Users?pageIndex=${pageIndex}&pageSize=${pageSize}`, {headers : this.header});
  }

  getUserById(id: string) : Observable<User> {
    return (this.http.get<User>(this.rootUrl + '/api/Users/' + id, {headers : this.header}));
  }

  updateUser(id: string, user: Object) : Observable<User> {
    return this.http.put<User>(this.rootUrl + '/api/Users/' + id, (user), {headers : this.header});
  }

  deleteUser(id: number) {
    return this.http.delete(this.rootUrl + '/api/Users/' + id, {headers : this.header});
  }

  getCarpooling() {
    return this.http.get(this.rootUrl + '/api/Carpoolings', {headers : this.header});
  }

  getCarpoolingPagination(pageIndex: number) {
    return this.http.get(`${this.rootUrl}/api/Carpoolings?pageIndex=${pageIndex}&pageSize=${pageSize}`, {headers : this.header});
  }

  getCar() {
    return this.http.get(this.rootUrl + '/api/Cars', {headers : this.header});
  }

  getCarById(id: number) {
    return this.http.get(this.rootUrl + '/api/Cars/' + id, {headers : this.header});
  }

  getCarPagination(pageIndex: number) {
    return this.http.get(`${this.rootUrl}/api/Cars?pageIndex=${pageIndex}&pageSize=${pageSize}`, {headers : this.header});
  }
  
  updateCar(carId: number, isValid: boolean) {
    return this.http.put(this.rootUrl + '/api/ValidCars/' + carId, {isValid}, {headers : this.header});
  }

  deleteCar(id: number) {
    return this.http.delete(this.rootUrl + '/api/Cars/' + id, {headers : this.header});
  }

  updateUserFacePhoto(id: string, isValid: boolean) {
    return this.http.put(this.rootUrl + '/api/Images/ValidFacePhoto/' + id, {isValid}, {headers : this.header});
  }

  updateUserIdCardPhoto(id: string, isValid: boolean) {
    return this.http.put(this.rootUrl + '/api/Images/ValideIdentityPiecePhoto/' + id, {isValid}, {headers : this.header});
  }

  addNewAdm(body: Object) : Observable<User> {    
    return this.http.post<User>(this.rootUrl + '/api/Users', (body), {headers : this.header});
  }

  updatePassword(id: string, actualPassword: string, newPassword: string) {
    let body = {"id": id, "actualPassword": actualPassword, "newPassword" : newPassword};
    return this.http.put(this.rootUrl + '/api/Password/' + id, (body), {headers : this.header});
  }
}