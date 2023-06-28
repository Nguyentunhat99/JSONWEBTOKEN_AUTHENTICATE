import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repassword: "",
      roles: [],
      rolesSelected: [],
      isShowPassword: false,
      StatusandMessage: {},
      status: "",
    };
  }
  inputRef = createRef();

  async componentDidMount() {
    await this.props.getRoles();
    await this.inputRef.current.focus();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataRoles !== this.props.dataRoles) {
      let data = this.props.dataRoles;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rolesSelected: data,
      });
    }
    if (prevProps.dataRegister !== this.props.dataRegister) {
      let data = this.props.dataRegister;
      this.setState({
        status: data.status,
      });
    }
  }

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleOnchangeInput = (e, data) => {
    let copyState = { ...this.state };
    copyState[data] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["username", "email", "password", "repassword"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error("You have not entered data " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  selectedRole = (role) => {
    let { rolesSelected } = this.state;
    if (rolesSelected && rolesSelected.length > 0) {
      rolesSelected = rolesSelected.map((item) => {
        if (item.id === role.id) item.isSelected = !item.isSelected;
        return item;
      });
      let selectedTrue = rolesSelected.filter(
        (item) => item.isSelected === true
      );
      let roles = [];
      for (let i = 0; i < selectedTrue.length; i++) {
        roles.push(selectedTrue[i].name);
      }
      this.setState({
        rolesSelected: rolesSelected,
        roles: roles,
      });
    }
  };

  handleRegister = async (e) => {
    e.preventDefault();
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      await this.props.addUser(this.state);
      if (this.state.status === "success") {
        await this.props.history.push("/login");
      }
    }
  };
  render() {
    let rolesSelected = this.state.rolesSelected;
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
                          REGISTER
                        </p>

                        <form
                          className="mx-1 mx-md-4"
                          onSubmit={(e) => this.handleRegister(e)}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                ref={this.inputRef}
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={(e) => {
                                  this.handleOnchangeInput(e, "username");
                                }}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1c"
                              >
                                User Name
                              </label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
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
                                Email
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

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <div className="d-flex">
                                <input
                                  type={
                                    this.state.isShowPassword
                                      ? "text"
                                      : "password"
                                  }
                                  id="form3Example4cd"
                                  className="form-control"
                                  name="repassword"
                                  value={this.state.repassword}
                                  onChange={(e) => {
                                    this.handleOnchangeInput(e, "repassword");
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
                                htmlFor="form3Example4cd"
                              >
                                Repeat password
                              </label>
                            </div>
                          </div>

                          {rolesSelected.map((role, index) => {
                            return (
                              <button
                                key={index}
                                type="button"
                                className={
                                  role.isSelected === true
                                    ? "btn btn-danger ml-2 mr-2 mb-2"
                                    : "btn btn-dark ml-2 mr-2 mb-2"
                                }
                                onClick={() => this.selectedRole(role)}
                              >
                                {role.name}
                              </button>
                            );
                          })}

                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3c"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3"
                            >
                              I agree all statements in{" "}
                              <a href="#!">Terms of service</a>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              Register
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
    dataRoles: state.auth.dataRoles,
    dataRegister: state.auth.dataRegister,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoles: () => dispatch(actions.getRolesStart()),
    addUser: (data) => dispatch(actions.addUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
