import { Response } from '@angular/http';
import { UserService } from '../services/user.service';
import User from '../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AlerteService } from "../services/alerte.service";
import { TranslateService } from '@ngx-translate/core';

import * as config from '../app.config';

@Component({
  selector: 'users-root',
  templateUrl: './users.html',
  styleUrls: ['../app.component.scss']
})
export class UserComponent implements OnInit {
	
	currentUser: User;
	langs: Array<any>;
	
	constructor(
		private userService: UserService,
		private alertService: AlerteService,
		private translate: TranslateService) { 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);		
		}

	msg1 : string
	msg2 : string
	msg3 : string
	msg4 : string
	msg5 : string
	dummy=this.transMessages()	  
  public newUser: User = new User()

  usersList: User[];
  editUsers: User[] = [];
  currentPage: Number; // curent pages for data retrieved data by mongoose-paginate
  totPages: Number; // Total number of pages for data retrieved data by mongoose-paginate

  ngOnInit(): void {
	this.langs=[]
	for (let i = 0; i < config.appConfig.langs.length ; i++) {
		this.langs.push(config.appConfig.langs[i])
	}
	this.getUsers(1) //load first page of 10 results
  }
  
  transMessages(){
	this.translate.get("ERRORS.ERR01").subscribe((trad) => {this.msg1=trad})
	this.translate.get("ERRORS.ERR03").subscribe((trad) => {this.msg3=trad})
	this.translate.get("ERRORS.ERR05").subscribe((trad) => {this.msg5=trad})
  }

  getUsers(page) {
    this.userService.getUsers(page)
      .subscribe(data => {
		this.usersList = data.docs
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
    this.userService.createUser(this.newUser)
      .subscribe(
		(res) => {
			this.usersList.push(res.data)
			this.newUser = new User()
			this.alertService.success(this.msg3);;
		},
			error => {
				if (error.error.message=="11000"){
					this.alertService.error(this.msg1+" : "+this.newUser.username);
				} else{
					this.alertService.error("SYSTEM ERROR : " + error.error.message);
				}
		})
  }

  editUser(user: User) {
    if(this.usersList.includes(user)){
      if(!this.editUsers.includes(user)){
        this.editUsers.push(user)
      }else{
        this.editUsers.splice(this.editUsers.indexOf(user), 1)
        this.userService.editUser(user).subscribe(res => {
		this.alertService.success(this.msg3);;
        }, error => {
			this.alertService.error(error.error.message);
			this.editUser(user)
        })
      }
    }
  }

  submitUser(event, user:User){
    if(event.keyCode ==13){
      this.editUser(user)
    }
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user._id).subscribe(res => {
	  this.alertService.success(this.msg3);;	
      this.usersList.splice(this.usersList.indexOf(user), 1)
    }, error => {
			this.alertService.error(error.error.message);
        })
  }


  title = 'user';


}
