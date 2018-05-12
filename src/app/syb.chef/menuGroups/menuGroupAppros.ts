import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { MenuGroupApproService } from './menuGroupAppros.service';
import MenuGroupAppro from './menuGroupAppros.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'menuGroupAppros-root',
  templateUrl: './menuGroupAppros.html',
  styleUrls: ['../../app.component.scss']
})
export class MenuGroupApproComponent implements OnInit {
	
	currentUser: User;
	idMenuGroup: string =""
	nextStep: number =0
	constructor(
		private route: ActivatedRoute,
		private menuGroupApproService: MenuGroupApproService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
			
		}
	filter: MenuGroupAppro = new MenuGroupAppro();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newMenuGroupAppro: MenuGroupAppro = new MenuGroupAppro()
  
  menuGroupApprosList: MenuGroupAppro[];
 
  ngOnInit(): void {
	  this.route.params.subscribe(params =>{this.idMenuGroup = params['idMenuGroup']})
      this.makeShoppingList(this.idMenuGroup)
  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

  makeShoppingList(idMenuGroup) {
    this.menuGroupApproService.makeShoppingList(idMenuGroup)
      .subscribe(data => {		
		this.menuGroupApprosList = data
		this.alertService.success(this.msg3);		
      },
		error => {
			console.log(error)
			if (error.message=="Http failure response for (unknown url): 0 Unknown Error"){
				this.alertService.error(this.msg5);
			} else {
				this.alertService.error("SYSTEM ERROR : " + error.message);
			}
		})
  }
  
	printShoppingList(titre, objet) {
	// Définition de la zone à imprimer
	var zone = document.getElementById(objet).innerHTML;
	
	// Ouverture du popup
	var fen = window.open("", "shoppingList", "height=500, width=600,toolbar=0, menubar=0, scrollbars=1, resizable=1,status=0, location=0, left=10, top=10");
	 
	// style du popup
	fen.document.body.style.color = '#000000';
	fen.document.body.style.backgroundColor = '#FFFFFF';
	fen.document.body.style.padding = "20px";
	 
	// Ajout des données a imprimer
	fen.document.title = titre;
	fen.document.body.innerHTML += " " + zone + " ";
	 
	// Impression du popup
	fen.window.print();
	 
	//Fermeture du popup
	fen.window.close();

	}

	goBack(): void {
		this.location.back();
	}
	
  title = 'menuGroupAppro';

}
