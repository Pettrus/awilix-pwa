import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UtilService } from 'src/app/service/util.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cancelar-inscricao',
    templateUrl: './cancelar-inscricao.component.html',
    styleUrls: ['./cancelar-inscricao.component.scss']
})
export class CancelarInscricaoComponent implements OnInit {

    constructor(private api: ApiService, private util: UtilService, private route:ActivatedRoute) {}

    async ngOnInit() {
        try {
            const email = this.route.snapshot.params['email'];
            this.api.get("feed/cancelar-inscricao/" + email);
        }catch(e) {
            this.util.verificarErro(e);
        }
    }
}