import Unit from './units.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class UnitService {
   
  api_url = config.appConfig.apiUrl;
  unitUrl = `${this.api_url}/api/units`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createUnit(unit: Unit): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.unitUrl}`, {unit}, {headers : headersJSON})
	}

  getUnits(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.unitUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }
   
  getOneUnits(idUnitType:string): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.unitUrl+"/oneUnitType/?idUnitType="+idUnitType;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }
  
  editUnit(unit:Unit): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.unitUrl}`
    return this.http.put(editUrl, {unit} , {headers : headersJSON});
  }

  deleteUnit(id:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.unitUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
