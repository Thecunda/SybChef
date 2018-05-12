import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";

import { AuthentificationService } from "../services/authentification.service";
import { AlerteService } from "../services/alerte.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss']
})

export class LoginComponent implements OnInit {
	
    //[x: string]: any;

    model: any = {};
    loading = false;
    returnUrl: string;
	language: string;
	
	
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authentificationService: AuthentificationService,
        private alertService: AlerteService,
		private translate: TranslateService){		
			 translate.setDefaultLang('en');
			 translate.use('en');
		}
	
	switchLanguage(lang) {
		this.language=lang;
		this.translate.use(this.language);
	}	

    ngOnInit() {
		this.switchLanguage('fr')
        // reset login status
        this.authentificationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authentificationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
					if(error.error.message) {
						this.alertService.error(error.error.message);
					} else {
						this.alertService.error(error.message+ " / Possible cause is : API is not running" );
					}
                    this.loading = false;
                });
    }
}
