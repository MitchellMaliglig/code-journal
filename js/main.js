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
  const $listItem = document.createElement('li');
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  const $imageHalf = document.createElement('div');
  $imageHalf.setAttribute('class', 'column-half');
  const $image = document.createElement('img');
  $image.src = entry.photoUrl;
  const $textHalf = document.createElement('div');
  $textHalf.setAttribute('class', 'column-half');
  const $h3 = document.createElement('h3');
  $h3.textContent = entry.title;
  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $listItem.append($row);
  $imageHalf.append($image);
  $textHalf.append($h3, $p);
  $row.append($imageHalf, $textHalf);
  return $listItem;
}
function toggleNoEntries() {
  if ($noEntriesText.className === 'no-entries') {
    $noEntriesText.className = 'no-entries hidden';
  } else {
    $noEntriesText.className = 'no-entries';
  }
}
const defaultImageUrl = 'images/placeholder-image-square.jpg';
const $image = document.querySelector('img#entry-photo');
if (!$image) throw new Error('$image missing');
const $photoInput = document.querySelector('input#photo-url-input');
if (!$photoInput) throw new Error('$photoInput missing');
const $entryForm = document.querySelector('form#entry-form');
if (!$entryForm) throw new Error('$entryForm missing');
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul missing');
const $noEntriesText = document.querySelector('h2.no-entries');
if (!$noEntriesText) throw new Error('$noEntriesText missing');
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
document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntry(data.entries[i]));
  }
  // remove?
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
});
