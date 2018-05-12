import UnitType from './unitTypes.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class UnitTypeService {
   
  api_url = config.appConfig.apiUrl;
  unitTypeUrl = `${this.api_url}/api/unitTypes`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createUnitType(unitType: UnitType): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.unitTypeUrl}`, {unitType}, {headers : headersJSON})
	}

  getUnitTypes(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.unitTypeUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }

  editUnitType(unitType:UnitType): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.unitTypeUrl}`
    return this.http.put(editUrl, {unitType} , {headers : headersJSON});
  }

  deleteUnitType(id:string,designation:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.unitTypeUrl}/${id}/${designation}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
