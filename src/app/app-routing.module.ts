import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmCartazComponent } from './routes/em-cartaz/em-cartaz.component';

const routes: Routes = [
  { path: '', component: EmCartazComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
