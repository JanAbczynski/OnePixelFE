import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { CustomResponse } from '../models/CustomResponse';
import { Gender } from '../models/Gender';
import { User } from '../models/user';
import { LoginService } from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {
  
  url = environment.apiUrl + "/User";
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  public Register (user: User){
    return this.http.post<User>(this.url + "/RegisterNewUser", user);
  }

  public Login (user: User){
    return this.http.post<User>(this.url + "/Login", user);
  }

  public ChangePersonalData(user: User){
    return this.http.post<User>(this.url + "/ChangePersonalData", user, this.loginService.SetOpts());
  }

  PassReset(user: User) {
    return this.http.post<User>(this.url + "/PassReset", user, this.loginService.SetOpts());
  }

  PassResetStep2(user: User, code: string) {
    return this.http.post<User>(this.url + "/PassResetStep2", {user, code});
  }

  ChangeAddressData(user: User) {
    return this.http.post<User>(this.url + "/ChangeAddressData", user, this.loginService.SetOpts());
  }

  ChangePassword(user: User) {
    return this.http.post(this.url + "/ChangePassword", user, this.loginService.SetOpts());
  }

  ChangePermissionsData(user: any) {
    return this.http.post(this.url + "/ChangePermissionsData", user, this.loginService.SetOpts());
  }

  ChangeEmail(user: User) {
    return this.http.post<CustomResponse>(this.url + "/ChangeEmail", user, this.loginService.SetOpts());
  }

  GetAllowMenu(token: string) {

    let data : Object = {Token : token};
    return this.http.post<User>(this.url + "/GetAllowMenu", data, this.loginService.SetOpts());
  }

  GetAllowMenu2() {
    return this.http.post<User>(this.url + "/GetAllowMenu2", {} ,this.loginService.SetOpts());
  }


  GetUserData() {
    return this.http.get<User>(this.url + "/GetUserData", this.loginService.SetOpts());
  }

  GetGender() {
    return this.http.get<Gender[]>(this.url + "/GetGender", this.loginService.SetOpts());
  }

  


}
