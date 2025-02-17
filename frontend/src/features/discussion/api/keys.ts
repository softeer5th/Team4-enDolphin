export const discussionKeys = {
  all: ['discussions'],
  detail: (id: string) => [...discussionKeys.all, id],
};

export const calendarKeys = {
  all: ['calendars'],
  detail: (id: string) => [...calendarKeys.all, id],
};