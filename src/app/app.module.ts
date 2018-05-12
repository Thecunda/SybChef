import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChartModule } from 'angular-highcharts';

import { RoutingModule } from "./app.routing";
import { UserService } from './services/user.service';
import { AuthentificationService } from "./services/authentification.service";
import { AuthService } from "./services/auth.service";
import { AlerteService } from "./services/alerte.service";
import { HeadersService } from "./services/headers.service";
import { AlertComponent } from "./alert/alert.component";
import { RootComponent } from './root/root';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './users/users';
import { OrderByPipe } from './directives/orderBy.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// define your own components here //
import { UnitTypeService } from './syb.chef/unitTypes/unitTypes.service';
import { UnitTypeComponent } from './syb.chef/unitTypes/unitTypes';
import { UnitTypeFilterPipe } from './syb.chef/unitTypes/unitTypes.filter';

import { UnitService } from './syb.chef/unitTypes/units.service';
import { UnitComponent } from './syb.chef/unitTypes/units';
import { UnitFilterPipe } from './syb.chef/unitTypes/units.filter';

import { IngredientService } from './syb.chef/ingredients/ingredients.service';
import { IngredientComponent } from './syb.chef/ingredients/ingredients';
import { IngredientFilterPipe } from './syb.chef/ingredients/ingredients.filter';

import { RecipeService } from './syb.chef/recipes/recipes.service';
import { RecipeComponent } from './syb.chef/recipes/recipes';
import { RecipeFilterPipe } from './syb.chef/recipes/recipes.filter';

import { RecipeCompoService } from './syb.chef/recipes/recipeCompos.service';
import { RecipeCompoComponent } from './syb.chef/recipes/recipeCompos';
import { RecipeCompoFilterPipe } from './syb.chef/recipes/recipeCompos.filter';

import { RecipePrepaService } from './syb.chef/recipes/recipePrepas.service';
import { RecipePrepaComponent } from './syb.chef/recipes/recipePrepas';
import { RecipePrepaFilterPipe } from './syb.chef/recipes/recipePrepas.filter';

import { MenuGroupService } from './syb.chef/menuGroups/menuGroups.service';
import { MenuGroupComponent } from './syb.chef/menuGroups/menuGroups';
import { MenuGroupFilterPipe } from './syb.chef/menuGroups/menuGroups.filter';

import { MenuService } from './syb.chef/menuGroups/menus.service';
import { MenuComponent } from './syb.chef/menuGroups/menus';
import { MenuFilterPipe } from './syb.chef/menuGroups/menus.filter';

import { MenuGroupApproService } from './syb.chef/menuGroups/menuGroupAppros.service';
import { MenuGroupApproComponent } from './syb.chef/menuGroups/menuGroupAppros';
import { MenuGroupApproFilterPipe } from './syb.chef/menuGroups/menuGroupAppros.filter';

// ******************************* //

//number french style
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
// end internationalization

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}

@NgModule({
	declarations: [
		AlertComponent,
		RootComponent,

		UserComponent,
		OrderByPipe,
		
		NavbarComponent,
		LoginComponent,
		HomeComponent,
		NotFoundComponent,

		UnitComponent,
		UnitFilterPipe,
		
		UnitTypeComponent,
		UnitTypeFilterPipe,
		
		IngredientComponent,
		IngredientFilterPipe,
		
		RecipeComponent,
		RecipeFilterPipe,
		
		RecipeCompoComponent,
		RecipeCompoFilterPipe,
		
		RecipePrepaComponent,
		RecipePrepaFilterPipe,
		
		MenuGroupComponent,
		MenuGroupFilterPipe,
		
		MenuComponent,
		MenuFilterPipe,
		
		MenuGroupApproComponent,
		MenuGroupApproFilterPipe,
	
// ******************************* //		
		
		
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		JsonpModule,
		FormsModule,
		RouterModule,
		RoutingModule,
		ChartModule,

		NgbModule.forRoot (),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		AuthService,
		AuthentificationService,
		AlerteService,
		HeadersService,
		UserService,
		
		UnitTypeService,
		UnitTypeFilterPipe,

		UnitService,
		UnitFilterPipe,

		IngredientService,
		IngredientFilterPipe,

		RecipeService,
		RecipeFilterPipe,

		RecipeCompoService,
		RecipeCompoFilterPipe,

		RecipePrepaService,
		RecipePrepaFilterPipe,
		
		MenuGroupService,
		MenuGroupFilterPipe,
		
		MenuService,
		MenuFilterPipe,
		
		MenuGroupApproService,
		MenuGroupApproFilterPipe,		

// ******************************* //		

		
	],
	bootstrap: [RootComponent]
})
export class AppModule { }
