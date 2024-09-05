import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Field } from '../../models/Field';
import { PixelScreenService } from '../../services/pixel-screen.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectColorDialogComponent } from '../select-color-dialog/select-color-dialog.component';
import { LoginService } from '../../services/login.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignalrService } from '../../services/signalr.service';



@Component({
  selector: 'app-pixel-screen',
  templateUrl: './pixel-screen.component.html',
  styleUrls: ['./pixel-screen.component.css']
})
export class PixelScreenComponent implements OnInit {

  @Output() fieldData = new EventEmitter<Field>();
  rowData: Field[] = [];  
  tableData: Field[][] = [];  
  public mess: any ;

  listOfColorTemp: string[] = ['#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0', '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff']
  
  listOfColor: string[] = []
  
  constructor(
    public signalrServie: SignalrService,
    public dialog: MatDialog, 
    private pixelScreenService: PixelScreenService,
    private loginService: LoginService
  ) {
    this.signalrServie.currentMessage.subscribe((mess) => {
      this.mess = mess;
      if(this.mess){
        this.tableData[this.mess.coordinateY!][this.mess.coordinateX!].Color = this.mess.color;
      }
      console.log('works')
      console.log(this.mess)
    });
   }

  ngOnInit(): void {
    this.getScreen();
    this.getColors();
    this.signalrServie.startConnection();
    setTimeout(()=>{
      this.signalrServie.askServerListener();
    }, 2000)

    //this.createTable(10,10);
   // this.HandleTable();
  }

  getScreen(){
    this.pixelScreenService.GetScreen()
    .subscribe({
      next: ((response: any) => {      
        this.tableData = this.handleData(response.Data.fieldVM, response.Data.MaxX, response.Data.MaxY);
      }),
      error: ((value: Object) => {

        })
      }
    )
  }

  handleData(fields: Field[], maxX: number, maxy: number){
      let tempTable = [];
    for(let y = 0; y <= maxy; y++){
      let sortedRow = fields.filter(x => x.CoordinateY === y);
      sortedRow.sort((a, b) => a.CoordinateX! < b.CoordinateX! ? -1 : a.CoordinateX! > b.CoordinateX! ? 1 : 0)
      tempTable.push(sortedRow);
    }
      return tempTable;
  }

  over(field: Field){
    //console.log(field.CoordinateX, field.CoordinateY)
  }

  emit(field: Field){
    this.fieldData.emit(field);
  }

  reload(){    
    this.pixelScreenService.GetScreen()
    .subscribe({
      next: ((response: any) => {

        this.tableData = this.handleData(response.Data.fieldVM, response.Data.MaxX, response.Data.MaxY);
      }),
      error: ((value: Object) => {
        })
      }
    )
  }



  generate(){
    this.tableData = []
    this.createTable(30, 30);
    this.pixelScreenService.InitScreen(this.tableData)
    .subscribe({
      next: ((response: any) => {
        this.reload();
      }),
      error: ((value: Object) => {

        })
      }
    )

  }

  createTable(x: number, y:number){

    for(let cy = 0; cy < y; cy++){
      let row = [];
      for(let cx = 0; cx < x; cx++){
        let colorIndex = Math.floor((Math.random() * this.listOfColor.length) );
        //let color = this.listOfColor[colorIndex];
        let color = '#000000';
        row.push({Id: null, CoordinateX:cx, CoordinateY:cy, Color:color});
      }
      this.tableData.push(row);
    }
  }

  HandleTable(){

  }

  select(item: Field){  
    let isLogged = this.loginService.isLogged();
 
    if(isLogged){
      this.SelectColorDialog(item);
    }else{
      let dialogBox = this.dialog.open(LoginDialogComponent);
      dialogBox.afterClosed().subscribe(result =>{
      })
    }
    
  }

  SelectColorDialog(item: Field){
    let dialogBox = this.dialog.open(SelectColorDialogComponent);
    dialogBox.componentInstance.field = item;
    dialogBox.componentInstance.listOfColor = this.listOfColor;
    dialogBox.afterClosed().subscribe(result =>{
      if(result){
          console.log(result)
          this.tableData[item.CoordinateY!][item.CoordinateX!].Color = result.color;
          this.pixelScreenService.updateOneField(this.tableData[item.CoordinateY!][item.CoordinateX!])
          .subscribe({
            next: ((response: any) => {
              this.reload();
            }),
            error: ((value: Object) => {
      
              })
            }
          )
      }
    })
    }

    getColors(){

      this.pixelScreenService.getColors(this.listOfColorTemp)
      .subscribe({
        next: ((response: any) => {
          this.listOfColor = response.Data;
        }),
        error: ((value: Object) => {
  
          })
        }
      )
    }

    change(mess: string){
      this.signalrServie.updateFields(mess);
    }
}
