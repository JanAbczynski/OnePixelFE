import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/Field';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-color-dialog',
  templateUrl: './select-color-dialog.component.html',
  styleUrls: ['./select-color-dialog.component.css']
})
export class SelectColorDialogComponent implements OnInit {

  field: Field = {};
  listOfColor: string[] = [];
  rows: number = 0;
  fieldsInRow: number = 4;
  oldColor: string = '';
  newColor: string = '';
  constructor(private dialogRef: MatDialogRef<SelectColorDialogComponent>) { }

  ngOnInit(): void {
    this.newColor = this.field.Color!;
    this.calculateRowNumbers(this.fieldsInRow)
  }

  calculateRowNumbers(inRow: number){
    let elements = this.listOfColor.length;
    this.rows =Math.floor(this.listOfColor.length / inRow)
    if(elements % inRow != 0){
      this.rows ++;
    }
  }

  selectColor(color: string){
    this.newColor = color;
  }
  
  sendColor(){
    this.dialogRef.close({selected: true, color: this.newColor}) 
  }
}
