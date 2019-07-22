import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { GlobalsService } from './service/globals.service';
import { UtilService } from './service/util.service';
import { MensagensPushService } from './service/mensagens-push.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private connectionService: ConnectionService,
        private globals: GlobalsService, private util: UtilService, private messageService: MensagensPushService) { }

    ngOnInit() {
        let snackBarId = null;

        if (!this.globals.online)
            snackBarId = this.util.mostrarSnackOffline();

        this.connectionService.monitor().subscribe(isConnected => {
            this.globals.online = isConnected;
            if (!isConnected) {
                snackBarId = this.util.mostrarSnackOffline();
            } else if (this.globals.desatualizado) {
                this.globals.atualizarFilmes.emit(true);
                this.util.removerTodosSnackBar();
            } else {
                this.util.removerSnackBar(snackBarId);
            }
        });
    
        this.messageService.requestPermission();
        this.messageService.receiveMessage();
        let message = this.messageService.currentMessage;

        console.log(message);
    }
}