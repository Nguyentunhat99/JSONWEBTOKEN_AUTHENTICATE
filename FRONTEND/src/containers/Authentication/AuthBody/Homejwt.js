import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";
import { getPublicContent } from "../../../services/userService";

class Homejwt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }
  async componentDidMount() {
    let data = await getPublicContent();
    this.setState({
      content: data,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center">{this.state.content}</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homejwt)
);
