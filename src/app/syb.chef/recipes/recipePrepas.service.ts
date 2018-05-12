import RecipePrepa from './recipePrepas.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class RecipePrepaService {
   
  api_url = config.appConfig.apiUrl;
  recipePrepaUrl = `${this.api_url}/api/recipePrepas`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createRecipePrepa(recipePrepa: RecipePrepa): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.recipePrepaUrl}`, {recipePrepa}, {headers : headersJSON})
	}

  getRecipePrepas(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.recipePrepaUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }

  getOneRecipePrepas(idRecipe:string): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.recipePrepaUrl+"/oneRecipePrepa/?idRecipe="+idRecipe;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  } 
  
  editRecipePrepa(recipePrepa:RecipePrepa): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.recipePrepaUrl}`
    return this.http.put(editUrl, {recipePrepa} , {headers : headersJSON});
  }

  deleteRecipePrepa(id:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.recipePrepaUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
