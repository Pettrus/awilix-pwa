import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {}

    get(url: string): Promise<any> {
        return this.http.get(environment.apiUrl + url).toPromise();
    }

    post(url: string, params: any): Promise<any> {
        return this.http.post(environment.apiUrl + url, params).toPromise();
    }

    put(url: string, params: any): Promise<any> {
        return this.http.put(environment.apiUrl + url, params).toPromise();
    }

    delete(url: string, params: any): Promise<any> {
        return this.http.delete(environment.apiUrl + url, params).toPromise();
    }
}