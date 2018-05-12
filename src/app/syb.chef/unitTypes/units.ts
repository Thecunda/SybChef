import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { UnitService } from './units.service';
import Unit from './units.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'units-root',
  templateUrl: './units.html',
  styleUrls: ['../../app.component.scss']
})
export class UnitComponent implements OnInit {
	
	currentUser: User;
	idUnitType: string =""
	descUnitType: string =""
	
	constructor(
		private route: ActivatedRoute,
		private unitService: UnitService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
			
		}
	filter: Unit = new Unit();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newUnit: Unit = new Unit()
  
  unitsList: Unit[];
  editUnits: Unit[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate
  
  ngOnInit(): void {
	  //this.filter.designation = "";
	  this.route.params.subscribe(params =>{this.idUnitType = params['idUnitType']})
	  this.filter.unitType = this.idUnitType;
      this.newUnit.unitType = this.idUnitType;
	  this.newUnit.conversion = 0;
	  this.getOneUnits(this.idUnitType) //load all unit for a uniYype

  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

	  
 
   
  getUnits(page) {
    this.unitService.getUnits(page)
      .subscribe(data => {		
		this.unitsList = data.docs
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
  
getOneUnits(idUnitType) {
    this.unitService.getOneUnits(idUnitType)
      .subscribe(data => {		
		this.unitsList = data
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
	this.unitService.createUnit(this.newUnit)
	.subscribe(
	(res) => {
		this.unitsList.push(res.data)
		this.newUnit = new Unit()
		this.newUnit.unitType = this.idUnitType;
		this.newUnit.conversion = 0;		
		this.alertService.success(this.msg3);
		this.getOneUnits(this.idUnitType)
	},
	error => {
		if (error.error.message=="E11000"){
			this.alertService.error(this.msg1+" : "+this.newUnit.designation);
		} else{
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
		}
	})

  }

  editUnit(unit: Unit) {
    if(this.unitsList.includes(unit)){
      if(!this.editUnits.includes(unit)){
        this.editUnits.push(unit)
      }else{
        this.editUnits.splice(this.editUnits.indexOf(unit), 1)
        this.unitService.editUnit(unit).subscribe(res => {
			
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editUnit(unit)
        })
      }
    }
  }

  submitUnit(event, unit:Unit){
    if(event.keyCode ==13){
      this.editUnit(unit)
    }
  }

  deleteUnit(unit: Unit) {
    this.unitService.deleteUnit(unit._id).subscribe(res => {
	  //this.alertService.success("Succesfully Deleted Unit");	
      this.unitsList.splice(this.unitsList.indexOf(unit), 1)
    }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
	goBack(): void {
		this.location.back();
	}
	
  title = 'unit';


}
