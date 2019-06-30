import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { GlobalsService } from './service/globals.service';
import { UtilService } from './service/util.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private connectionService: ConnectionService,
        private globals: GlobalsService, private util: UtilService) { }
    
    

    ngOnInit() {
        let snackBarId = null;

        if(!this.globals.online)
            snackBarId = this.util.mostrarSnackOffline();
        
        this.connectionService.monitor().subscribe(isConnected => {
            this.globals.online = isConnected;
            if (!isConnected) {
                snackBarId = this.util.mostrarSnackOffline();
            }else {
                this.util.removerSnackBar(snackBarId);
            }
        });
    }
}