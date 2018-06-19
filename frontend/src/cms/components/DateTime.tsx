import React from "react";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";

import {
 days, months, month_indices, years, hours, hour_indices, minutes, minute_indices 
} from "../utils/datetime";

import "./DateTime.scss";

const DateTime = ({ onChange, dateObj = new Date() }) => {
  
  const _dateObj = new Date(dateObj);

  return (
    <div className="datetime">

      <div className="date-container">

        <div className="datetime__input">
          <DropdownList
            data={days}
            value={_dateObj.getDate()}
            onChange={value => {
              _dateObj.setDate(value);
              if (_dateObj.getMonth() !== dateObj.getMonth()) {
                _dateObj.setMonth(0);
                _dateObj.setDate(value);
              }
              onChange(_dateObj);
            }}
          />
        </div>

        <div className="datetime__input">
          <DropdownList
            data={month_indices}
            itemComponent={({item}) => months[item]}
            valueComponent={({item}) => months[item]}
            value={_dateObj.getMonth()}
            onChange={value => {
              _dateObj.setMonth(value);
              onChange(_dateObj);
            }}
          />
        </div>

        <div className="datetime__input">
          <DropdownList
            data={years}
            value={_dateObj.getFullYear()}
            onChange={value => {
              _dateObj.setFullYear(value);
              onChange(_dateObj);
            }}
          />
        </div>

      </div>

      <div className="time-container">

        <div className="datetime__input">
          <DropdownList
            data={hour_indices}
            itemComponent={({item}) => hours[item] + " h"}
            valueComponent={({item}) => hours[item] + " h"}
            value={_dateObj.getHours()}
            onChange={value => {
              _dateObj.setHours(value);
              onChange(_dateObj);
            }}
          />
        </div>

        <div className="datetime__input">
          <DropdownList
            data={minute_indices}
            itemComponent={({item}) => minutes[item]}
            valueComponent={({item}) => minutes[item]}
            value={_dateObj.getMinutes()}
            onChange={value => {
              _dateObj.setMinutes(value);
              onChange(_dateObj);
            }}
          />
        </div>

      </div>

    </div>
  );
};

export default DateTime;