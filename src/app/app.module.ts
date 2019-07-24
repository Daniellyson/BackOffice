import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopPageComponent } from './top-page/top-page.component';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { DataService } from './data.service';

import { FormsModule } from '@angular/forms';
import { ChangeInfoAdminComponent } from './change-info-admin/change-info-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component'; 


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopPageComponent,
    routingComponents,
    ChangeInfoAdminComponent,
    AddAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }