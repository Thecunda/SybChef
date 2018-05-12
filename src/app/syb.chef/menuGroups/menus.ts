import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { MenuService } from './menus.service';
import { RecipeService } from '../recipes/recipes.service'; // used to build a list of dates
import Recipe from '../recipes/recipes.model'; // used to build a list of dates
import Menu from './menus.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'menus-root',
  templateUrl: './menus.html',
  styleUrls: ['../../app.component.scss']
})
export class MenuComponent implements OnInit {
	
	currentUser: User;
	idMenuGroup: string =""
	recipeList: Recipe[];
	
	constructor(
		private route: ActivatedRoute,
		private menuService: MenuService,
		private recipeService: RecipeService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
			
		}
	filter: Menu = new Menu();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newMenu: Menu = new Menu()
  
  menusList: Menu[];
  editMenus: Menu[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate
  
  ngOnInit(): void {
	  this.route.params.subscribe(params =>{this.idMenuGroup = params['idMenuGroup']})
	  this.filter.menuGroup= this.idMenuGroup;
      this.newMenu.menuGroup= this.idMenuGroup;
      this.makeRecipeList()
	  this.getOneMenus(this.idMenuGroup) //load all compos for a menuGroup

  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

	  
   makeRecipeList() {
    this.recipeService.getRecipes(0)
      .subscribe(data => {		
			this.recipeList = data
		},
		error => {
			this.alertService.error("SYSTEM ERROR ON GET INGREDIENTS : " + error.message);
		})
	}
	
   
  getMenus(page) {
    this.menuService.getMenus(page)
      .subscribe(data => {		
		this.menusList = data.docs
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
  
  getOneMenus(idMenuGroup) {
    this.menuService.getOneMenus(idMenuGroup)
      .subscribe(data => {		
		this.menusList = data
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
	this.menuService.createMenu(this.newMenu)
	.subscribe(
	(res) => {
		this.menusList.push(res.data)
		this.newMenu = new Menu()
		this.newMenu.menuGroup= this.idMenuGroup;		
		this.getOneMenus(this.idMenuGroup)
	},
	error => {
		if (error.error.message=="E11000"){
			this.alertService.error(this.msg1+" : "+this.newMenu.date);
		} else{
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
		}
	})

  }

  editMenu(menu: Menu) {
    if(this.menusList.includes(menu)){
      if(!this.editMenus.includes(menu)){
        this.editMenus.push(menu)
      }else{
        this.editMenus.splice(this.editMenus.indexOf(menu), 1)
        this.menuService.editMenu(menu).subscribe(res => {
			
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editMenu(menu)
        })
      }
    }
  }

  submitMenu(event, menu:Menu){
    if(event.keyCode ==13){
      this.editMenu(menu)
    }
  }

  deleteMenu(menu: Menu) {
    this.menuService.deleteMenu(menu._id).subscribe(res => {
	  //this.alertService.success("Succesfully Deleted Menu");	
      this.menusList.splice(this.menusList.indexOf(menu), 1)
    }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
	goBack(): void {
		this.location.back();
	}
	
  title = 'menu';


}
