import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { RecipeCompoService } from './recipeCompos.service';
import { IngredientService } from '../ingredients/ingredients.service'; // used to build a list of ingredients
import Ingredient from '../ingredients/ingredients.model'; // used to build a list of ingredients
import { UnitService } from '../unitTypes/units.service'; // used to build a list of ingredients
import Unit from '../unitTypes/units.model'; // used to build a list of ingredients
import RecipeCompo from './recipeCompos.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'recipeCompos-root',
  templateUrl: './recipeCompos.html',
  styleUrls: ['../../app.component.scss']
})
export class RecipeCompoComponent implements OnInit {
	
	currentUser: User;
	idRecipe: string =""
	ingredientsList: Ingredient[];
	unitsList: Unit[];
	new: string =null;

	constructor(
		private route: ActivatedRoute,
		private recipeCompoService: RecipeCompoService,
		private ingredientService: IngredientService,
		private unitService: UnitService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
			
		}
	filter: RecipeCompo = new RecipeCompo();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newRecipeCompo: RecipeCompo = new RecipeCompo()
  public newIngredient: Ingredient = new Ingredient()
  
  recipeComposList: RecipeCompo[];
  editRecipeCompos: RecipeCompo[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate
  
  ngOnInit(): void {
	  this.route.params.subscribe(params =>{this.idRecipe = params['idRecipe']})
	  this.filter.recipe = this.idRecipe;
	  this.new = null
      this.newRecipeCompo.recipe = this.idRecipe;
	  this.makeIngredientsList()
	  this.makeUnitsList()
	  this.getOneRecipeCompos(this.idRecipe) //load all compos for a recipe

  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

	  
   makeIngredientsList() {
    this.ingredientService.getIngredients(0)
      .subscribe(data => {		
			this.ingredientsList = data
		},
		error => {
			this.alertService.error("SYSTEM ERROR ON GET INGREDIENTS : " + error.message);
		})
	}
	
	makeUnitsList() {
    this.unitService.getUnits(0)
      .subscribe(data => {	  
			this.unitsList = data
		},
		error => {
			this.alertService.error("SYSTEM ERROR ON GET UNITS : " + error.message);
		})
	}
   
  getRecipeCompos(page) {
    this.recipeCompoService.getRecipeCompos(page)
      .subscribe(data => {		
		this.recipeComposList = data.docs
		this.totPages=Math.trunc(data.total/9)+1; 
	    this.currentPage=Math.trunc(data.offset/9)+1;
		this.alertService.success(this.msg3);		
      },
		error => {
			if (error.message=="Http failure response for (unknown url): 0 Unknown Error"){
				this.alertService.error(this.msg5);
			} else {
				this.alertService.error("SYSTEM ERROR : " + error.message);
			}
		})
  }
  
  getOneRecipeCompos(idRecipe) {
    this.recipeCompoService.getOneRecipeCompos(idRecipe)
      .subscribe(data => {		
		this.recipeComposList = data
		this.alertService.success(this.msg3);		
      },
		error => {
			if (error.message=="Http failure response for (unknown url): 0 Unknown Error"){
				this.alertService.error(this.msg5);
			} else {
				this.alertService.error("SYSTEM ERROR : " + error.message);
			}
		})
  }
  
  create() {
	if (this.new!=null){
		this.newIngredient.designation=this.new
		this.ingredientService.createIngredient(this.newIngredient)
			.subscribe(
			(res) => {
				this.ingredientsList.push(res.data)
			},
			error => {
				if (error.error.message!="E11000"){
					this.alertService.error("SYSTEM ERROR : " + error.error.message);
				}
			})
		this.newRecipeCompo.ingredient=this.new
		this.new=null
	}
	this.recipeCompoService.createRecipeCompo(this.newRecipeCompo)
	.subscribe(
	(res) => {
		this.recipeComposList.push(res.data)
		this.newRecipeCompo = new RecipeCompo()
		this.newRecipeCompo.recipe= this.idRecipe;		
		this.getOneRecipeCompos(this.idRecipe)
	},
	error => {
		if (error.error.message=="E11000"){
			this.alertService.error(this.msg1+" : "+this.newRecipeCompo.ingredient);
		} else{
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
		}
	})

  }

  editRecipeCompo(recipeCompo: RecipeCompo) {
    if(this.recipeComposList.includes(recipeCompo)){
      if(!this.editRecipeCompos.includes(recipeCompo)){
        this.editRecipeCompos.push(recipeCompo)
      }else{
        this.editRecipeCompos.splice(this.editRecipeCompos.indexOf(recipeCompo), 1)
        this.recipeCompoService.editRecipeCompo(recipeCompo).subscribe(res => {
			
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editRecipeCompo(recipeCompo)
        })
      }
    }
  }

  submitRecipeCompo(event, recipeCompo:RecipeCompo){
    if(event.keyCode ==13){
      this.editRecipeCompo(recipeCompo)
    }
  }

  deleteRecipeCompo(recipeCompo: RecipeCompo) {
    this.recipeCompoService.deleteRecipeCompo(recipeCompo._id).subscribe(res => {
	  //this.alertService.success("Succesfully Deleted RecipeCompo");	
      this.recipeComposList.splice(this.recipeComposList.indexOf(recipeCompo), 1)
    }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
	goBack(): void {
		this.location.back();
	}
	
  title = 'recipeCompo';


}
