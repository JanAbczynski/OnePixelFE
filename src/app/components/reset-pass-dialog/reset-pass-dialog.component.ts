import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CommonServiceService as CommonService } from '../../services/common-service.service';
import { RegisterLoginService } from '../../services/register-login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-reset-pass-dialog',
  templateUrl: './reset-pass-dialog.component.html',
  styleUrls: ['./reset-pass-dialog.component.css']
})
export class ResetPassDialogComponent implements OnInit {

  errorLoginMessage : any = null;
  code: string = '';
  userModel = new User();
  constructor(
    private registerLoginService : RegisterLoginService,
    private dialogRef: MatDialogRef<ResetPassDialogComponent>,
    private notifierService: NotifierService,
    private commonService: CommonService) { }

  ngOnInit(): void {
  }

  OnSubmitRestet(){
    this.passResetStep2(this.userModel, this.code);
  }

  passResetStep2(userModel: User, code: string){
    this.commonService.PushStatus(true);
    this.registerLoginService.PassResetStep2(userModel, code)
    .subscribe({
      next: ((response: any) => {
        this.dialogRef.close();     
        console.log(response);
        this.notifierService.showNotification("Zostałeś zalogowany", "X");
        this.commonService.PushStatus(false);

      }),
      error: ((value: Object) => {
        this.errorLoginMessage = JSON.parse(JSON.stringify(value)).error
        this.notifierService.showNotification(this.errorLoginMessage.Message, 'X');
        this.commonService.PushStatus(false);
        })
      }
    )
  }
}
