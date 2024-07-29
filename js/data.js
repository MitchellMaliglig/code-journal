'use strict';
/* exported data */
let entryKey = 'entry-data-key';
function writeData() {
  let json = JSON.stringify(data);
  localStorage.setItem(entryKey, json);
}
function readData() {
  let json = localStorage.getItem(entryKey);
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
let data = readData();
