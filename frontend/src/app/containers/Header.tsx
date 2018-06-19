import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signUp, logIn, logOut } from "../reducers/auth/actions";

import Button from "../components/Button";

import "./Header.scss";

class Header extends Component<any, any> {
  state = {
    showModalLogIn: false,
    showModalSignUp: false,
    username: "",
    password: "",
  };

  renderButtons() {
    const { isLoggedIn, logOut } = this.props;
    if (isLoggedIn) {
      return (
        <div className="header__button-container">
          <div className="btn-default" onClick={logOut}>
            <Button text="Log out" />
          </div>

          <Link className="btn-default" to="/edit">
            <Button text="Edit user data" />
          </Link>
        </div>
      );
    } else {
      return (
        <div className="header__button-container">
          <div className="btn-default" onClick={() => this.setState({showModalLogIn: true})}>
            <Button text="Log in" />
          </div>
          <div className="btn-default" onClick={() => this.setState({showModalSignUp: true})}>
            <Button text="Sign up" />
          </div>
        </div>
      );
    }
  }

  handleSignUp(e) {
    const { username, password } = this.state;
    e.preventDefault();
    this.props.signUp(username, password);
  }

  handleLogIn(e) {
    const { username, password } = this.state;
    e.preventDefault();
    this.props.logIn(username, password);
  }

  render() {
    let { showModalLogIn, showModalSignUp, username, password } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn && (showModalLogIn === true || showModalSignUp === true)) {
      this.setState({
        showModalLogIn: false,
        showModalSignUp: false,
        username: "",
        password: "",
      });
    }

    return(
      <div>
        <div className="header">
          {this.renderButtons()}
        </div>
        <Modal onClose={() => this.setState({showModalLogIn: false})} 
          open={showModalLogIn}  center>
          <form onSubmit={this.handleLogIn.bind(this)} className="form header-form" acceptCharset="utf-8">

            <div className="form__group">
              <input id="username" className="form__input" type="text" placeholder="Name" value={username}
              required onChange={(e) => this.setState({username: e.target.value})} />
              <label htmlFor="username" className="form__label">Name</label>
            </div>

            <div className="form__group">
              <input id="password" className="form__input" type="password" placeholder="Password" value={password}
                required onChange={(e) => this.setState({password: e.target.value})} />
              <label htmlFor="password" className="form__label">Password</label>
            </div>

            <div className="form_group">
              <button type="submit" className="u-highlight-hover">
                <Button text="Log in" />
              </button>
            </div>

          </form>
          <div className="u-center-text" 
            onClick={() => this.setState({showModalLogIn: false,showModalSignUp: true})}>
            Don't have an account yet? &nbsp;&nbsp;
            <span className="u-highlight-hover u-clickable-text">Sign up</span>
          </div>
        </Modal>

        <Modal onClose={() => this.setState({showModalSignUp: false})}
          open={showModalSignUp} center>
          <form onSubmit={this.handleSignUp.bind(this)} className="form header-form" acceptCharset="utf-8">

            <div className="form__group">
              <input id="username" className="form__input" type="text" placeholder="Name" value={username}
                required onChange={(e) => this.setState({username: e.target.value})} />
              <label htmlFor="username" className="form__label">Name</label>
            </div>

            <div className="form__group">
              <input id="password" className="form__input" type="password" placeholder="Password" value={password}
                required onChange={(e) => this.setState({password: e.target.value})} />
              <label htmlFor="password" className="form__label">Password</label>
            </div>

            <div className="form_group">
              <button type="submit" className="btn-default u-highlight-hover">
                <Button text="Sign up" />
              </button>
            </div>

          </form>
          <div className="u-center-text"
            onClick={() => this.setState({showModalLogIn: true,showModalSignUp: false})}>
            Already have an account?&nbsp;&nbsp;
            <span className="u-highlight-hover u-clickable-text">Log in</span>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    isLoggedIn: auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, { signUp, logIn, logOut })(Header);
