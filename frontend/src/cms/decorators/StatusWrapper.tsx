import React from "react";
import { connect } from "react-redux";
import { Digital } from "react-activity";
import "react-activity/dist/react-activity.css";

import { setErrorMessage, setCriticalErrorMessage, setSuccessMessage } from "../reducers/app/actions";

import "./StatusWrapper.scss";

const StatusWrapper = props => {

  if (props.errorMessage || props.successMessage) {
    setTimeout(() => {
      props.setErrorMessage("");
      props.setSuccessMessage("");
    }, 3000);
  }

  return (
    <div className="status">
      {props.isLoading &&
        <div className="status__loading">
          <Digital color="#727981" size={32} speed={1} animating={true} />
        </div>
      }
      <div className={"status__message status__message--show status__message--" + 
      (props.errorMessage ? "red" : "") + (props.successMessage ? "green" : "")}>
        {props.errorMessage}
        {props.successMessage}
      </div>
      {props.children}
    </div>
  );
};

const mapStateToProps = state => {
  const { app } = state;
  return {
    isLoading: app.isLoading,
    errorMessage: app.errorMessage,
    criticalErrorMessage: app.criticalErrorMessage,
    successMessage: app.successMessage
  };
};

export default connect(mapStateToProps, { 
  setErrorMessage, setCriticalErrorMessage, setSuccessMessage
})(StatusWrapper);