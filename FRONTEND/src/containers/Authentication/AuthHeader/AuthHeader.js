import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router-dom";

class AuthHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdminBoard: false,
      showModeratorBoard: false,
      showUserBoard: false,
      dataUser: [],
      isShowMenu: false,
    };
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
      let data = this.props.userInfo;
      if (data !== null) {
        this.setState({
          dataUser: data.userInfo,
        });
        for (let i = 0; i < data.userInfo.roles.length; i++) {
          if (data.userInfo.roles[i] === "role_admin") {
            this.setState({
              showAdminBoard: true,
            });
          }
          if (data.userInfo.roles[i] === "role_moderator") {
            this.setState({
              showModeratorBoard: true,
            });
          }
          if (data.userInfo.roles[i] === "role_user") {
            this.setState({
              showUserBoard: true,
            });
          }
        }
      }
    }
  }
  gotoComp = async (data) => {
    await this.props.history.push(`/${data}`);
  };
  Logout = async () => {
    await this.props.processLogout();
    await this.props.history.push("/login");
  };
  handleShowMenu = () => {
    this.setState({
      isShowMenu: !this.state.isShowMenu,
    });
  };

  render() {
    let { isLoggedIn } = this.props;
    let { showAdminBoard, showModeratorBoard, showUserBoard, isShowMenu } =
      this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="">
            JWT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => this.handleShowMenu()}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={
              isShowMenu
                ? "collapse navbar-collapse"
                : "collapse navbar-collapse show"
            }
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href=""
                  onClick={() => this.gotoComp("homejwt")}
                >
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              {isLoggedIn && showAdminBoard && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href=""
                    onClick={() => this.gotoComp("adminboard")}
                  >
                    Admin Board
                  </a>
                </li>
              )}
              {isLoggedIn && showModeratorBoard && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href=""
                    onClick={() => this.gotoComp("moderatorboard")}
                  >
                    Moderator Board
                  </a>
                </li>
              )}
              {isLoggedIn && showUserBoard && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href=""
                    onClick={() => this.gotoComp("userboard")}
                  >
                    User Board
                  </a>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href=""
                      onClick={() => this.gotoComp("profile")}
                    >
                      Hello! {this.state.dataUser.username}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href=""
                      onClick={() => this.Logout()}
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href=""
                      onClick={() => this.gotoComp("register")}
                    >
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href=""
                      onClick={() => this.gotoComp("login")}
                    >
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
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
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthHeader)
);
