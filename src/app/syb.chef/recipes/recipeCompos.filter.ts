import { Pipe, PipeTransform } from '@angular/core';

import RecipeCompo from './recipeCompos.model';

@Pipe({
    name: 'recipeComposfilter',
    pure: false
})
export class RecipeCompoFilterPipe implements PipeTransform {
  transform(items: RecipeCompo[], filter: RecipeCompo): RecipeCompo[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: RecipeCompo) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
   
    applyFilter(recipeCompo: RecipeCompo, filter: RecipeCompo): boolean {
    for (let field in filter) {
		
      if (filter[field]) {
		if (recipeCompo[field].indexOf(filter[field]) === -1) {
            return false;
          }
      }
    }
    return true;
  }
}