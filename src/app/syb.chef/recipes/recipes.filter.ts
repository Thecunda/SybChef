import { Pipe, PipeTransform } from '@angular/core';

import Recipe from './recipes.model';

@Pipe({
    name: 'recipesfilter',
    pure: false
})
export class RecipeFilterPipe implements PipeTransform {
  transform(items: Recipe[], filter: Recipe): Recipe[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Recipe) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
   
    applyFilter(recipe: Recipe, filter: Recipe): boolean {
    for (let field in filter) {
		
      if (filter[field]) {
		if (recipe[field].indexOf(filter[field]) === -1) {
            return false;
          }
      }
    }
    return true;
  }
}