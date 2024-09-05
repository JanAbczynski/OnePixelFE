import { Injectable } from '@angular/core';
import { Field } from '../models/Field';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PixelScreenService {



  constructor(
    private http: HttpClient,
    private loginService: LoginService) { }


    url = environment.apiUrl + "/Screen";

    AsyncTest(field: Field) {
      return this.http.post<any>(this.url + "/UpdateOneFieldWithSignal", field, this.loginService.SetOpts());
    }

    public InitScreen(screen: Field[][]){
      return this.http.post<any>(this.url + "/InitScreen", screen, this.loginService.SetOpts());
    }

    public GetScreen(){
    return this.http.post<any>(this.url + "/GetScreen", null, this.loginService.SetOpts());
  }

    updateOneField(field: Field) {
      return this.http.post<any>(this.url + "/UpdateOneFieldWithSignal", field, this.loginService.SetOpts());
    }
    getColors(listOfColorTemp: string[]) {
      return this.http.post<any>(this.url + "/GetColors", listOfColorTemp, this.loginService.SetOpts());
    }

  
}
