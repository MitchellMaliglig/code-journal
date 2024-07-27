/* exported data */

// let entries_ = [] as FormData[];

const data = {
  view: 'entry-form',
  entries: [] as {
    title: string;
    photoUrl: string;
    notes: string;
    entryId: number;
  }[],
  // entries: [] as FormData[],
  // entries: entries_,
  editing: null,
  nextEntryId: 1,
};

// 5:7  error  'data' is assigned a value but never used  @typescript-eslint/no-unused-vars
const false__ = false;
if (false__) console.log(data);
