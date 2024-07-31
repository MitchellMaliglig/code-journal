/* exported data */

interface EntryData {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

interface Data {
  view: string;
  entries: EntryData[];
  editing: EntryData | null;
  nextEntryId: number;
}

const entryKey = 'entry-data-key';

function writeData(): void {
  const json = JSON.stringify(data);
  localStorage.setItem(entryKey, json);
}

function readData(): Data {
  const json = localStorage.getItem(entryKey);

  if (json !== null) {
    return JSON.parse(json);
  } else {
    return {
      view: 'entry-form',
      entries: [] as EntryData[],
      editing: null,
      nextEntryId: 1,
    };
  }
}

function getEntry(id: number): EntryData | null {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === id) {
      return data.entries[i];
    }
  }
  return null;
}

function replaceEntry(entry: EntryData | null): void {
  if (entry !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entry.entryId) {
        data.entries[i] = entry;
        break;
      }
    }
  }
}

function removeEntry(entry: EntryData | null): void {
  if (entry !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entry.entryId) {
        data.entries.splice(i, 1);
        break;
      }
    }
  }
}

const data: Data = readData();

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
