// modèle from https://embed.plnkr.co/l1oTNT/
import { Pipe, PipeTransform } from '@angular/core';

import RecipePrepa from './recipePrepas.model';

@Pipe({
    name: 'recipePrepasfilter',
    pure: false
})
export class RecipePrepaFilterPipe implements PipeTransform {
  transform(items: RecipePrepa[], filter: RecipePrepa): RecipePrepa[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: RecipePrepa) => this.applyFilter(item, filter));
  }
   
    applyFilter(recipePrepa: RecipePrepa, filter: RecipePrepa): boolean {
    for (let field in filter) {
      if (filter[field]) {
		/*
		// Syntax for filter on string
		if (recipePrepa[field].indexOf(filter[field]) === -1) {
            return false;
         }*/
		 // Syntax for filter on number
		 if (recipePrepa[field] != filter[field]) {
            return false;
         }
      }
    }
    return true;
  }
}




