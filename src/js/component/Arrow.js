/**
 * arrow
 */

const Arrow = () => (
  $(`<div class="arrow">
    ${Line()}
    ${Direction()}
  </div>`)
);

const Line = () => (
  `<div class="line"/>`
);

const Direction = () => (
  `<div class="direction"/>`
);

export default Arrow;
