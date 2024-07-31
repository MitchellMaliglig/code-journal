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
  $listItem.setAttribute('data-entry-id', entry.entryId.toString());
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
  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');
  const $p = document.createElement('p');
  $p.textContent = entry.notes;
  $listItem.append($row);
  $imageHalf.append($image);
  $h3.append($pencilIcon);
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
function entryFormHeaderSwap(str) {
  if (str === 'New Entry') {
    $entryFormHeader.textContent = 'New Entry';
  } else if (str === 'Edit Entry') {
    $entryFormHeader.textContent = 'Edit Entry';
  }
}
function viewSwap(view) {
  if (view === 'entries' || view === 'entry-form') {
    if (view === 'entries') {
      $dataViewEntries.className = '';
      $dataViewEntryForm.className = 'hidden';
    } else if (view === 'entry-form') {
      $dataViewEntries.className = 'hidden';
      $dataViewEntryForm.className = '';
      // user loses edits if they go back to entries
      // without saving
      if (data.editing !== null) {
        $image.src = defaultImageUrl;
        entryFormHeaderSwap('New Entry');
        $entryForm.reset();
        data.editing = null;
      }
    }
    data.view = view;
    // show the view which was displayed prior to page refresh.
    writeData();
  }
}
function deleteModalSwap(str) {
  if (str === 'show') {
    $deleteModal.className = 'delete-modal';
  } else if (str === 'hide') {
    $deleteModal.className = 'delete-modal hidden';
  }
}
const defaultImageUrl = 'images/placeholder-image-square.jpg';
const $image = document.querySelector('img#entry-photo');
if (!$image) throw new Error('$image missing');
const $titleInput = document.querySelector('input#title-input');
if (!$titleInput) throw new Error('$titleInput missing');
const $photoInput = document.querySelector('input#photo-url-input');
if (!$photoInput) throw new Error('$photoInput missing');
const $notesTextArea = document.querySelector('textarea#notes-textarea');
if (!$notesTextArea) throw new Error('$notesTextArea missing');
const $entryForm = document.querySelector('form#entry-form');
if (!$entryForm) throw new Error('$entryForm missing');
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul missing');
const $noEntriesText = document.querySelector('h2.no-entries');
if (!$noEntriesText) throw new Error('$noEntriesText missing');
const $dataViewEntryForm = document.querySelector(
  "div[data-view='entry-form']",
);
if (!$dataViewEntryForm) throw new Error('missing $dataViewEntryForm');
const $dataViewEntries = document.querySelector("div[data-view='entries']");
if (!$dataViewEntries) throw new Error('missing $dataViewEntries');
const $entriesAnchor = document.querySelector('a.entries');
if (!$entriesAnchor) throw new Error('missing $entriesAnchor');
const $newAnchor = document.querySelector('a.new');
if (!$newAnchor) throw new Error('$newAnchor missing');
const $entryFormHeader = document.querySelector('h2.entry-form-header');
if (!$entryFormHeader) throw new Error('$entryFormHeader missing');
const $deleteModal = document.querySelector('a.delete-modal');
if (!$deleteModal) throw new Error('$deleteModal missing');
const $deleteCancel = document.querySelector('button.delete-cancel');
if (!$deleteCancel) throw new Error('$deleteCancel missing');
const $deleteConfirm = document.querySelector('button.delete-confirm');
if (!$deleteConfirm) throw new Error('$deleteConfirm missing');
const $deleteDialog = document.querySelector('dialog.delete-dialog');
if (!$deleteDialog) throw new Error('$deleteDialog');
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
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entryData);
    $image.src = defaultImageUrl;
    $ul.prepend(renderEntry(entryData));
    if (data.entries.length === 1) {
      toggleNoEntries();
    }
  } else {
    entryData.entryId = data.editing.entryId;
    replaceEntry(entryData);
    const $li = document.querySelector(
      `li[data-entry-id="${entryData.entryId}"]`,
    );
    $ul.insertBefore(renderEntry(entryData), $li);
    $li.remove();
    entryFormHeaderSwap('New Entry');
    data.editing = null;
  }
  viewSwap('entries');
  deleteModalSwap('hide');
  writeData();
  $image.src = defaultImageUrl;
  $entryForm.reset();
});
document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.append(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  if (data.entries.length > 0) {
    toggleNoEntries();
  }
});
$entriesAnchor.addEventListener('click', function () {
  viewSwap('entries');
  if (data.editing !== null) {
    deleteModalSwap('hide');
  }
});
$newAnchor.addEventListener('click', function () {
  viewSwap('entry-form');
});
$ul.addEventListener('click', function (event) {
  const $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    viewSwap('entry-form');
    deleteModalSwap('show');
    entryFormHeaderSwap('Edit Entry');
    const $li = $eventTarget.closest('li');
    const id = Number($li.getAttribute('data-entry-id'));
    data.editing = getEntry(id);
    $image.src = data.editing.photoUrl;
    $titleInput.value = data.editing.title;
    $photoInput.value = data.editing.photoUrl;
    $notesTextArea.value = data.editing.notes;
  }
});
$deleteModal.addEventListener('click', function () {
  $deleteDialog.showModal();
});
$deleteCancel.addEventListener('click', function () {
  $deleteDialog.close();
});
$deleteConfirm.addEventListener('click', function () {
  if (data.editing !== null) {
    removeEntry(data.editing);
    const $li = document.querySelector(
      `li[data-entry-id="${data.editing.entryId}"]`,
    );
    $li.remove();
    if (data.entries.length === 0) {
      toggleNoEntries();
    }
  }
  $deleteDialog.close();
  deleteModalSwap('hide');
  viewSwap('entries');
});
