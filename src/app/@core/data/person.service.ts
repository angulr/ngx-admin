import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as config from '../../../assets/appsettings.json';

@Injectable()
export class PersonService {
    TOKEN_KEY = 'token';

    constructor(private http: HttpClient) {
    }

    getMessages(userId: string): Observable<any[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        const endpoint = `${config.default.api.native.endpoint}/posts/${userId}`;
        return this.http.get<any[]>(endpoint, httpOptions);
    }

    postMessage(message): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        const endpoint = `${config.default.api.native.endpoint}/post`;
        return this.http.post<any>(endpoint, message, httpOptions);
    }

    getUsers(): Observable<any[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        const endpoint = `${config.default.api.native.endpoint}/users`;
        return this.http.get<any[]>(endpoint, httpOptions);
    }

    getProfile(id: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        const endpoint = `${config.default.api.native.endpoint}/profile/${id}`;
        return this.http.get<any>(endpoint, httpOptions);
    }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    registerUser(registerData) {
        this.http.post<any>(config.default.api.native.authendpoint + '/register', registerData).subscribe(res => {
            this.saveToken(res.token);
        });
    }

    loginUser(loginData) {
        this.http.post<any>(config.default.api.native.authendpoint + '/login', loginData).subscribe(res => {
            this.saveToken(res.token);
        });
    }

    saveToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
}
