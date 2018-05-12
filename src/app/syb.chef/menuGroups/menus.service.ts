import Menu from './menus.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class MenuService {
   
  api_url = config.appConfig.apiUrl;
  menuUrl = `${this.api_url}/api/menus`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createMenu(menu: Menu): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.menuUrl}`, {menu}, {headers : headersJSON})
	}

  getMenus(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.menuUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }
  
  getOneMenus(idMenuGroup:string): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.menuUrl+"/getOneMenus/?idMenuGroup="+idMenuGroup;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }

  editMenu(menu:Menu): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.menuUrl}`
    return this.http.put(editUrl, {menu} , {headers : headersJSON});
  }

  deleteMenu(id:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.menuUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
