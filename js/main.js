'use strict';
/* global data */
function checkUrl(str) {
  let url;
  try {
    url = new URL(str);
  } catch {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}
let defaultImageUrl = 'images/placeholder-image-square.jpg';
const $image = document.querySelector('img#entry-photo');
if (!$image) throw new Error('$image missing');
console.log('$image: ', $image);
const $photoInput = document.querySelector('input#photo-url-input');
if (!$photoInput) throw new Error('$photoInput missing');
console.log('$photoInput: ', $photoInput);
const $saveButton = document.querySelector('button#save-button');
if (!$saveButton) throw new Error('$saveButton missing');
console.log('$saveButton: ', $saveButton);
const $entryForm = document.querySelector('form#entry-form');
if (!$entryForm) throw new Error('$entryForm missing');
console.log('$entryForm: ', $entryForm);
/*
  https://www.budgetbytes.com/wp-content/uploads/2020/06/BBQ-Chicken-Pizza-V2.jpg
  https://cookingformysoul.com/wp-content/uploads/2021/04/easy-homemade-hawaiian-pizza-min-768x1152.jpg
  https://www.acouplecooks.com/wp-content/uploads/2019/06/Mushroom-Pizza-with-Herbs-011.jpg
*/
$photoInput.addEventListener('input', function (event) {
  const $eventTarget = event.target;
  if (checkUrl($eventTarget.value)) {
    $image.src = $eventTarget.value;
  } else {
    $image.src = defaultImageUrl;
  }
});
/*
$saveButton.addEventListener('submit', function(event: Event){
  event.preventDefault();
});
*/
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $formElements = $entryForm.elements;
  // if (!$formElements) throw new Error('$formElements missing');
  // console.log('$formElements: ', $formElements);
  const entryData = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entryData);
  console.log('data.entries: ', data.entries);
  console.log('formData: ', entryData);
  $image.src = defaultImageUrl;
  writeData();
  $entryForm.reset();
});
