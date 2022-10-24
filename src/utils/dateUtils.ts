//TODO date-fns로 바꿀지 고민하기
//Data 객체를 주면 "YYYY-MM-DD" 형식으로 변경해서 string 반환
export const convertDateToString = (date: Date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
};

export const addMonthDate = (date: Date, num: number): Date => {
  //month증가
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + num);
  return newDate;
};

export const addDate = (date: Date, day: number): Date => {
  //date증가
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

export const getDateDiff = (d1: Date, d2: Date): number => {
  //며칠 차이나는지 확인
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() / 1000 - date2.getTime() / 1000;

  return Math.floor(Math.abs(diffDate / (60 * 60 * 24))); // 초 * 분 * 시 = 일
};
