import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from '../../services/signalr.service';
import * as signalR from '@aspnet/signalr'
import { PixelScreenService } from '../../services/pixel-screen.service';
import { Field } from '../../models/Field';

@Component({
  selector: 'app-signal-test',
  templateUrl: './signal-test.component.html',
  styleUrls: ['./signal-test.component.css']
})
export class SignalTestComponent implements OnInit, OnDestroy {


  public message: string ='';
  public messages:string[]=[];
  public mess: string = '';
  field: Field = { Id:'d7dd2a49-6809-40b0-bee1-5a0bc704c60a', Color:'#008000', CoordinateX: 1, CoordinateY:2}

  constructor(
    public signalrServie: SignalrService,
    public pixelScreenService: PixelScreenService
  ) { 
    this.signalrServie.currentMessage.subscribe((mess) => {
      this.mess = mess;
    });
  }

  hubConnection!:signalR.HubConnection


  ngOnInit(): void {

    this.signalrServie.startConnection();
    setTimeout(()=>{
      this.signalrServie.askServerListener();
    }, 2000)
  }

  change(mess: string){
    this.signalrServie.updateFields(mess);
    this.signalrServie.changeMessage(mess);
  }

  asyncTest(){
    this.pixelScreenService.AsyncTest(this.field)
     .subscribe({
      next: ((response: any) => {
      }),
      error: ((value: Object) => {
        })
      }
    )
  }
  

 echo(){
  this.signalrServie.invoke(this.message);
 }

  ngOnDestroy(): void {
     this.signalrServie.hubConnection.off("askServerResponse");

  }

}
