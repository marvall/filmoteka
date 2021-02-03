import { State } from './state';
/**
 * this function changes current page in State,
 * address takes values: "home" or "mylibrary"
 * @param {string} address;
 */
export const changeHistory = function (address) {
  State.saveState(address);
  window.dispatchEvent(new Event('changeHistoryEvent'));
};
