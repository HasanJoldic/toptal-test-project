import React from "react";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";


import "./TimeInput.scss";

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

  return (
    <div className="time-container">
      <div className="datetime-input">
        <DropdownList
          data={hour_nums}
          itemComponent={({item}) => hours[item] + " h"}
          valueComponent={({item}) => hours[item] + " h"}
          defaultValue={_hour}
        />
      </div>
      <div className="datetime-input">
        <DropdownList
          data={minute_nums}
          itemComponent={({item}) => minutes[item]}
          valueComponent={({item}) => minutes[item]}
          defaultValue={_minute}
        />
      </div>
    </div>
  );
};

export default DateInput;