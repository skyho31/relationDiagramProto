/**
 * Object Box
 * @param {string} objectTypeName
 * @param {string} description
 */

const basicBox = (objectTypeName, description) => (
  $(`<div class="objectBox">
    ${basicTitle(objectTypeName)}
    ${basicDescription(description)}
  </div>`)
);

const basicTitle = (objectTypeName) => (
  `<div class="title">${objectTypeName}</div>`
);


const basicDescription = (description) => (
  `<div class="description">${description}</div>`
);

export default basicBox;
