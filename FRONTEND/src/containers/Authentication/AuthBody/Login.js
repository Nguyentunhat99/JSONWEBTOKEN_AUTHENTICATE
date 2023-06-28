import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import { handleLoginApi } from "../../../services/authService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
    };
  }

  inputRef = createRef();

  async componentDidMount() {
    await this.setState({
      email: this.props.emailRegister,
    });
    await this.inputRef.current.focus();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeInput = (e, data) => {
    let copyState = { ...this.state };
    copyState[data] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error("You have not entered data " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleLogin = async (e) => {
    try {
      e.preventDefault();
      let isValid = this.checkValidateInput();
      if (isValid === true) {
        let data = await handleLoginApi(this.state.email, this.state.password);
        if (data && data.status === "success") {
          toast.success(data.message);
          this.props.userLoginSuccess(data);
          this.props.history.push("/homejwt");
        } else {
          toast.error(data.message);
          this.props.history.push("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <section className="vh-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          LOGIN
                        </p>

                        <form
                          className="mx-1 mx-md-4"
                          onSubmit={(e) => this.handleLogin(e)}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                ref={this.inputRef}
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={(e) => {
                                  this.handleOnchangeInput(e, "email");
                                }}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example3c"
                              >
                                Your Email
                              </label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <div className="d-flex">
                                <input
                                  type={
                                    this.state.isShowPassword
                                      ? "text"
                                      : "password"
                                  }
                                  id="form3Example4c"
                                  className="form-control"
                                  name="password"
                                  value={this.state.password}
                                  onChange={(e) => {
                                    this.handleOnchangeInput(e, "password");
                                  }}
                                />
                                {this.state.password === "" ? (
                                  ""
                                ) : (
                                  <span
                                    onClick={() =>
                                      this.handleShowHidePassword()
                                    }
                                    className="icon-eye mt-1 ml-1"
                                  >
                                    <i
                                      className={
                                        this.state.isShowPassword
                                          ? "far fa-eye mt-1 ml-1"
                                          : "far fa-eye-slash mt-1 ml-1"
                                      }
                                    ></i>
                                  </span>
                                )}
                              </div>
                              <label
                                className="form-label"
                                htmlFor="form3Example4c"
                              >
                                Password
                              </label>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-success btn-lg"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                          className="img-fluid"
                          alt="Sample image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    emailRegister: state.auth.emailRegister,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
