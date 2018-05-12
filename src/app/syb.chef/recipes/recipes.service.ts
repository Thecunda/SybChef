import Recipe from './recipes.model';
import User from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { HeadersService } from '../../services/headers.service';
import 'rxjs/add/operator/map';

import * as config from '../../app.config';

@Injectable()
export class RecipeService {
   
  api_url = config.appConfig.apiUrl;
  recipeUrl = `${this.api_url}/api/recipes`;
 
  constructor(
    private http: HttpClient,
    private headersService: HeadersService
  ) { }
  
  createRecipe(recipe: Recipe): Observable<any> {
    var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    return this.http.post(`${this.recipeUrl}`, {recipe}, {headers : headersJSON})
  }

  getRecipes(page:number,limit:number): Observable<any> {
    var headersJSON = this.headersService.setHeader();// set the standard header for token identification	
    let getUrl = this.recipeUrl+"/?limit="+limit+"&page="+page;
    return this.http.get(getUrl, { headers: headersJSON }).map(
    // return this.http.post(`${this.recipeUrl}/?`, {page: page, limit: 100}, { headers: headersJSON }).map(
      res  => {
        return (res["data"]);
      }
    )
  }

  editRecipe(recipe:Recipe): Observable<any> {
    var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let editUrl = `${this.recipeUrl}`
    return this.http.put(editUrl, {recipe} , {headers : headersJSON});
  }

  deleteRecipe(id:string):any {
    var headersJSON = this.headersService.setHeader();// set the standard header for token identification
    let deleteUrl = `${this.recipeUrl}/${id}`
    return this.http.delete(deleteUrl,{headers : headersJSON})
  }

  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
