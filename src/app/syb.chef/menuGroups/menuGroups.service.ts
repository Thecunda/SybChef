import MenuGroup from './menuGroups.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class MenuGroupService {
   
  api_url = config.appConfig.apiUrl;
  menuGroupUrl = `${this.api_url}/api/menuGroups`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createMenuGroup(menuGroup: MenuGroup): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.menuGroupUrl}`, {menuGroup}, {headers : headersJSON})
	}

  getMenuGroups(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.menuGroupUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }

  editMenuGroup(menuGroup:MenuGroup): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.menuGroupUrl}`
    return this.http.put(editUrl, {menuGroup} , {headers : headersJSON});
  }

  deleteMenuGroup(id:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.menuGroupUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
