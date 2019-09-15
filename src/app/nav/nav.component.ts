import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UtilService } from 'src/app/service/util.service';
import { GlobalsService } from '../service/globals.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    public email: string;
    public carregando: boolean = false;
    public modal: boolean = false;
    public burger: boolean = false;

    public navMobile: boolean = true;

    public cinema: string = null;

    public rotaAtual: string = null;

    constructor(private api: ApiService, private util: UtilService, public globals: GlobalsService,
        private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.rotaAtual = event.url;
            }
        });
    }

    async cadastrarEmail() {
        try {
            this.carregando = true;
            await this.api.post("feed", { email: this.email, cidade: "Fortaleza-CE" });

            this.util.mostrarNotificacao("Cadastro realizado com sucesso!");
            this.toggleModal();
        } catch (e) {
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

    filtrar(cinema) {
        this.cinema = cinema;
        this.globals.filtrarPorCinema.emit(cinema);
        this.toggleNavMobile();
    }

    toggleNavMobile() {
        this.navMobile = !this.navMobile;

        if (this.navMobile)
            setTimeout(() => {
                this.util.scrollParaDiv("filmesEmCartaz");
            }, 150);
    }

    idiomaSelecionado() {
        if(localStorage.getItem("idioma") == "PORTUGUES") {
            return "Lisboa";
        }

        return "Fortaleza";
    }

    trocarIdioma() {
        this.globals.trocarIdioma.emit(true);
    }
}