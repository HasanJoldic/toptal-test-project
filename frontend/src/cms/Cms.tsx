import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import StatusWrapper from "./decorators/StatusWrapper";


import Header from "./containers/Header";

import Home from "./containers/Home";

import AddMeal from "./containers/meal/AddMeal";
import EditMeal from "./containers/meal/EditMeal";
import MealList from "./containers/meal/MealList";

import AddUser from "./containers/user/AddUser";
import EditUser from "./containers/user/EditUser";
import UserList from "./containers/user/UserList";

import "./assets/style/main.scss";
import "./Cms.scss";

class Cms extends Component<any, any> {
  render() {
    const { isLoggedIn } = this.props;
    return(
      <div className="main">
        <Header />
          <StatusWrapper>
            <div style={{width:"120rem",margin:"0 auto",background:"lightgrey",padding:"5rem"}}>
                <Switch>
                  {!isLoggedIn && <Redirect to="/cms/home" />}
                  {isLoggedIn && this.props.location.pathname === "/cms/home" && <Redirect to="/cms" />}

                  <Route path="/cms/home" component={Home} />
                  <Route exact path="/cms" component={UserList} />

                  <Route path="/cms/add-user" component={AddUser} />
                  <Route path="/cms/user/:username/edit" component={EditUser} />
                  
                  
                  <Route path="/cms/user/:username/add-meal" component={AddMeal} />
                  <Route path="/cms/user/:username/meal/:mealUid" component={EditMeal} />
                  <Route path="/cms/user/:username" component={MealList} />

                  <Route render={() => <div>404</div>} />
                </Switch> 
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

export default connect(mapStateToProps)(Cms);
