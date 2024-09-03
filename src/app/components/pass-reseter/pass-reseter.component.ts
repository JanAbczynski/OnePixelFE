import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResetPassDialogComponent } from '../reset-pass-dialog/reset-pass-dialog.component';

@Component({
  selector: 'app-pass-reseter',
  templateUrl: './pass-reseter.component.html',
  styleUrls: ['./pass-reseter.component.css']
})
export class PassReseterComponent implements OnInit {

  public code: string | any;
  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.runDialog()
    console.log(this.code);
  }

  runDialog(){
    let dialogBox = this.dialog.open(ResetPassDialogComponent);
    dialogBox.componentInstance.code = this.code;
    dialogBox.afterClosed().subscribe(result =>{
  })
  }
}
