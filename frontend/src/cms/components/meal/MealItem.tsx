import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./MealItem.scss";

import { dateFormat, timeFormat } from "../../utils/datetime";

const MealItem = ({ meal, match, isOverLimit }) => {
  const { name, calories, createdAt, uid } = meal;

  const momentDate = moment(createdAt);
  const datetimeFormatted = 2;
  return (
    <Link to={`/cms/user/${match.params.username}/meal/${uid}`} 
      className={`meal-item u-highlight-hover ${isOverLimit ? "meal-item-over-limit" : ""}`}>
      <div>{name}</div>
      <div>{calories} kCal</div>
      <div>{momentDate.format(`${timeFormat} ${dateFormat}`)}</div>
    </Link>
  );
};

export default MealItem;
