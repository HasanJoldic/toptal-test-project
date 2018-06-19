import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getUsers } from "../../reducers/user/actions";

import Button from "../../components/Button";
import UserItem from "../../components/user/UserItem";

import "./UserList.scss";

class UserList extends Component<any, any> {

  constructor(props) {
    super(props);
    props.getUsers();
  }

  renderUsers() {
    return this.props.users.map((user, index) => {
      return <UserItem key={`user-item-key_${index}`} username={user.username} role={user.role} 
        isManager={this.props.role === "manager"} />
    });
  }

  render() {
    return (
      <div className="user-list">
        <Link className="btn-default add-user-button" to="cms/add-user">
          <Button text="Add user" />
        </Link>
        <div className="user-list__list">
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    users: user.users,
    isLoading: user.isLoading,
    username: state.auth.username,
    role: state.auth.role
  };
};

export default connect(mapStateToProps, { getUsers })(UserList);