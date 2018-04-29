import {
  isFuture,
  isDate,
  isValid,
  differenceInYears,
  parse,
  format
} from "date-fns";
export const isValidDate = (val: string): boolean => {
  const date = parse(val);
  return (
    isDate(date) &&
    isValid(date) &&
    !isFuture(date) &&
    differenceInYears(Date.now(), date) < 150
  );
};

export const toDate = (date: Date) => {
  return format(date, "YYYY-MM-DD");
};
