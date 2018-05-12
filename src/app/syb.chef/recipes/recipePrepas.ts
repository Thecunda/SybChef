import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { RecipePrepaService } from './recipePrepas.service';
import RecipePrepa from './recipePrepas.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'recipePrepas-root',
  templateUrl: './recipePrepas.html',
  styleUrls: ['../../app.component.scss']
})
export class RecipePrepaComponent implements OnInit {
	
	currentUser: User;
	idRecipe: string =""
	nextStep: number =0
	constructor(
		private route: ActivatedRoute,
		private recipePrepaService: RecipePrepaService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
			
		}
	filter: RecipePrepa = new RecipePrepa();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newRecipePrepa: RecipePrepa = new RecipePrepa()
  
  recipePrepasList: RecipePrepa[];
  editRecipePrepas: RecipePrepa[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate
  
  ngOnInit(): void {
	  this.route.params.subscribe(params =>{this.idRecipe = params['idRecipe']})
	  this.filter.recipe = this.idRecipe;
      this.newRecipePrepa.recipe = this.idRecipe;
	  this.getOneRecipePrepas(this.idRecipe) //load first page of 10 results
		
  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

	  
 
   
  getRecipePrepas(page) {
    this.recipePrepaService.getRecipePrepas(page)
      .subscribe(data => {		
		this.recipePrepasList = data.docs
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
  
	getOneRecipePrepas(idRecipe) {
    this.recipePrepaService.getOneRecipePrepas(idRecipe)
      .subscribe(data => {		
		this.recipePrepasList = data
		for (let x of this.recipePrepasList){
			this.nextStep=x.stepNumber
			}
		this.newRecipePrepa.stepNumber = this.nextStep+1;
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
	this.recipePrepaService.createRecipePrepa(this.newRecipePrepa)
	.subscribe(
	(res) => {
		this.recipePrepasList.push(res.data)
		this.newRecipePrepa = new RecipePrepa()
		this.newRecipePrepa.recipe = this.idRecipe;
				
		this.getOneRecipePrepas(this.idRecipe)
	},
	error => {
		if (error.error.message=="E11000"){
			this.alertService.error(this.msg1+" : "+this.newRecipePrepa.stepNumber);
		} else{
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
		}
	})

  }

  editRecipePrepa(recipePrepa: RecipePrepa) {
    if(this.recipePrepasList.includes(recipePrepa)){
      if(!this.editRecipePrepas.includes(recipePrepa)){
        this.editRecipePrepas.push(recipePrepa)
      }else{
        this.editRecipePrepas.splice(this.editRecipePrepas.indexOf(recipePrepa), 1)
        this.recipePrepaService.editRecipePrepa(recipePrepa).subscribe(res => {
			
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editRecipePrepa(recipePrepa)
        })
      }
    }
  }

  submitRecipePrepa(event, recipePrepa:RecipePrepa){
    if(event.keyCode ==13){
      this.editRecipePrepa(recipePrepa)
    }
  }

  deleteRecipePrepa(recipePrepa: RecipePrepa) {
    this.recipePrepaService.deleteRecipePrepa(recipePrepa._id).subscribe(res => {
	  //this.alertService.success("Succesfully Deleted RecipePrepa");	
      this.recipePrepasList.splice(this.recipePrepasList.indexOf(recipePrepa), 1)
    }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
	goBack(): void {
		this.location.back();
	}
	
  title = 'recipePrepa';


}
