//date를 입력받으면 ISO포맷의 문자열을 만들어주는 함수임

export const convertDateToString = (date: Date): string => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
};

export const addMonthDate = (date: Date, num: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + num);
  return newDate;
};

export const addDate = (date: Date, day: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};
