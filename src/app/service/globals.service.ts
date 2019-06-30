import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalsService {

    public online: boolean = navigator.onLine;

    constructor() { }
}
