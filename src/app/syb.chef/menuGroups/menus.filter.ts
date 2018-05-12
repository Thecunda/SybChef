import { Pipe, PipeTransform } from '@angular/core';

import Menu from './menus.model';

@Pipe({
    name: 'menusfilter',
    pure: false
})
export class MenuFilterPipe implements PipeTransform {
  transform(items: Menu[], filter: Menu): Menu[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Menu) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
   
    applyFilter(menu: Menu, filter: Menu): boolean {
    for (let field in filter) {
		
      if (filter[field]) {
		if (menu[field].indexOf(filter[field]) === -1) {
            return false;
          }
      }
    }
    return true;
  }
}