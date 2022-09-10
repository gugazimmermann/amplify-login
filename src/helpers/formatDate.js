import moment from "moment";

const Show = (date, locale) => {
  if (locale === "pt-BR")
    return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
  return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
};

const Format = (date, locale) => {
  console.log(date, locale);
  if (!date) return date;
  const currentValue = date.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;
  const formated =
    locale === "pt-BR"
      ? formatDDMMYYYY(cvLength, currentValue)
      : formatYYYYMMDD(cvLength, currentValue);
  return formated;
};

const formatDDMMYYYY = (cvLength, currentValue) => {
  if (cvLength < 2) return currentValue;
  if (cvLength < 4)
    return `${currentValue.slice(0, 2)}/${currentValue.slice(2)}`;
  return `${currentValue.slice(0, 2)}/${currentValue.slice(
    2,
    4
  )}/${currentValue.slice(4, 8)}`;
};

const formatYYYYMMDD = (cvLength, currentValue) => {
  if (cvLength < 4) return currentValue;
  if (cvLength < 5)
    return `${currentValue.slice(0, 4)}-${currentValue.slice(5)}`;
  return `${currentValue.slice(0, 4)}-${currentValue.slice(
    4,
    6
  )}-${currentValue.slice(6, 8)}`;
};

const FormatDate = { Show, Format };

export default FormatDate;
