import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { IngredientService } from './ingredients.service';
import Ingredient from './ingredients.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'ingrediens-root',
  templateUrl: './ingredients.html',
  styleUrls: ['../../app.component.scss']
})
export class IngredientComponent implements OnInit {
	
	currentUser: User;
	

	
	constructor(
		private route: ActivatedRoute,
		private ingredientService: IngredientService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
			
		}
	filter: Ingredient = new Ingredient();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newIngredient: Ingredient = new Ingredient()
  
  ingredientsList: Ingredient[];
  editIngredients: Ingredient[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate
  
  ngOnInit(): void {
	  this.getIngredients(1) //load first page of 10 results

  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }
 
  getIngredients(page) {
    this.ingredientService.getIngredients(page)
      .subscribe(data => {		
		this.ingredientsList = data.docs
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
  
  create() {
	this.ingredientService.createIngredient(this.newIngredient)
	.subscribe(
	(res) => {
		this.ingredientsList.push(res.data)
		this.newIngredient = new Ingredient()
		this.alertService.success(this.msg3);
		this.getIngredients(1)
	},
	error => {
		if (error.error.message=="E11000"){
			this.alertService.error(this.msg1+" : "+this.newIngredient.designation);
		} else{
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
		}
	})

  }

  editIngredient(ingredient: Ingredient) {
    if(this.ingredientsList.includes(ingredient)){
      if(!this.editIngredients.includes(ingredient)){
        this.editIngredients.push(ingredient)
      }else{
        this.editIngredients.splice(this.editIngredients.indexOf(ingredient), 1)
        this.ingredientService.editIngredient(ingredient).subscribe(res => {
			
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editIngredient(ingredient)
        })
      }
    }
  }

  submitIngredient(event, ingredient:Ingredient){
    if(event.keyCode ==13){
      this.editIngredient(ingredient)
    }
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredientService.deleteIngredient(ingredient._id).subscribe(res => {
	  //this.alertService.success("Succesfully Deleted Ingredient");	
      this.ingredientsList.splice(this.ingredientsList.indexOf(ingredient), 1)
    }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
	goBack(): void {
		this.location.back();
	}
	
  title = 'ingredient';


}
