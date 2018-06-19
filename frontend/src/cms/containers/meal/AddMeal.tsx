import React, { Component } from "react";
import { connect } from "react-redux";

import MealDetail, { IMeal } from "../../components/meal/MealDetail";

import { postMeal } from "../../reducers/meal/actions";

import "./AddMeal.scss";

class AddMeal extends Component<any, any> {

  handleSubmit(meal: IMeal) {
    this.props.postMeal(this.props.match.params.username, meal);
  }

  render() {

    return (
      <div>
        <MealDetail onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

export default connect(null, { postMeal })(AddMeal);
