import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalsService {

    public online: boolean = navigator.onLine;
    public desatualizado: boolean = false;

    public atualizarFilmes: EventEmitter<boolean> = new EventEmitter();
    constructor() { }
}
