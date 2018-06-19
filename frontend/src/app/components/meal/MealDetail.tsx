import React, { Component } from "react";
import { connect } from "react-redux"; 

import Button from "../../components/Button";
import DateTime from "../DateTime";

import "./MealDetail.scss";

const validNumbers = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ""
];

const isValidNumberInput = (string) => {
  if (string === "") return true;
  return validNumbers.indexOf(string[string.length-1]) !== -1;
}

export interface IMeal {
  name: string;
  calories: number;
  createdAt: Date;
}

class MealDetail extends Component<any, any> {

  state = {
    name: "",
    calories: "",
    createdAt: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedMeal && !this.props.selectedMeal) {
      this.setState({
        name: "",
        calories: "",
        createdAt: null
      });
    }
  }

  handleDateTimeChange(dateObj: Date) {
    this.setState({createdAt: dateObj.toISOString()});
  }

  render() {
    let { name, calories, createdAt } = this.state;
    const { onSubmit, onDelete, selectedMeal } = this.props;

    if (selectedMeal && !name) {
      const { name, calories, createdAt }: IMeal = selectedMeal || {};
      this.setState({
        name: name || "",
        calories: calories || "",
        createdAt: createdAt || ""
      });
    }

    if (!createdAt) {
      createdAt = new Date().toISOString();
    }

    return(
      <div className="meal-detail">
        <div>
          <form className="form" acceptCharset="utf-8" onSubmit={(e) => { 
            e.preventDefault();
            onSubmit({name, calories, createdAt});
            if (!selectedMeal) {
              this.setState({
                name: "",
                calories: "",
                createdAt: ""
              })
            }
          }}>

            <div className="meal-detail__row">

              <div className="form__group">
                <input id="name" className="form__input" type="text" placeholder="Chilli con carne"
                required disabled={false} onChange={(e) => this.setState({name: e.target.value})} 
                value={name} />
                <label htmlFor="name" className="form__label">Meal</label>
              </div>

            </div>

            <div className="meal-detail__row">

              <div className="form__group">
                <input id="calories" className="form__input" type="text" placeholder="350"
                required disabled={false} onChange={(e) => {
                  isValidNumberInput(e.target.value) ?
                  this.setState({calories: e.target.value}) : null;
                }} value={calories} />
                <label htmlFor="calories" className="form__label">Calories</label>
              </div>

            </div>

            <div className="meal-detail__row">
              <DateTime onChange={this.handleDateTimeChange.bind(this)} dateObj={new Date(createdAt)} />
            </div>

            <div className="meal-detail__row" 
              style={{marginTop:"10rem"}}>

              {selectedMeal &&
                <div className="form_group" onClick={onDelete}>
                  <button type="button" className="delete u-highlight-hover">
                    <Button text="Delete" />
                  </button>
                </div>
              }

              <div className="form_group">
                <button type="submit" className="submit u-highlight-hover">
                  <Button text="Save" />
                </button>
              </div>

            </div>

          </form>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    meal: state.meal.meal
  };
};

export default connect(mapStateToProps)(MealDetail);
