/**
 * This function manage spinner, takes on values: start or stop
 * @param {string} value
 */
export const spinner = function (value) {
  const spinner = {
    spinnerRef: document.querySelector('[data-index="spinner"]'),

    markup: `<div class="loading">Loading</div>
      <div class="spinner-row">
        <div class="arrow up outer outer-18"></div>
        <div class="arrow down outer outer-17"></div>
        <div class="arrow up outer outer-16"></div>
        <div class="arrow down outer outer-15"></div>
        <div class="arrow up outer outer-14"></div>
      </div>
      <div class="spinner-row">
        <div class="arrow up outer outer-1"></div>
        <div class="arrow down outer outer-2"></div>
        <div class="arrow up inner inner-6"></div>
        <div class="arrow down inner inner-5"></div>
        <div class="arrow up inner inner-4"></div>
        <div class="arrow down outer outer-13"></div>
        <div class="arrow up outer outer-12"></div>
      </div>
      <div class="spinner-row">
        <div class="arrow down outer outer-3"></div>
        <div class="arrow up outer outer-4"></div>
        <div class="arrow down inner inner-1"></div>
        <div class="arrow up inner inner-2"></div>
        <div class="arrow down inner inner-3"></div>
        <div class="arrow up outer outer-11"></div>
        <div class="arrow down outer outer-10"></div>
      </div>
      <div class="spinner-row">
        <div class="arrow down outer outer-5"></div>
        <div class="arrow up outer outer-6"></div>
        <div class="arrow down outer outer-7"></div>
        <div class="arrow up outer outer-8"></div>
        <div class="arrow down outer outer-9"></div>
      </div>`,

    show() {
      this.spinnerRef.innerHTML = '';
      this.spinnerRef.insertAdjacentHTML('beforeend', this.markup);
    },

    hide() {
      this.spinnerRef.innerHTML = '';
    },
  };
  if (value === 'start') {
    spinner.show();
  } else if (value === 'stop') {
    setTimeout(() => {
      spinner.hide();
    }, 1000);
  }
};
