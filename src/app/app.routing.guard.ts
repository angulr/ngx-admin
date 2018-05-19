import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import * as config from '../assets/appsettings.json';
@Injectable()
export class AppRoutingGuard implements CanActivate {
    constructor(private router: Router) { };

    canActivate() {
        if(config.default.enableAuth){
            const isAuth = !!localStorage.getItem('auth_app_token');
            if (isAuth) {
                return true;
            } else {
                window.alert("You don't have permission to view this page");
                this.router.navigate(['auth']);
                return false;
            }
        }else{
            return true;
        }
        
    }
}