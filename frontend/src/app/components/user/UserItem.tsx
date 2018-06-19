import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.scss";

const UserItem = ({ username, role }) => {

  return (
    <Link to={`/${username}`} className="user-item u-highlight-hover">
      <div>{username}</div>
      <div>{role}</div>
    </Link>
  );
};

export default UserItem;
