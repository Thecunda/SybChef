// modèle from https://embed.plnkr.co/l1oTNT/
import { Pipe, PipeTransform } from '@angular/core';

import MenuGroupAppro from './menuGroupAppros.model';

@Pipe({
    name: 'menuGroupApprosfilter',
    pure: false
})
export class MenuGroupApproFilterPipe implements PipeTransform {
  transform(items: MenuGroupAppro[], filter: MenuGroupAppro): MenuGroupAppro[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: MenuGroupAppro) => this.applyFilter(item, filter));
  }
   
    applyFilter(menuGroupAppro: MenuGroupAppro, filter: MenuGroupAppro): boolean {
    for (let field in filter) {
      if (filter[field]) {
		
		// Syntax for filter on string
		if (menuGroupAppro[field].indexOf(filter[field]) === -1) {
            return false;
         }
		 // Syntax for filter on number
		/* if (menuGroupAppro[field] != filter[field]) {
            return false;
         }*/
      }
    }
    return true;
  }
}




