import { Injectable } from '@angular/core';

@Injectable()
export class MckenzieEquationService {

  a1: number = 1448.96;
  a2: number = 4.591;
  a3: number = 5.304;
  a4: number = 2.374;
  a5: number = 1.34;
  a6: number = 1.63;
  a7: number = 1.675;
  a8: number = 1.025;
  a9: number = 7.139;

  calculateCelerity(t: number,s: number,d: number) {
    let result : number; 
    result = this.a1 + (this.a2 * t) - (this.a3 * Math.pow(10,-2) * Math.pow(t,2)) + (this.a4 * Math.pow(10,-4) * Math.pow(t,3)) + (this.a5 * (s-35)) + (this.a6 * Math.pow(10,-2) * d) + (this.a7 * Math.pow(10,-7) * Math.pow(d,2)) - (this.a8 * Math.pow(10,-2) * t * (s-35)) - (this.a9 * Math.pow(10,-13) * t * Math.pow(d,3));
    console.log("calculate celerity :"+result);
    return result;
  }

  constructor() { }

}