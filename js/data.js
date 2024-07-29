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
const data = readData();
// 19:10  error  'writeData' is defined but never used  @typescript-eslint/no-unused-vars
const false_ = false;
if (false_) {
  writeData();
}
