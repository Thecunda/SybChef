import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import User from '../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import * as config from '../app.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../app.component.scss']
})

export class NavbarComponent implements OnInit {

	currentUser: User;
	users: User[] = [];
	url:string ="";
	
	constructor(
		private userService: UserService,
		private translate: TranslateService
	){		 
		this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		translate.setDefaultLang('en');
		translate.use(this.currentUser.lang);
	}
	
	ngOnInit() {

	}

}
