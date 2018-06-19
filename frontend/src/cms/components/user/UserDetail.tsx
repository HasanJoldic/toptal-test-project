import React, { Component } from "react";

import Button from "../../components/Button";

import "./UserDetail.scss";

export interface IUser {
  username: string;
  password: string;
  dailyCalorieGoal: number;
}

const validNumbers = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ""
];

const isValidNumberInput = (string) => {
  if (string === "") return true;
  return validNumbers.indexOf(string[string.length-1]) !== -1;
}

class UserDetail extends Component<any, any> {

  state = {
    username: "",
    password: "",
    dailyCalorieGoal: ""
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUser && prevProps.selectedUser.username !== this.props.selectedUser.username) {
      this.setState({
        username: "",
        password: "",
        dailyCalorieGoal: ""
      });
    }
  }

  render() {
    let { username, password, dailyCalorieGoal } = this.state;
    const { onSubmit, onDelete, selectedUser } = this.props;

    if (selectedUser && !username) {
      const { username, password, dailyCalorieGoal }: IUser = selectedUser || {};
      this.setState({
        username: username || "",
        password: password || "",
        dailyCalorieGoal: dailyCalorieGoal || ""
      });
    }

    return(
      <div className="user-detail">
        <div>
          <form className="form" acceptCharset="utf-8" onSubmit={(e) => { 
            e.preventDefault();
            onSubmit({ username, password, dailyCalorieGoal });
          }}>

            <div className="user-detail__row">

              <div className="form__group">
                <input id="user-detail__username" className="form__input" type="text" placeholder="Name"
                required disabled={false} onChange={(e) => this.setState({username: e.target.value})} 
                value={username} autoComplete="off" />
                <label htmlFor="user-detail__username" className="form__label">Name</label>
              </div>

            </div>

            <div className="user-detail__row">

            {false &&
              <div className="form__group">
                <input id="user-detail__password" className="form__input" type="text" placeholder="Password"
                required onChange={(e) => this.setState({password: e.target.value})} 
                value={"*".repeat(password.length)} />
                <label htmlFor="user-detail__password" className="form__label">Password</label>
              </div>
            }

            </div>

            <div className="user-detail__row">

              <div className="form__group">
                <input id="dailyCalorieGoal" className="form__input" type="text" placeholder="Daily calory goal"
                  onChange={(e) => {
                  isValidNumberInput(e.target.value) ?
                  this.setState({dailyCalorieGoal: e.target.value}) : null;
                }} value={dailyCalorieGoal} />
                <label htmlFor="dailyCalorieGoal" className="form__label">Calories daily goal</label>
              </div>

            </div>

            <div className="user-detail__row" 
              style={{marginTop:"10rem"}}>

              {selectedUser &&
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

export default UserDetail;
