import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmCartazComponent } from './routes/em-cartaz/em-cartaz.component';
import { CancelarInscricaoComponent } from './routes/cancelar-inscricao/cancelar-inscricao.component';

const routes: Routes = [
  { path: '', component: EmCartazComponent },
  { path: 'cancelar-inscricao/:email', component: CancelarInscricaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
