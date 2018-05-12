import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';										 
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { MenuGroupService } from './menuGroups.service';
import MenuGroup from './menuGroups.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../../services/alerte.service";
import User from '../../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'menuGroups-root',
  templateUrl: './menuGroups.html',
  styleUrls: ['../../app.component.scss']
})
export class MenuGroupComponent implements OnInit {
	
	currentUser: User;
	
	constructor(
		private route: ActivatedRoute,
		private menuGroupService: MenuGroupService,
		private alertService: AlerteService,
		private location: Location,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
			
		}
	filter: MenuGroup = new MenuGroup();
	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
    dummy=this.transMessages()
	
  public newMenuGroup: MenuGroup = new MenuGroup()
  
  menuGroupsList: MenuGroup[];
  editMenuGroups: MenuGroup[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate
  
  ngOnInit(): void {
	  this.getMenuGroups(1) //load first page of 10 results
		
  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

  getMenuGroups(page) {
	 
    this.menuGroupService.getMenuGroups(page)
      .subscribe(data => {		
		this.menuGroupsList = data.docs
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
		}
	)
  }
  
  create() {
	this.menuGroupService.createMenuGroup(this.newMenuGroup)
	.subscribe(
	(res) => {
		this.menuGroupsList.push(res.data)
		this.newMenuGroup = new MenuGroup()	
		this.alertService.success(this.msg3);
		this.getMenuGroups(1)
	},
	error => {
		if (error.error.message=="E11000"){
			this.alertService.error(this.msg1+" : "+this.newMenuGroup.designation);
		} else{
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
		}
	})

  }

  editMenuGroup(menuGroup: MenuGroup) {
    if(this.menuGroupsList.includes(menuGroup)){
      if(!this.editMenuGroups.includes(menuGroup)){
        this.editMenuGroups.push(menuGroup)
      }else{
        this.editMenuGroups.splice(this.editMenuGroups.indexOf(menuGroup), 1)
        this.menuGroupService.editMenuGroup(menuGroup).subscribe(res => {
			this.alertService.success(this.msg3);
        }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
			this.editMenuGroup(menuGroup)
        })
      }
    }
  }

  submitMenuGroup(event, menuGroup:MenuGroup){
    if(event.keyCode ==13){
      this.editMenuGroup(menuGroup)
    }
  }

  deleteMenuGroup(menuGroup: MenuGroup) {
    this.menuGroupService.deleteMenuGroup(menuGroup._id).subscribe(res => {
	  this.alertService.success(this.msg3);	
      this.menuGroupsList.splice(this.menuGroupsList.indexOf(menuGroup), 1)
    }, error => {
			this.alertService.error("SYSTEM ERROR : " + error.error.message);
        })
  }
  
	goBack(): void {
		this.location.back();
	}
	
  title = 'menuGroup';


}
