import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './users/users';
import { AuthService } from "./services/auth.service";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

// sample modeles are defined here //
/*import { TypeMatComponent } from './syb.modele/typeMats/typeMats';
import { MaterialComponent } from './syb.modele/typeMats/materials';*/
// ******************************* //

// define your own components here //
import { UnitTypeComponent } from './syb.chef/unitTypes/unitTypes';
import { UnitComponent } from './syb.chef/unitTypes/units';

import { IngredientComponent } from './syb.chef/ingredients/ingredients';

import { RecipeComponent } from './syb.chef/recipes/recipes';
import { RecipeCompoComponent } from './syb.chef/recipes/recipeCompos';
import { RecipePrepaComponent } from './syb.chef/recipes/recipePrepas';

import { MenuGroupComponent } from './syb.chef/menuGroups/menuGroups';
import { MenuGroupApproComponent } from './syb.chef/menuGroups/menuGroupAppros';
import { MenuComponent } from './syb.chef/menuGroups/menus';

// ******************************* //

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthService] },
	{ path: 'login', component: LoginComponent },
	{ path: 'users', component: UserComponent },

// define your own components here //
	{ path: 'unitTypes', component: UnitTypeComponent },
	{ path: 'units/:idUnitType', component: UnitComponent },	
	{ path: 'ingredients', component: IngredientComponent },
	{ path: 'recipes', component: RecipeComponent },
	{ path: 'recipeCompos/:idRecipe', component: RecipeCompoComponent },
	{ path: 'recipePrepas/:idRecipe', component: RecipePrepaComponent },
	{ path: 'menuGroups', component: MenuGroupComponent },
	{ path: 'menuGroupAppros/:idMenuGroup', component: MenuGroupApproComponent },
	{ path: 'menus/:idMenuGroup', component: MenuComponent },
	
// ******************************* //

	{ path: 'notfound', component: NotFoundComponent },
	{ path: '**', redirectTo: 'notfound' },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: false } ) ],
	exports: [ RouterModule ]
})
export class RoutingModule {}


