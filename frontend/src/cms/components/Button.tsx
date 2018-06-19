import React from "react";

import "./Button.scss";

const Button = props => {
  return (
    <div className="u-highlight-hover btn-container">
      <div className="btn">
        {props.text}
      </div>
    </div>
  );
};

export default Button;