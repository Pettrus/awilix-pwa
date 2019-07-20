import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalsService {

    public online: boolean = navigator.onLine;
    public desatualizado: boolean = false;
    public cinemas: Array<any> = [];

    public atualizarFilmes: EventEmitter<boolean> = new EventEmitter();
    constructor() { }
}
