import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import StatusWrapper from "./decorators/StatusWrapper";

import Header from "./containers/Header";

import Home from "./containers/Home";

import AddMeal from "./containers/meal/AddMeal";
import EditMeal from "./containers/meal/EditMeal";
import MealList from "./containers/meal/MealList";

import EditUser from "./containers/user/EditUser";

import "./assets/style/main.scss";
import "./App.scss";

class App extends Component<any, any> {
  render() {
    const { isLoggedIn } = this.props;
    return(
      <div className="main">
        <Header />
          <StatusWrapper>
            <div style={{width:"120rem",margin:"0 auto",background:"lightgrey",padding:"5rem"}}>
              {isLoggedIn ? 
                <Switch>
                  <Route exact path="/" component={MealList} />
                  <Route path="/edit" component={EditUser} />
                  <Route path="/add-meal" component={AddMeal} />
                  <Route path="/meal/:mealUid" component={EditMeal} />

                </Switch> :
                <Switch>
                  <Route exact path="/" component={Home} />
                </Switch>
              }
            </div>
          </StatusWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
