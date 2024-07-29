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
function renderEntry(entry) {
  let $listItem = document.createElement('li');
  let $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  let $imageHalf = document.createElement('div');
  $imageHalf.setAttribute('class', 'column-half');
  let $image = document.createElement('img');
  $image.src = entry.photoUrl;
  let $textHalf = document.createElement('div');
  $textHalf.setAttribute('class', 'column-half');
  let $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  let $p = document.createElement('p');
  $p.textContent = entry.notes;
  $listItem.append($row);
  $imageHalf.append($image);
  $textHalf.append($h3, $p);
  $row.append($imageHalf, $textHalf);
  return $listItem;
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
let d = {
  title: 'Mushroom Pizza',
  photoUrl:
    'https://www.acouplecooks.com/wp-content/uploads/2019/06/Mushroom-Pizza-with-Herbs-011.jpg',
  notes: 'Tasty, so very tasty.',
  entryId: 0,
};
let $ul = document.querySelector('ul');
$ul?.appendChild(renderEntry(d));
