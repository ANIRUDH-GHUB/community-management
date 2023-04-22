export const getDateTime = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};

export const fromToday = (date1: Date) => {
  const date2 = new Date();
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1 >= date2;
};
