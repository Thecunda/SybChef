import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser: User;
    usersList: User[] = [];

    constructor(        
		private userService: UserService,
		private translate: TranslateService){		 
			this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
			translate.setDefaultLang('en');
			translate.use(this.currentUser.lang);
		}


    ngOnInit() {
       
    }
	
}


 