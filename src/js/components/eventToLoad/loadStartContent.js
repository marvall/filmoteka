import { checkNavigation } from '../nav/checkNavigation';
import { State } from '../../utils/state';

/**
 * This callback function for event DOMContentLoaded.
 * The function are checking current page from LocalStorage
 *  and return to Navigations function.
 * @param {evet} e
 */
export const loadStartContent = function (e) {
  e.preventDefault();
  State.checkState();
  checkNavigation(e);
};
