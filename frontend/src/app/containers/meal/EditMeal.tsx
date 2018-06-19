import React, { Component } from "react";
import { connect } from "react-redux";

import MealDetail, { IMeal } from "../../components/meal/MealDetail";

import { getMeal, putMeal, deleteMeal, getMeals } from "../../reducers/meal/actions";

import "./EditMeal.scss";

class EditMeal extends Component<any, any> {

  constructor(props) {
    super(props);
    props.getMeal(props.match.params.mealUid);
  }

  handleSubmit(meal: IMeal) {
    this.props.putMeal(this.props.match.params.mealUid, meal);
  }

  handleDelete() {
    this.props.deleteMeal(this.props.match.params.mealUid);
    this.props.history.goBack();
  }

  render() {
    const { selectedMeal } = this.props;

    return (
      <div>
        <MealDetail onSubmit={this.handleSubmit.bind(this)} onDelete={this.handleDelete.bind(this)} 
          selectedMeal={selectedMeal} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMeal: state.meal.selectedMeal
});

export default connect(mapStateToProps, {  getMeal, putMeal, deleteMeal })(EditMeal);
