import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HelperFunctions {
  /**
   * Capitalize word
   * @param string word
   */
  capitalize(word: string): string {
    if (typeof word !== 'string') return '';
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  /**
   * Transform To Title Case.
   * @param str sentents
   */
  titleCase(str: string): string {
    return str.toLowerCase().split(' ').map(word => {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    }).join(' ');
  }
}
