export const discussionKeys = {
  all: ['discussions'],
  detail: (id: number) => [...discussionKeys.all, id],
};