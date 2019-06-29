import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';
import { ConnectionService } from 'ng-connection-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private snackbarService: SnackbarService, private connectionService: ConnectionService) { }

    ngOnInit() {
        let snackBarId = null;
        this.connectionService.monitor().subscribe(isConnected => {
            if (!isConnected) {
                this.snackbarService.add({
                    msg: 'Sem conexão com a internet.',
                    color: "#FFF",
                    action: {
                        text: null
                    },
                    onAdd: (snack) => {
                        snackBarId = snack.id;
                    },
                });
            }else {
                this.snackbarService.remove(snackBarId);
            }
        });
    }
}