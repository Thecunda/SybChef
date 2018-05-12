import { Response } from '@angular/http';
import { Location } from '@angular/common';
import { UnitTypeService } from './unitTypes.service';
import UnitType from './unitTypes.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';


@Component({
  selector: 'unitTypes-root',
  templateUrl: './unitTypes.html',
  styleUrls: ['../../app.component.scss']
})
export class UnitTypeComponent implements OnInit {
	currentUser: User;

	constructor(
		private unitTypeService: UnitTypeService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);		
		}
	filter: UnitType = new UnitType();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newUnitType: UnitType = new UnitType()

  unitTypesList: UnitType[];
  editUnitTypes: UnitType[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate

  ngOnInit(): void {
	  this.filter.designation = "";
	  this.getUnitTypes(1) //load first page of 10 results

  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

  getUnitTypes(page) {
    this.unitTypeService.getUnitTypes(page)
      .subscribe(data => {		
		this.unitTypesList = data.docs
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
	this.unitTypeService.createUnitType(this.newUnitType)
	.subscribe(
	(res) => {
		this.unitTypesList.push(res.data)
		this.newUnitType = new UnitType()		
		this.alertService.success(this.msg3);
		this.getUnitTypes(1)
	},
	error => {
		if (error.error.message=="E11000"){
			this.alertService.error(this.msg1+" : "+this.newUnitType.designation);
		} else{
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
		}
	})

  }

  editUnitType(unitType: UnitType) {
    if(this.unitTypesList.includes(unitType)){
      if(!this.editUnitTypes.includes(unitType)){
        this.editUnitTypes.push(unitType)
      }else{
        this.editUnitTypes.splice(this.editUnitTypes.indexOf(unitType), 1)
        this.unitTypeService.editUnitType(unitType).subscribe(res => {
			
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editUnitType(unitType)
        })
      }
    }
  }

  submitUnitType(event, unitType:UnitType){
    if(event.keyCode ==13){
      this.editUnitType(unitType)
    }
  }

  deleteUnitType(unitType: UnitType) {
    this.unitTypeService.deleteUnitType(unitType._id,unitType.designation).subscribe(res => {
	  //this.alertService.success("Succesfully Deleted UnitType");	
      this.unitTypesList.splice(this.unitTypesList.indexOf(unitType), 1)
    }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
	goBack(): void {
		this.location.back();
	}
	
  title = 'unitType';


}
