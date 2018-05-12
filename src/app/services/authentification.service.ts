import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as config from '../app.config';

@Injectable()
export class AuthentificationService {
    api_url = config.appConfig.apiUrl;
	userUrl = `${this.api_url}/api/authenticate`;

	
    constructor(private http: HttpClient) { }

    login(username: string, password: string){
        return this.http.post(`${this.userUrl}`, { username: username, password: password })
				  .map(response => {
				  
				  var user = {
					  username:response["data"].connectedUser.username,
					  firstName:response["data"].connectedUser.firstName,
					  lastName:response["data"].connectedUser.lastName,
					  admin:response["data"].connectedUser.admin,
					  lang:response["data"].connectedUser.lang,
					  token:response["data"].token
				  }
				  
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }else{
                    alert('Connection refused');
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
		
    }
	
}
    

