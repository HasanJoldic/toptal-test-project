import React from "react";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";


import "./DateInput.scss";

export const days = [];
for (let i = 1; i <= 31; i++) {
  days.push(i);
}

export const months = [
  "January", "February", "March", "April", "May", "Juni",
  "July", "August", "September", "Oktober", "November", "December"
];

export const month_nums = [
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

export const hour_nums = [];
for (let i = 0; i < 24; i++) {
  hour_nums.push(i);
}

export const minutes = [];
for (let i = 0; i < 60; i++) {
  let j = "" + i;
  if (i < 10) {
    j = "0" + i;
  }
  minutes.push(j);
}

export const minute_nums = [];
for (let i = 0; i < 60; i++) {
  minute_nums.push(i);
}

const DateInput = props => {
  const currentDate = new Date();
  
  const _hour = currentDate.getHours();
  const _minute = currentDate.getMinutes();
  const _day = currentDate.getDate();
  const _month = currentDate.getMonth();
  const _year = currentDate.getFullYear();

  return (
    <div className="date-input">
      <div className="datetime-input">
        <DropdownList
          data={days}
          defaultValue={_day}
        />
      </div>
      <div className="datetime-input">
        <DropdownList
          data={month_nums}
          itemComponent={({item}) => months[item]}
          valueComponent={({item}) => months[item]}
          defaultValue={_month}
        />
      </div>
      <div className="datetime-input">
        <DropdownList
          data={years}
          defaultValue={_year}
        />
      </div>
    </div>
  );
};

export default DateInput;