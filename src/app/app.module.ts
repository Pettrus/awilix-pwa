import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EmCartazComponent } from './routes/em-cartaz/em-cartaz.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SnackbarModule } from 'ngx-snackbar';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CancelarInscricaoComponent } from './routes/cancelar-inscricao/cancelar-inscricao.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EmCartazComponent,
    CancelarInscricaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SnackbarModule.forRoot(),
    FormsModule,
    SnotifyModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
