import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AvalibleDocument } from '../../../models/Documents/AvalibleDocument';
import { AvalibleDocumentDetails } from '../../../models/Documents/AvalibleDocumentDetails';
import { UserDocument } from '../../../models/Documents/UserDocument';
import { FullPermission } from '../../../models/FullPermission';
import { CommonServiceService } from '../../../services/common-service.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { UserDocumentDetail } from '../../../models/Documents/UserDocumentDetail';

const moment = _moment;

@Component({
  selector: 'app-permission',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(
    private commonService: CommonServiceService,
    private dialogRef: MatDialogRef<DocumentComponent>) { }

  userDocument: UserDocument = {
    Id: '', DetailsFriendly: '', DocumentNumber: ''
  };
  documents: AvalibleDocument[] = [];
  rawDocuments: AvalibleDocument[] = [];
  documentDetail: AvalibleDocumentDetails[] = [];

  permissionsDetail: any[] =[];
  userId: string = '';

  oldPermission: FullPermission  = {};
  newDocument: AvalibleDocument = {Id: '', Details: [], DetailsFriendly: '', DocumentName: ''};
  ExpireDate = Date.now();
  jsonModel: string = '';


  permissionForm = new FormControl();

  ngOnInit(): void {
    this.GetDocuments();
    // if(this.newPermission != {}){
    //   console.log(this.newPermission)
    // }else{
      
    //   console.log(this.newPermission)
    // }
  }


  GetDocuments(){
    this.commonService.GetDocuments()
    .subscribe({
      next: ((value: any) => {
        
        this.rawDocuments = this.MakeCopy(value);
        this.documents =  this.MakeCopy(value);

      }),
      error: ((value: any) => {

      })
    })
  }

  MakeCopy(documents: AvalibleDocument[]){
    let newDocuments: AvalibleDocument[] = [];
    let newDocument: AvalibleDocument;

    for(let i = 0; i < documents.length; i ++){
      newDocument = {...documents[i]}
      newDocuments.push(newDocument);
    }

    return newDocuments;
  }


  GetPermissions(){
    // this.commonService.GetPermissions()
    // .subscribe({
    //   next: ((value: any) => {
    //     this.permissions = value;

    //     if(this.oldPermission != undefined){
    //       this.UpdateOldPermission();
    //     }
    //   }),
    //   error: ((value: any) => {
    //     this.commonService.ShowError(value.error, "");
    //   })
    //   }
    // )
  }

  UpdateOldPermission(){
    // this.newPermission = {...this.oldPermission};
    // this.RewritePermissions();
  }

  RewritePermissions(){
      // this.newPermission.RawPermission = null;
      // this.newPermission.RawPermission = this.permissions.find(x => x.Id == this.oldPermission.RawPermission.Id);

      // if(this.oldPermission.RawPermission.HasEnumDetail){
      //   this.GetPermissionDetail(this.oldPermission.RawPermission.Id);
      // }

  }

  GetPermissionDetail(permissionId: any){
    // this.commonService.GetPermissionDetail(permissionId)
    // .subscribe({
    //   next: ((value: any) => {
    //     this.permissionsDetail = value;

    //     if(this.oldPermission != undefined){
    //       this.UpdateOldPermissionDetail();
    //     }
        
    //   }),
    //   error: ((value: any) => {
    //     this.commonService.ShowError(value.error, "");
    //   })
    //   }
    // )
  }

  UpdateOldPermissionDetail(){
    // this.newPermission.UserPermissionDetail = [];
    // for(let i = 0; i < this.oldPermission.UserPermissionDetail!.length; i++){
    //   let tempDetail = this.permissionsDetail.find(x => x.id == this.oldPermission.UserPermissionDetail![i].Id);
    //   this.newPermission.UserPermissionDetail.push(tempDetail);
    // }
  }

  detailSelect(){

    // this.documentDetail = this.newDocument.Details;
    this.newDocument.Details = [];
    this.userDocument.Details = [];

    for(let i = 0; i < this.rawDocuments.length; i ++){
      if(this.rawDocuments[i].Id == this.userDocument.Document!.Id){
        this.documentDetail = this.rawDocuments[i].Details;
      }
    }

    // if(this.oldPermission != undefined){
    //   this.oldPermission.UserPermissionDetail =  [];
    // }
    // this.GetPermissionDetail(this.newPermission.RawPermission.Id);
  }

  Close(){
    // this.dialogRef.close()
  }



  OnSubmitPermission(){
    
    // if(this.newPermission.UserPermissionDetail != undefined){
    //   for(let i = 0; i < this.newPermission.UserPermissionDetail.length; i++){
    //     this.newPermission.UserPermissionDetail[i].RawPermissionDetail = new RawPermissionDetail();

    //     for(let j = 0; j < this.permissionsDetail.length; j ++){
    //       if(this.permissionsDetail[j].Id == this.newPermission.UserPermissionDetail[i].Id){
    //         this.newPermission.UserPermissionDetail[i].RawPermissionDetail = this.permissionsDetail[j];
    //       }
    //     }
    //   }
    // }

    //     console.log(this.newPermission)

    // let x = JSON.stringify(this.newPermission);
    // this.dialogRef.close(this.newPermission)

  }


  OnSubmitDocument(){
    
    this.userDocument.Details = [];

    for(let i = 0; i < this.userDocument.Document!.Details.length; i++){

      let newDetail: UserDocumentDetail = {Id: '', DocumentDetail : this.userDocument.Document!.Details[i]};
      this.userDocument.Details.push(newDetail)

    }

    this.dialogRef.close(this.userDocument);
  }
}
