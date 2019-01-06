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

  getUserById(id: number) : Observable<any>{
    return this.http.get(this.rootUrl + '/api/Users/' + id, {headers : this.header});
  }

  /*
    getItems(): Observable<Item[]> 
  {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        map(items => {
          let castedItems: Item[] = [];

          for(let rawItem of items)
            castedItems.push(ItemMapper.mapToItem(rawItem));

          return castedItems;
        }),
        catchError(this.errorService.handleError('l'obtention des objets', null, []))
      );
      */
  /*TODO delete
  getUserByUserName(userName: string) {
    return this.http.get(this.rootUrl + '/api/Users/' + userName, {headers : this.header});
  }*/

  updateUser(id: number, user: Object) : Observable<any> {
    return this.http.put(this.rootUrl + '/api/Users/' + id, (user), {headers : this.header});
  }

  deleteUser(id: number) {
    return this.http.delete(this.rootUrl + '/api/Users/' + id, {headers : this.header});
  }

  getCarpooling() {
    return this.http.get(this.rootUrl + '/api/Carpoolings', {headers : this.header});
  }

  getCar() {
    return this.http.get(this.rootUrl + '/api/Cars', {headers : this.header});
  }
}