import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeadersService {
 
	constructor() { }
  
	setHeader(){
		let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		if (currentUser && currentUser.token) {
			var headersJSON = new HttpHeaders();
			headersJSON = headersJSON.append('Content-Type', 'application/json');
			headersJSON = headersJSON.append('Authorization', 'Bearer ' + currentUser.token);
			headersJSON = headersJSON.append('special', currentUser.username);
			return(headersJSON)
		} 
    }
}


