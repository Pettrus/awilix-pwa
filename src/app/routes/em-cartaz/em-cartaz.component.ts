import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

import { DomSanitizer } from '@angular/platform-browser';

import { GlobalsService } from '../../service/globals.service';
import { UtilService } from '../../service/util.service';

@Component({
    selector: 'app-em-cartaz',
    templateUrl: './em-cartaz.component.html',
    styleUrls: ['./em-cartaz.component.scss']
})
export class EmCartazComponent implements OnInit {

    public filmes: Array<any> = [];
    public filmesCompletos: Array<any> = [];
    public preview: any = {};
    public carregando: boolean = false;
    public carregarImagem: boolean = true;
    public modal: boolean = false;
    public idioma: string = null;

    constructor(private api: ApiService, public sanitizer: DomSanitizer,
        private globals: GlobalsService, private util: UtilService) { }

    ngOnInit() {
        const idioma = localStorage.getItem("idioma");

        if (idioma == null) {
            this.toggleModal();
        } else {
            this.iniciarListagem();
        }

        this.globals.atualizarFilmes.subscribe(() => {
            this.listarFilmes();
        });

        this.globals.filtrarPorCinema.subscribe(cinema => {
            this.fecharPreview();
            if (cinema == null)
                this.filmes = this.filmesCompletos;
            else
                this.filmes = this.filmesCompletos.filter(f => f.filmeCinemas.some(fc => fc.cinema.nome == cinema));
        });

        this.globals.trocarIdioma.subscribe(() => {
            this.toggleModal();
        });
    }

    selecionarCidade(idioma) {
        if (idioma == null) {
            this.util.mostrarNotificacao("Selecione a cidade", "Aviso", "warning");
            return;
        }

        localStorage.setItem("idioma", idioma);
        this.toggleModal();
        this.iniciarListagem();
    }

    iniciarListagem() {
        this.listarFilmes();
    }

    async listarFilmes() {
        try {
            this.carregando = true;
            this.filmes = await this.api.get("filmes/" + localStorage.getItem("idioma"));
            this.filmesCompletos = this.filmes;
            const cinemas = new Set();

            this.filmes.forEach(f => {
                f.detalhes = f.detalhes[0];

                f.filmeCinemas.map(c => {
                    cinemas.add(c.cinema.nome)
                });
            });

            this.globals.cinemas = Array.from(cinemas).sort();

            const data = new Date();

            if (!this.globals.online && parseInt(localStorage.getItem("diaAtualizacao")) != data.getDate()) {
                this.util.removerTodosSnackBar();
                this.util.mostrarSnackAtualizar();
                this.globals.desatualizado = true;
            } else {
                localStorage.setItem("diaAtualizacao", data.getDate().toString());
            }
        } catch (e) {
            this.util.verificarErro(e);
        } finally {
            this.carregando = false;
        }
    }

    abrirPreview(filme, index) {
        this.preview = filme;
        this.preview.visualizacao = 'sinopse';
        let coluna;
        this.carregarImagem = true;

        if (window.innerWidth >= 1024)
            coluna = 6;
        else if (window.innerWidth >= 769)
            coluna = 3;
        else
            coluna = 2;

        let soma = index + (coluna - index % coluna) - 1;

        this.preview.index = (soma >= this.filmes.length ? this.filmes.length - 1 : soma);
        setTimeout(() => {
            this.util.scrollParaDiv("preview-" + this.preview.index);
        }, 500);
    }

    fecharPreview() {
        this.preview = {};
    }

    trocarVisualizacao(tipo, scroll) {
        this.preview.visualizacao = tipo;
        if (scroll)
            setTimeout(() => {
                this.util.scrollParaDiv(tipo);
            }, 500);
    }

    limparUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    agruparHorarios(horarios) {
        const novo: any = [];

        horarios.forEach((h) => {
            const obj = novo.find(f => f.tipo == h.tipoFilme);

            if (obj != null) {
                obj.inicio.push(h.inicio);
            } else {
                novo.push({
                    tipo: h.tipoFilme,
                    inicio: [h.inicio]
                });
            }
        });

        return novo;
    }

    toggleModal() {
        this.modal = !this.modal;
    }
}