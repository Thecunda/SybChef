import Ingredient from './ingredients.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class IngredientService {
   
  api_url = config.appConfig.apiUrl;
  ingredientUrl = `${this.api_url}/api/ingredients`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createIngredient(ingredient: Ingredient): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.ingredientUrl}`, {ingredient}, {headers : headersJSON})
	}

  getIngredients(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.ingredientUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }

  editIngredient(ingredient:Ingredient): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.ingredientUrl}`
    return this.http.put(editUrl, {ingredient} , {headers : headersJSON});
  }

  deleteIngredient(id:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.ingredientUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
