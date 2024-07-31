/* global data */

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

function checkUrl(str: string): boolean {
  let url: URL;

  try {
    url = new URL(str);
  } catch {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

function renderEntry(entry: EntryData): HTMLLIElement {
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

function toggleNoEntries(): void {
  if ($noEntriesText.className === 'no-entries') {
    $noEntriesText.className = 'no-entries hidden';
  } else {
    $noEntriesText.className = 'no-entries';
  }
}

function viewSwap(view: string): void {
  if (view === 'entries' || view === 'entry-form') {
    if (view === 'entries') {
      $dataViewEntries.className = '';
      $dataViewEntryForm.className = 'hidden';
    } else if (view === 'entry-form') {
      $dataViewEntries.className = 'hidden';
      $dataViewEntryForm.className = '';
    }
    data.view = view;
    // show the view which was displayed prior to page refresh.
    writeData();
  }
}

const defaultImageUrl = 'images/placeholder-image-square.jpg';

const $image = document.querySelector('img#entry-photo') as HTMLImageElement;
if (!$image) throw new Error('$image missing');

const $titleInput = document.querySelector(
  'input#title-input',
) as HTMLInputElement;
if (!$titleInput) throw new Error('$titleInput missing');

const $photoInput = document.querySelector(
  'input#photo-url-input',
) as HTMLInputElement;
if (!$photoInput) throw new Error('$photoInput missing');

const $notesTextArea = document.querySelector(
  'textarea#notes-textarea',
) as HTMLTextAreaElement;
if (!$notesTextArea) throw new Error('$notesTextArea missing');

const $entryForm = document.querySelector('form#entry-form') as HTMLFormElement;
if (!$entryForm) throw new Error('$entryForm missing');

const $ul = document.querySelector('ul') as HTMLUListElement;
if (!$ul) throw new Error('$ul missing');

const $noEntriesText = document.querySelector(
  'h2.no-entries',
) as HTMLHeadingElement;
if (!$noEntriesText) throw new Error('$noEntriesText missing');

const $dataViewEntryForm = document.querySelector(
  "div[data-view='entry-form']",
) as HTMLDivElement;
if (!$dataViewEntryForm) throw new Error('missing $dataViewEntryForm');

const $dataViewEntries = document.querySelector(
  "div[data-view='entries']",
) as HTMLDivElement;
if (!$dataViewEntries) throw new Error('missing $dataViewEntries');

const $entriesAnchor = document.querySelector('a.entries') as HTMLAnchorElement;
if (!$entriesAnchor) throw new Error('missing $entriesAnchor');

const $newAnchor = document.querySelector('a.new') as HTMLAnchorElement;
if (!$newAnchor) throw new Error('$newAnchor missing');

const $entryFormHeader = document.querySelector(
  'h2.entry-form-header',
) as HTMLHeadingElement;
if (!$entryFormHeader) throw new Error('$entryFormHeader missing');

$photoInput.addEventListener('input', function (event: Event) {
  const $eventTarget = event.target as HTMLInputElement;

  if (checkUrl($eventTarget.value)) {
    $image.src = $eventTarget.value;
  } else {
    $image.src = defaultImageUrl;
  }
});

$entryForm.addEventListener('submit', function (event: Event) {
  event.preventDefault();
  const $formElements = $entryForm.elements as FormElements;

  const entryData: EntryData = {
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
    ) as HTMLLIElement;

    $ul.insertBefore(renderEntry(entryData), $li);
    $li.remove();

    $entryFormHeader.textContent = 'New Entry';
    data.editing = null;
  }

  viewSwap('entries');
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
});

$newAnchor.addEventListener('click', function () {
  viewSwap('entry-form');
});

$ul.addEventListener('click', function (event: Event) {
  const $eventTarget = event.target as HTMLElement;
  const $li = $eventTarget.closest('li') as HTMLLIElement;

  if ($eventTarget.tagName === 'I') {
    viewSwap('entry-form');

    const id: number = Number($li.getAttribute('data-entry-id'));
    data.editing = getEntry(id) as EntryData;

    $image.src = data.editing.photoUrl;
    $titleInput.value = data.editing.title;
    $photoInput.value = data.editing.photoUrl;
    $notesTextArea.value = data.editing.notes;

    $entryFormHeader.textContent = 'Edit Entry';
  }
});
