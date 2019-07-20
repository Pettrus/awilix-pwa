import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UtilService } from 'src/app/service/util.service';
import { GlobalsService } from '../service/globals.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    public email: string;
    public carregando: boolean = false;
    public modal: boolean = false;
    public burger: boolean = false;

    constructor(private api: ApiService, private util: UtilService, public globals: GlobalsService) { }

    async cadastrarEmail() {
        try {
            this.carregando = true;
            await this.api.post("feed", {email: this.email, cidade: "Fortaleza-CE"});

            this.util.mostrarNotificacao("Cadastro realizado com sucesso!");
            this.toggleModal();
        } catch(e) {
            this.util.verificarErro(e);
        } finally {
            this.carregando = false;
        }
    }

    toggleModal() {
        this.modal = !this.modal;
    }

    toggleBurger() {
        this.burger = !this.burger;
    }
}