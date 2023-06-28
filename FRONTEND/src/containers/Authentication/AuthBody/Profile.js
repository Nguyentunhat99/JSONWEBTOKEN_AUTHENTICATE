import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      accessToken: "",
      refreshToken: "",
    };
  }

  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
      let data = this.props.userInfo.userInfo;
      this.setState({
        userInfo: data,
      });
    }
    if (prevProps.accessToken !== this.props.accessToken) {
      let data = this.props.accessToken;
      this.setState({
        accessToken: data,
      });
    }
    if (prevProps.refreshToken !== this.props.refreshToken) {
      let data = this.props.refreshToken;
      this.setState({
        refreshToken: data,
      });
    }
  }

  render() {
    let { userInfo, accessToken, refreshToken } = this.state;
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center">
              <strong>{userInfo.username}</strong> Profile
            </h1>
          </div>
          <p>
            <strong>accessToken:</strong> {accessToken.substring(0, 20)} ...{" "}
            {accessToken.substr(accessToken.length - 20)}
          </p>
          <p>
            <strong>refreshToken:</strong> {refreshToken.substring(0, 20)} ...{" "}
            {refreshToken.substr(refreshToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {userInfo.id}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {userInfo.roles &&
              userInfo.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userInfo: state.auth.userInfo,
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
