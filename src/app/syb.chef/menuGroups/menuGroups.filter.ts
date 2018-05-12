import { Pipe, PipeTransform } from '@angular/core';

import MenuGroup from './menuGroups.model';

@Pipe({
    name: 'menuGroupsfilter',
    pure: false
})
export class MenuGroupFilterPipe implements PipeTransform {
  transform(items: MenuGroup[], filter: MenuGroup): MenuGroup[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: MenuGroup) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
   
    applyFilter(menuGroup: MenuGroup, filter: MenuGroup): boolean {
    for (let field in filter) {
		
      if (filter[field]) {
		if (menuGroup[field].indexOf(filter[field]) === -1) {
            return false;
          }
      }
    }
    return true;
  }
}