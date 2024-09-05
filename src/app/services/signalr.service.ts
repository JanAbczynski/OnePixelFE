import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private messageSource = new BehaviorSubject('Default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  hubConnection!:signalR.HubConnection

  changeMessage(message: string){
    this.messageSource.next(message);
  }

  invoke(message: string) {
    this.hubConnection.invoke("Send", message);
  }

  // askServerListener() {
  //   this.hubConnection.on("askServerResponse", (someText) =>{
  //     console.log(someText);
  //   })
  // }

  askServer() {
    this.hubConnection.invoke("askServer", "hey")
    .catch(err => console.error(err));
  }

  askServerListener(){
    this.hubConnection.on("Send", (msg) =>{   
    this.messageSource.next(msg);
    console.log('msg');
    console.log(msg);
    });
  }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:44362/toastr', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection.start()
    .then(() => {console.log("Connection startef")})
    .catch(err => {
      console.log('err')
      console.log(err)
    });
  }   
}
