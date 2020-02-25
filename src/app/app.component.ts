import { Component } from '@angular/core';
import {SoundPoint} from '../app/models/soundpoint.model';
import { MckenzieEquationService } from '../app/services/mckenzie-equation.service';
import {ExcelService} from './services/excel.service';
import * as svg from 'save-svg-as-png';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'McKenzie-Equation';
  
  soundPoints: SoundPoint[] = [];

  rangeTemperature : number;
  rangeSalinity : number;
  rangeDepth : number;
  pointExist : boolean;

  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }];


// https://stackoverflow.com/questions/41726168/see-input-range-value-as-it-changes-with-angular-2

  constructor(private mckenzieEquationService: MckenzieEquationService, private excelService: ExcelService){
    this.pointExist = false;
    this.rangeTemperature = 3;
    this.rangeSalinity = 35;
    this.rangeDepth = 0 ;
  }

  onSendMessage(){
    console.log("onSendMessage");
  }

  /**
   * 
   */
  addAPoint(){
    //console.log("Add a point "+this.rangeTemperature+" "+this.rangeSalinity+" "+this.rangeDepth);
    if((this.rangeDepth != 0)&&(this.soundPoints.length ==0)){
      console.log("depth is 0");
      var celerityForZeroDepth : number;
      celerityForZeroDepth = Math.trunc(this.mckenzieEquationService.calculateCelerity(this.rangeTemperature,this.rangeSalinity,0));
      const posY = Math.trunc(0 * 256 / 8000); 
      const posX = Math.trunc((celerityForZeroDepth-1400) * 256 / 400); // 400 is the difference between the celerity min 1400 and the max 1800
      // we add 30 pixels for moving the graph to the right
      const soundPointForZeroDepth = new SoundPoint(this.rangeTemperature,this.rangeSalinity,0,celerityForZeroDepth,posX+30,posY);
      this.soundPoints.push(soundPointForZeroDepth);
    }else{
      console.log("depth is greater than 0");
    }


    this.pointExist = true;
    var celerity : number;
    celerity = Math.trunc(this.mckenzieEquationService.calculateCelerity(this.rangeTemperature,this.rangeSalinity,this.rangeDepth));
    const posY = Math.trunc(this.rangeDepth * 256 / 8000); 
    const posX = Math.trunc((celerity-1400) * 256 / 400); 
    // we add 30 pixels for moving the graph to the right
    const soundPoint = new SoundPoint(this.rangeTemperature,this.rangeSalinity,this.rangeDepth,celerity,posX+30,posY);
    this.soundPoints.push(soundPoint);

    console.log(this.soundPoints);
  }

  /**
   * 
   */
  resetListOfPoints(){
    this.pointExist = false;
    this.soundPoints = [];
  }

  export(){
    console.log("export as sheet https://medium.com/@madhavmahesh/exporting-an-excel-file-in-angular-927756ac9857");
    this.excelService.exportAsExcelFile(this.soundPoints, 'sample');
  }

  /**
   * 
   */
  saveGraph(){

//https://stackoverflow.com/questions/54588193/how-to-use-save-svg-as-png-with-angular-6
    
    svg.saveSvgAsPng(document.getElementById("lines"), "diagram.png", {scale: 2.0});

    svg.saveSvgAsPng(document.getElementById('lines'), "diagram.png", {scale: 0.5}, (uri) => {
      console.log('png base 64 encoded', uri);
    });
  }

  /**
   * 
   */
  deleteLastPoint(){
    console.log("deleteLastPoint");
    this.soundPoints.pop();

    if(this.soundPoints.length == 0){
      this.pointExist = false;
    }
    console.log(this.soundPoints);
  }

  /**
   * 
   */
  deleteThisPoint(soundPoint : SoundPoint){
    const lenght = this.soundPoints.length;
    
    const index = this.soundPoints.indexOf(soundPoint, 0);
    if (index > -1) {
      this.soundPoints.splice(index, 1);
    }

     //this.soundPoints.splice(lenght,1);
  }
}
