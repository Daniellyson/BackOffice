import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopPageComponent } from './top-page/top-page.component';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { DataService } from './data.service';
import { AuthInterceptorService } from './auth-interceptor.service';

import { FormsModule } from '@angular/forms';
import { ChangeInfoAdminComponent } from './change-info-admin/change-info-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { OnlineStatusComponent } from './online-status/online-status.component'; 




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopPageComponent,
    routingComponents,
    ChangeInfoAdminComponent,
    AddAdminComponent,
    OnlineStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [DataService, AuthInterceptorService],
  bootstrap: [AppComponent]
})

export class AppModule { }