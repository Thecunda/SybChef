import RecipeCompo from './recipeCompos.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class RecipeCompoService {
   
  api_url = config.appConfig.apiUrl;
  recipeCompoUrl = `${this.api_url}/api/recipeCompos`;
 
  constructor(
    private http: HttpClient,
	private headersService: HeadersService
  ) { }
  
  createRecipeCompo(recipeCompo: RecipeCompo): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.recipeCompoUrl}`, {recipeCompo}, {headers : headersJSON})
	}

  getRecipeCompos(page:number): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.recipeCompoUrl+"/?page="+page;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }
  
  getOneRecipeCompos(idRecipe:string): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
	let getUrl = this.recipeCompoUrl+"/oneRecipeCompo/?idRecipe="+idRecipe;
	return this.http.get(getUrl, { headers: headersJSON })
    .map(res  => {
	  return (res["data"]);
    })
  }

  editRecipeCompo(recipeCompo:RecipeCompo): Observable<any>{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.recipeCompoUrl}`
    return this.http.put(editUrl, {recipeCompo} , {headers : headersJSON});
  }

  deleteRecipeCompo(id:string):any{
	var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.recipeCompoUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
