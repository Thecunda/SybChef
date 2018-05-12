import { Pipe, PipeTransform } from '@angular/core';

import Unit from './units.model';

@Pipe({
    name: 'unitsfilter',
    pure: false
})
export class UnitFilterPipe implements PipeTransform {
  transform(items: Unit[], filter: Unit): Unit[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Unit) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
   
    applyFilter(unit: Unit, filter: Unit): boolean {
    for (let field in filter) {
		
      if (filter[field]) {
		if (unit[field].indexOf(filter[field]) === -1) {
            return false;
          }
      }
    }
    return true;
  }
}