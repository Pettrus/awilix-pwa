import { Injectable } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';
import { SnotifyService } from 'ng-snotify';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private snackbarService: SnackbarService, private snotifyService: SnotifyService) {}

    mostrarNotificacao(mensagem?: string, titulo?: string, tipo?: string): void {
        titulo = (titulo == null ? "Aviso" : titulo);
        if(tipo == null || tipo == 'success')
            this.snotifyService.success(mensagem, titulo);
        else if(tipo == 'warning')
            this.snotifyService.warning(mensagem, titulo);
        else if(tipo == 'info')
            this.snotifyService.info(mensagem, titulo);
        else
            this.snotifyService.error(mensagem, titulo);
    }

    mostrarSnackOffline() {
        let id = null;

        this.snackbarService.add({
            msg: 'Sem conexão com a internet.',
            color: "#FFF",
            action: {
                text: null
            },
            onAdd: (snack) => {
                id = snack.id;
            },
        });

        return id;
    }

    mostrarSnackAtualizar() {
        this.snackbarService.add({
            msg: 'Seus horários estão desatualizados, conecte a internet e clique em atualizar.',
            color: "#FFF",
            action: {
                text: 'Atualizar',
                onClick: (snack) => {
                    location.reload();
                },
            },
        });
    }

    removerSnackBar(id: string) {
        this.snackbarService.remove(id);
    }

    removerTodosSnackBar() {
        this.snackbarService.clear();
    }

    scrollParaDiv(idDiv, block?, inline? ,behavior?) {
        document.getElementById(idDiv).scrollIntoView({
            block: block != null ? block : "start",
            inline: inline != null ? inline : "nearest",
            behavior: behavior != null ? behavior : 'smooth'
        });
    }

    verificarErro(e) {
        console.log(e);
        if(e.status == 418) {
            console.log("Mensagem");
            this.mostrarNotificacao(e.error.message, "Aviso", "warning");
        }else if(e.error.errors != null && Array.isArray(e.error.errors)) {
            this.mostrarNotificacao(`${e.error.errors[0].code} ${e.error.errors[0].defaultMessage}`, "Aviso", "info");
        }else {
            this.mostrarNotificacao("Desculpe mas aconteceu um erro", 'Aviso', 'error')
        }
    }
}
