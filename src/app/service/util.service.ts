import { Injectable } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private snackbarService: SnackbarService) {}

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
}
