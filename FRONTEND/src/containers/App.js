import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import { path } from "../utils";

import Home from "../routes/Home";

import CustomScrollbars from "../components/CustomScrollbars";
import Homejwt from "./Authentication/AuthBody/Homejwt";
import Register from "./Authentication/AuthBody/Register";
import Login from "./Authentication/AuthBody/Login";
import AdminBoard from "./Authentication/AuthBody/AdminBoard";
import ModeratorBoard from "./Authentication/AuthBody/ModeratorBoard";
import UserBoard from "./Authentication/AuthBody/UserBoard";
import Profile from "./Authentication/AuthBody/Profile";
import AuthHeader from "./Authentication/AuthHeader/AuthHeader";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <AuthHeader />
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.GOHOME} component={Homejwt} />
                  <Route path={path.REGISTER} component={Register} />
                  <Route path={path.LOGIN} component={Login} />
                  <Route path={path.ADMINBOARD} component={AdminBoard} />
                  <Route
                    path={path.MODERATORBOARD}
                    component={ModeratorBoard}
                  />
                  <Route path={path.USERBOARD} component={UserBoard} />
                  <Route path={path.PROFILE} component={Profile} />
                </Switch>
              </CustomScrollbars>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userInfo: state.auth.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
