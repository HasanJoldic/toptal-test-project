import React, { Component } from "react";
import { connect } from "react-redux";

import UserDetail, { IUser } from "../../components/user/UserDetail";

import { getUser, putUser, deleteUser } from "../../reducers/user/actions";

import "./EditUser.scss";

class EditUser extends Component<any, any> {

  constructor(props) {
    super(props);
    props.getUser(props.match.params.username);
  }

  handleSubmit(user: IUser) {
    this.props.putUser(this.props.match.params.username, user);
  }

  handleDelete() {
    this.props.deleteUser(this.props.match.params.username);
    this.props.history.goBack();
  }

  render() {
    const { selectedUser, deleteUser } = this.props;

    return (
      <div>
        <UserDetail onSubmit={this.handleSubmit.bind(this)} selectedUser={selectedUser}
          onDelete={this.handleDelete.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

export default connect(mapStateToProps, { getUser, putUser, deleteUser })(EditUser);