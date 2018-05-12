import { Pipe, PipeTransform } from '@angular/core';

import UnitType from './unitTypes.model';

@Pipe({
    name: 'unitTypesfilter',
    pure: false
})
export class UnitTypeFilterPipe implements PipeTransform {
  transform(items: UnitType[], filter: UnitType): UnitType[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: UnitType) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
   
    applyFilter(unitType: UnitType, filter: UnitType): boolean {
    for (let field in filter) {
		
      if (filter[field]) {
		if (unitType[field].indexOf(filter[field]) === -1) {
            return false;
          }
      }
    }
    return true;
  }
}