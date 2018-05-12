import User from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from './headers.service';
import 'rxjs/add/operator/map';

import * as config from '../app.config';

@Injectable()
export class UserService {
   
  api_url = config.appConfig.apiUrl;
  userUrl = `${this.api_url}/api/users`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createUser(user: User): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.userUrl}`, user, {headers : headersJSON})
	}

  getUsers(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.userUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }

  editUser(user:User){
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.userUrl}`
    return this.http.put(editUrl, user , {headers : headersJSON});
  }

  deleteUser(id:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.userUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
