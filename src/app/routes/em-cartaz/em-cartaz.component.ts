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
    public preview: any = {};
    public carregando: boolean = false;

    constructor(private api: ApiService, public sanitizer: DomSanitizer,
        private globals: GlobalsService, private util: UtilService) {}

    async ngOnInit() {
        try {
            this.carregando = true;
            this.filmes = await this.api.get("cinema");

            for(let filme of this.filmes) {
                filme.cinemas = [];
                for(let horario of filme.horarios) {
                    if (!filme.cinemas.some(e => e.nome === horario.cinema.nome)) {
                        const cinema = { nome: horario.cinema.nome };
                        cinema[horario.tipoFilme] = [{ hora: horario.inicio }];

                        filme.cinemas.push(cinema);
                    }else {
                        const index = filme.cinemas.findIndex(e => e.nome === horario.cinema.nome);
                        if(filme.cinemas[index][horario.tipoFilme] == null) {
                            filme.cinemas[index][horario.tipoFilme] = [];
                        }

                        filme.cinemas[index][horario.tipoFilme].push({ hora: horario.inicio });
                    }
                }
            }

            const data = new Date();

            if(!this.globals.online && parseInt(localStorage.getItem("diaAtualizacao")) != data.getDate()) {
                this.util.removerTodosSnackBar();
                this.util.mostrarSnackAtualizar();
            }else {
                localStorage.setItem("diaAtualizacao", data.getDate().toString());
            }
        }catch(e) {
            console.log(e);
        }finally {
            this.carregando = false;
        }
    }

    abrirPreview(filme, index) {
        this.preview = filme;
        this.preview.visualizacao = 'sinopse';
        let coluna

        if(window.innerWidth >= 1024) 
            coluna = 6;
        else if(window.innerWidth >= 769)
            coluna = 3;
        else
            coluna = 2;
        
        let soma = index + (coluna - index % coluna) - 1;
        
        this.preview.index = (soma > this.filmes.length ? this.filmes.length - 1 : soma);
        setTimeout(() => {
            document.getElementById("preview-" + this.preview.index).scrollIntoView({
                block: "end",
                inline: "nearest",
                behavior: 'smooth'
            });
        }, 500);
    }

    fecharPreview() {
        this.preview = {};
    }

    trocarVisualizacao(tipo) {
        this.preview.visualizacao = tipo;
    }

    limparUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    keys(obj) {
        let novo = Object.assign({}, obj);
        delete novo.nome;

        return Object.keys(novo);
    }
}