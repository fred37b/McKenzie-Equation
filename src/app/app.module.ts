import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MckenzieEquationService } from './services/mckenzie-equation.service';
import { MckenzieGraphComponent } from './mckenzie-graph/mckenzie-graph.component';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'home', component: AppComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    MckenzieGraphComponent
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [MckenzieEquationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
