'use strict';
/* exported data */
const entryKey = 'entry-data-key';
function writeData() {
  const json = JSON.stringify(data);
  localStorage.setItem(entryKey, json);
}
function readData() {
  const json = localStorage.getItem(entryKey);
  if (json !== null) {
    return JSON.parse(json);
  } else {
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  }
}
function getEntry(id) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === id) {
      return data.entries[i];
    }
  }
  return null;
}
function replaceEntry(entry) {
  if (entry !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entry.entryId) {
        data.entries[i] = entry;
        break;
      }
    }
  }
}
function removeEntry(entry) {
  if (entry !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entry.entryId) {
        data.entries.splice(i, 1);
        break;
      }
    }
  }
}
const data = readData();
// 19:10  error  'writeData' is defined but never used  @typescript-eslint/no-unused-vars
// 39:10  error  'getEntry' is defined but never used  @typescript-eslint/no-unused-vars
// 48:10  error  'replaceEntry' is defined but never used  @typescript-eslint/no-unused-vars
// 59:10  error  'removeEntry' is defined but never used  @typescript-eslint/no-unused-vars
const false_ = false;
if (false_) {
  writeData();
  getEntry(1);
  replaceEntry({ title: '', photoUrl: '', notes: '', entryId: 0 });
  removeEntry({ title: '', photoUrl: '', notes: '', entryId: 0 });
}
