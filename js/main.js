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
const defaultImageUrl = 'images/placeholder-image-square.jpg';
const $image = document.querySelector('img#entry-photo');
if (!$image) throw new Error('$image missing');
const $photoInput = document.querySelector('input#photo-url-input');
if (!$photoInput) throw new Error('$photoInput missing');
const $entryForm = document.querySelector('form#entry-form');
if (!$entryForm) throw new Error('$entryForm missing');
$photoInput.addEventListener('input', function (event) {
  const $eventTarget = event.target;
  if (checkUrl($eventTarget.value)) {
    $image.src = $eventTarget.value;
  } else {
    $image.src = defaultImageUrl;
  }
});
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $formElements = $entryForm.elements;
  const entryData = {
    title: $formElements.title.value,
    photoUrl: $formElements.photoUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entryData);
  $image.src = defaultImageUrl;
  writeData();
  $entryForm.reset();
});
