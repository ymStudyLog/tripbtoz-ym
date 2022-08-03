//date를 입력받으면 ISO포맷의 문자열을 만들어주는 함수임

export const convertDateToString = (date: Date): string => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
};
