export const discussionKeys = {
  all: ['discussions'],
  detail: (id: string) => [...discussionKeys.all, id],
};