export const dateSort = (dateString1: string, dateString2: string) => {
  return new Date(dateString1).valueOf() - new Date(dateString2).valueOf();
};
