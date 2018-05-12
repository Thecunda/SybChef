import MenuGroupAppro from './menuGroupAppros.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class MenuGroupApproService {
   
  api_url = config.appConfig.apiUrl;
  menuGroupApproUrl = `${this.api_url}/api/menuGroupAppros`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
   makeShoppingList(idMenuGroup:string): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.menuGroupApproUrl+"/makeShoppingList/?idMenuGroup="+idMenuGroup;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  } 
 
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
