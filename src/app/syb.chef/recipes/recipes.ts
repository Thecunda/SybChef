import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { RecipeService } from './recipes.service';
import Recipe from './recipes.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'recipes-root',
  templateUrl: './recipes.html',
  styleUrls: ['../../app.component.scss']
})
export class RecipeComponent implements OnInit {

  currentUser: User;
  types=['entrée','plat','dessert']

  constructor(
      private route: ActivatedRoute,
      private recipeService: RecipeService,
      private alertService: AlerteService,
      private location: Location,
      private translate: TranslateService) { 
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    translate.setDefaultLang('en');
    translate.use(this.currentUser.lang);
    
  }
  filter: Recipe = new Recipe();
  msg1 : string
  msg2 : string
  msg3 : string
  msg4 : string
  msg5 : string
  dummy=this.transMessages()

  public newRecipe: Recipe = new Recipe()

  recipesList: Recipe[];
  editRecipes: Recipe[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate

  ngOnInit(): void {
    this.getRecipes(1) //load first page of 'this.limit' results
  }

  transMessages(){
    this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
    this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
    this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

  getRecipes(page) {
    this.recipeService.getRecipes(page)
    .subscribe(data => {
        this.recipesList = data.docs
        this.totPages=Math.trunc(data.total/9)+1;
        this.currentPage=Math.trunc(data.offset/9)+1;
        this.alertService.success(this.msg3);
      },
      error => {
        if (error.message=="Http failure response for (unknown url): 0 Unknown Error") {
          this.alertService.error(this.msg5);
        } else {
          this.alertService.error("SYSTEM ERROR : " + error.message);
        }
      }
    )
  }

  create() {
    //this.newRecipe.recipe=this.recipe
    this.recipeService.createRecipe(this.newRecipe)
    .subscribe(
    (res) => {
      this.recipesList.push(res.data)
      this.newRecipe = new Recipe()	
      this.alertService.success(this.msg3);
      this.getRecipes(1)
    },
    error => {
      if (error.error.message=="E11000"){
        this.alertService.error(this.msg1+" : "+this.newRecipe.designation);
      } else{
        this.alertService.error("SYSTEM ERROR : " + error.error.message);
      }
    })

  }

  editRecipe(recipe: Recipe) {
    if(this.recipesList.includes(recipe)){
      if(!this.editRecipes.includes(recipe)){
        this.editRecipes.push(recipe)
      }else{
        this.editRecipes.splice(this.editRecipes.indexOf(recipe), 1)
        this.recipeService.editRecipe(recipe).subscribe(res => {
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editRecipe(recipe)
        })
      }
    }
  }

  submitRecipe(event, recipe:Recipe){
    if(event.keyCode ==13){
      this.editRecipe(recipe)
    }
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe._id).subscribe(res => {
    this.alertService.success(this.msg3);	
      this.recipesList.splice(this.recipesList.indexOf(recipe), 1)
    }, error => {
      this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
  goBack(): void {
    this.location.back();
  }
  
  title = 'recipe';


}
