import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isBetweenDates } from "../../utils/datetime";

import Button from "../../components/Button";
import DateTime from "../../components/DateTime";
import MealItem from "../../components/meal/MealItem";

import { getMeals } from "../../reducers/meal/actions";

import "./MealList.scss";

class MealList extends Component<any, any> {

  constructor(props) {
    super(props);

    let dateFrom = new Date();
    dateFrom.setHours(0);
    dateFrom.setMinutes(0);
    dateFrom.setSeconds(0);

    let dateTo = new Date();
    dateTo.setHours(23);
    dateTo.setMinutes(59);
    dateTo.setSeconds(59);

    this.state = {
      dateFrom,
      dateTo,
      timeFrom: dateFrom,
      timeTo: dateTo
    }
    props.getMeals();
  }

  handleDateTimeChange(isDate: boolean, isFrom: boolean) {
    if (isDate) {
      if (isFrom) {
        return (dateObj: Date) => {
          this.setState({
            dateFrom: dateObj
          });
        }
      } else {
        return (dateObj: Date) => {
          this.setState({
            dateTo: dateObj
          });
        }
      }
    } else {
      if (isFrom) {
        return (dateObj: Date) => {
          this.setState({
            timeFrom: dateObj
          });
        }
      } else {
        return (dateObj: Date) => {
          this.setState({
            timeTo: dateObj
          });
        }
      }
    }
  }

  renderMeals() {
    const { dateFrom, dateTo, timeFrom, timeTo } = this.state;
    let meals = [];
    this.props.meals.forEach((meal, index) => {
      const dateObj = new Date(meal.createdAt);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();

      let _meals = this.props.meals.filter(_meal => {
        const _dateObj = new Date(_meal.createdAt);
        const _year = _dateObj.getFullYear();
        const _month = _dateObj.getMonth();
        const _day = _dateObj.getDate();

        return year === _year && month === _month && day === _day;
      })

      let caloriesTotal = 0;
      _meals.forEach(_meal => caloriesTotal += _meal.calories);

      let isOverLimit = false;

      if (this.props.selectedUser && this.props.selectedUser.dailyCalorieGoal) {
        isOverLimit = caloriesTotal > this.props.selectedUser.dailyCalorieGoal;
      }

      if (isBetweenDates(new Date(meal.createdAt), {
        dateFrom,
        dateTo,
        timeFrom,
        timeTo
      })) {
        meals.push(<MealItem key={`meal-item-key_${index}`} meal={meal} isOverLimit={isOverLimit} />);
      }
    });

    return meals;
  }

  render() {
    const { dateFrom, dateTo, timeFrom, timeTo } = this.state;

    return (
      <div className="meal-list">
        <Link className="btn-default add-meal-button" to="add-meal">
          <Button text="Add meal" />
        </Link>
        <div className="meal-list__filter-container">
          <div>
            <span>Between theses dates: </span>
            <div className="meal-list__filter">
              <DateTime onChange={this.handleDateTimeChange(true, true).bind(this)} 
                dateObj={dateFrom} showTime={false} />

              <DateTime onChange={this.handleDateTimeChange(true, false).bind(this)} 
                dateObj={dateTo} showTime={false} />
            </div>
          </div>
          <div>
            <span>Between these times: </span>
            <div className="meal-list__filter">
              <DateTime onChange={this.handleDateTimeChange(false, true).bind(this)} 
                dateObj={timeFrom} showDate={false} />

              <DateTime onChange={this.handleDateTimeChange(false, false).bind(this)} 
                dateObj={timeTo} showDate={false} />
            </div>
          </div>
        </div>
        <div className="meal-list__list">
          {this.renderMeals()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  selectedUser: state.user.selectedUser
});

export default connect(mapStateToProps, { getMeals })(MealList);