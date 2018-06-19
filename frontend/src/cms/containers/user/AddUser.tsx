import React, { Component } from "react";
import { connect } from "react-redux";

import UserDetail, { IUser } from "../../components/user/UserDetail";

import { postUser, } from "../../reducers/user/actions";

import "./AddUser.scss";

class AddUser extends Component<any, any> {

  handleSubmit(user: IUser) {
    this.props.postUser(user);
  }

  render() {

    return (
      <div>
        <UserDetail onSubmit={this.handleSubmit.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { meal } = state;

  return {
  };
};

export default connect(mapStateToProps, { postUser })(AddUser);