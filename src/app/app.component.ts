import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    title = 'smart-city-project';
    
    onlineEvent: Observable<Event>;
    offlineEvent: Observable<Event>;
    subscriptions: Subscription[] = [];
  
    connectionStatusMessage: string;
    connectionStatus: string;
  
    constructor() { }
  
    ngOnInit(): void {
   
      this.onlineEvent = fromEvent(window, 'online');
      this.offlineEvent = fromEvent(window, 'offline');
  
      this.subscriptions.push(this.onlineEvent.subscribe(e => {
        this.connectionStatusMessage = 'Back to online';
        this.connectionStatus = 'online';
        console.log('Online...');
      }));
  
      this.subscriptions.push(this.offlineEvent.subscribe(e => {
        this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
        this.connectionStatus = 'offline';
        console.log('Offline...');
      }));
    }
  
    ngOnDestroy(): void {
     
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    reload() {
      console.log("In app component reload");
      location.reload();
    }
  }

