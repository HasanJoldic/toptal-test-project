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

    let dateObjFrom = new Date();
    dateObjFrom.setHours(0);
    dateObjFrom.setMinutes(0);
    dateObjFrom.setSeconds(0);

    let dateObjTo = new Date();
    dateObjTo.setHours(23);
    dateObjTo.setMinutes(59);
    dateObjTo.setSeconds(59);

    this.state = {
      dateObjFrom,
      dateObjTo
    }
    props.getMeals(props.match.params.username);
  }

  handleDateTimeChange(counter: boolean) {
    if (counter) {
      return (dateObj: Date) => {
        this.setState({
          dateObjFrom: dateObj
        });
      }
    } else {
      return (dateObj: Date) => {
        this.setState({
          dateObjTo: dateObj
        });
      }
    }
  }

  renderMeals() {
    const { dateObjFrom, dateObjTo } = this.state;
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

      if (isBetweenDates(new Date(meal.createdAt), dateObjFrom, dateObjTo)) {
        meals.push(<MealItem key={`meal-item-key_${index}`} meal={meal} match={this.props.match} 
          isOverLimit={isOverLimit} />);
      }
    });

    return meals;
  }

  render() {
    const { dateObjFrom, dateObjTo } = this.state;

    return (
      <div className="meal-list">
        <Link className="btn-default add-meal-button" to={`/cms/user/${this.props.match.params.username}/add-meal`}>
          <Button text="Add meal" />
        </Link>
        <div className="meal-list__filter-container">
          <div>
            <span>From: </span>
            <div className="meal-list__filter">
              <DateTime onChange={this.handleDateTimeChange(true).bind(this)} dateObj={dateObjFrom} />
            </div>
          </div>
          <div>
            <span>To: </span>
            <div className="meal-list__filter">
              <DateTime onChange={this.handleDateTimeChange(false).bind(this)} dateObj={dateObjTo} />
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