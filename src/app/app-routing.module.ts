import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';
import { UsersComponent } from './users/users.component';
import { CarpoolingComponent } from './carpooling/carpooling.component';
import { ApiStatComponent } from './api-stat/api-stat.component';
import { ValidationComponent } from './validation/validation.component';
import { LoginComponent } from './login/login.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';


const routes: Routes = [
  {
    path: '',  
    component: LoginComponent
  },
  {
    path: 'mainWindow',
    component: MainWindowComponent,
    children: [
      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full'   
      },
      {
        path: 'dashboard',
        component: MainContainerComponent
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'carpooling',
        component: CarpoolingComponent
      },
      {
        path: 'api-stat',
        component: ApiStatComponent
      },
      {
        path: 'validation',
        component: ValidationComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}

export const routingComponents = [
  MainContainerComponent, 
  UsersComponent, 
  CarpoolingComponent, 
  ApiStatComponent,
  ValidationComponent,
  LoginComponent,
  MainWindowComponent,
  ModifyUserComponent
];