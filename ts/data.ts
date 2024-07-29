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
  editing: null;
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

const data: Data = readData();

// 19:10  error  'writeData' is defined but never used  @typescript-eslint/no-unused-vars
const false_ = false;
if (false_) {
  writeData();
}
