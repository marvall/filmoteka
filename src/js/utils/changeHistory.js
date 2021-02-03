/**
 * this function changes URL to "originURL" + address
 * final result, example: "http://localhost/address"
 * address takes values: "home" or "mylibery"
 * @param {string} address;
 */
export const changeHistory = function (address) {
  history.replaceState({}, '', '/');
  history.replaceState({}, '', address);
  window.dispatchEvent(new Event('changeHistoryEvent'));
};
