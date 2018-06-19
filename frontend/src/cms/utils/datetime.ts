export const dateFormat = "L";
export const timeFormat = "LT"

export const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
];

export const months = [
  "January", "February", "March", "April", "May", "Juni",
  "July", "August", "September", "October", "November", "December"
];

export const month_indices = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
];

export const years = [];
for (let i = 1899; i <= new Date().getFullYear(); i++) {
  years.push(i);
}

export const hours = [];
for (let i = 0; i < 24; i++) {
  let j = "" + i;
  if (i < 10) {
    j = "0" + i;
  }
  hours.push(j);
}

export const hour_indices = [];
for (let i = 0; i < 24; i++) {
  hour_indices.push(i);
}

export const minutes = [];
for (let i = 0; i < 60; i++) {
  let j = "" + i;
  if (i < 10) {
    j = "0" + i;
  }
  minutes.push(j);
}

export const minute_indices = [];
for (let i = 0; i < 60; i++) {
  minute_indices.push(i);
}

export const isBetweenDates = (dateObj, dateObjFrom, dateObjTo) => {
  const dateObjTime = dateObj.getTime();
  const dateObjFromTime = dateObjFrom.getTime();
  const dateObjToTime = dateObjTo.getTime();

  return !(dateObjTime < dateObjFromTime || dateObjTime > dateObjToTime); 
};