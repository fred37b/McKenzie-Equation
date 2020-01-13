import { Component } from '@angular/core';
import {SoundPoint} from '../app/models/soundpoint.model';
import { MckenzieEquationService } from '../app/services/mckenzie-equation.service';

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

// https://stackoverflow.com/questions/41726168/see-input-range-value-as-it-changes-with-angular-2

  constructor(private mckenzieEquationService: MckenzieEquationService){
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

      celerityForZeroDepth = this.mckenzieEquationService.calculateCelerity(this.rangeTemperature,this.rangeSalinity,0);
      const posY = 0 * 256 / 8000; 
      const posX = (celerityForZeroDepth-1400) * 256 / 400; // 400 is the difference between the celerity min 1400 and the max 1800
      
      // we add 30 pixels for moving the graph to the right
      const soundPointForZeroDepth = new SoundPoint(this.rangeTemperature,this.rangeSalinity,0,celerityForZeroDepth,posX+30,posY);
      this.soundPoints.push(soundPointForZeroDepth);
    }else{
      console.log("depth is greater than 0");
    }

    this.pointExist = true;
    var celerity : number;
    celerity = this.mckenzieEquationService.calculateCelerity(this.rangeTemperature,this.rangeSalinity,this.rangeDepth);
    const posY = this.rangeDepth * 256 / 8000; 
    const posX = (celerity-1400) * 256 / 400; 
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
     this.soundPoints.splice(lenght,1);
  }
}
