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
let badUrl = '
  haha nope
';
let goodUrl = '
  https://www.budgetbytes.com/wp-content/uploads/2020/06/BBQ-Chicken-Pizza-V2.jpg
';
*/
$photoInput.addEventListener('input', function (event) {
  const $eventTarget = event.target;
  if (checkUrl($eventTarget.value)) {
    $image.src = $eventTarget.value;
  } else {
    $image.src = 'images/placeholder-image-square.jpg';
  }
});
/*
$saveButton.addEventListener('submit', function(event: Event){
  event.preventDefault();
});
*/
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let $formElements = $entryForm.elements;
  //if (!$formElements) throw new Error('$formElements missing');
  console.log('$formElements: ', $formElements);
  let formData = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
  };
  console.log('formData: ', formData);
});
// 1:11  error  'data' is defined but never used  @typescript-eslint/no-unused-vars
const false_ = false;
if (false_) console.log(data);
