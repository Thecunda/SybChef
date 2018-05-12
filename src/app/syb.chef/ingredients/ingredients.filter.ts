import { Pipe, PipeTransform } from '@angular/core';

import Ingredient from './ingredients.model';

@Pipe({
    name: 'ingredientsfilter',
    pure: false
})
export class IngredientFilterPipe implements PipeTransform {
  transform(items: Ingredient[], filter: Ingredient): Ingredient[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Ingredient) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
   
    applyFilter(ingredient: Ingredient, filter: Ingredient): boolean {
    for (let field in filter) {
		
      if (filter[field]) {
		if (ingredient[field].indexOf(filter[field]) === -1) {
            return false;
          }
      }
    }
    return true;
  }
}