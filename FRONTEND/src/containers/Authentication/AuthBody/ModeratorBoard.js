import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import * as actions from "../../../store/actions";

import { getModeratorBoard } from "../../../services/userService";
import { handleRefreshToken } from "../../../services/authService";

class ModeratorBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.accessToken !== this.props.accessToken &&
      prevProps.refreshToken !== this.props.refreshToken
    ) {
      let { accessToken, refreshToken, updateAccessToken } = this.props;
      let res = await getModeratorBoard({
        "x-access-token": accessToken,
      });
      if (res && res.status === "success") {
        this.setState({
          content: res,
        });
      } else {
        let dataToken = await handleRefreshToken(refreshToken);
        if (dataToken && dataToken.status === "error") {
          await this.props.processLogout();
          this.setState({
            content: dataToken,
          });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 5000);
        } else {
          await updateAccessToken(dataToken.accessToken);
          this.props.history.push("/homejwt");
          toast.error(res.message);
        }
      }
    }
  }

  render() {
    let { content } = this.state;
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h1
              className={
                content.status === "success"
                  ? "text-center text-success"
                  : "text-center text-danger"
              }
            >
              {content.message}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    updateAccessToken: (accessToken) =>
      dispatch(actions.updateAccessToken(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorBoard);
