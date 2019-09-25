import React, { Component } from "react";
import {
  Container, Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  Alert,
  FormGroup,
  FormInput,
  Modal,
  Popover, PopoverBody, PopoverHeader,
  ModalBody,
  ModalHeader,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { USER_DATA, LOGIN_STATUS } from "../redux/actions/login-action"
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'

import axios from 'axios'
import * as Routes from '../constants/apiRoutes'
import loader from '../images/loader.gif'

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userData.name,
      email: this.props.userData.email,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMsg: "",
      oldPasswordError: "",
      error: "",
      alertShow: false,
      alertMessage: "",
      theme: "",
      loader: false,
      modalLoader: false,
      open: false,
      info_open: false,
      showStrongPasswordError: false,
      strongPasswordError: ""

    }

    this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onClickUpdate = this.onClickUpdate.bind(this)
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggle2 = this.toggle2.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
    this.onClickSaveInModal = this.onClickSaveInModal.bind(this)
  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }

  onChangeNewPassword(event) {
    console.log(event.target.value)
    var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    console.log(reg.test(event.target.value))
    if (reg.test(event.target.value)) {
      this.setState({
        newPassword: event.target.value,
        info_open: false,
        showStrongPasswordError: false,
        strongPasswordError: ""
      })
    }
    else {
      this.setState({
        info_open: true,
        newPassword: event.target.value,
        showStrongPasswordError: true,
        strongPasswordError: "*password is too weak"
      })
    }
  }

  onChangeConfirmPassword(event) {
    console.log(event.target.value)
    this.setState({ confirmPassword: event.target.value })

    if (event.target.value !== this.state.newPassword) {
      this.setState({ errorMsg: Strings.PASSWORD_NOT_MATCHED })
    }
    else {
      this.setState({ errorMsg: "" })
    }
  }

  onChangeUserName(event) {
    console.log(event.target.value)
    this.setState({ userName: event.target.value })
  }
  onChangeEmail(event) {
    console.log(event.target.value)
    this.setState({ email: event.target.value })
  }

  onChangeOldPassword(event) {
    console.log(event.target.value)
    this.setState({ oldPassword: event.target.value })
  }

  onClickUpdate() {
    console.log(" In update ")
    console.log(this.props.userData)
    this.setState({
      loader: true
    })
    console.log(this.state.userName)
    console.log(this.state.email)
    if (this.state.userName == "" || this.state.email == "") {
      this.setState({ alertShow: true, alertMessage: Strings.ALL_FIELDS_REQUIRED, theme: "danger", loader: false })
    }
    else {
      let obj = {
        name: this.state.userName,
        email: this.state.email,
      }
      console.log(obj)
      console.log(this.props.userData._id)
      axios.put(Routes.UPDATE_USER + this.props.userData._id, obj)
        .then(response => {
          console.log(response)

          if (response.data.responseCode == Response.SUCCESS) {
            if (!response.data.result) {
              this.setState({
                errorMsg: "", error: "",
                alertShow: true, alertMessage: Strings.USER_DATA_SAME, theme: "success",
                loader: false
              })
            }
            else {
              this.setState({
                errorMsg: "", error: "",
                alertShow: true, alertMessage: Strings.DATA_UPDATED, theme: "success",
                loader: false
              })
              let temp = this.props.userData
              temp.name = this.state.userName
              temp.email = this.state.email
              this.props.USER_DATA(temp)
            }
          }
          else {
            this.setState({ alertShow: true, alertMessage: Strings.DATA_NOT_UPDATED, theme: "danger", loader: false })
          }
        })
        .catch(err => {
          console.log(err.response)
          if (err.response == undefined) {
            this.setState({
              alertShow: true, alertMessage: "Network Error", theme: "danger", loader: false
            })
          }
          else if (err.response.data.responseCode == Response.BAD_REQUEST) {
            this.setState({
              alertShow: true, alertMessage: err.response.data.responseMessage, theme: "danger", loader: false
            })
          }
          else {
            this.setState({
              alertShow: true, alertMessage: err.response.data.responseMessage, theme: "danger", loader: false
            })
          }
        })
    }
  }

  onClickSaveInModal() {
    console.log(" In update ")
    var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    console.log(reg.test(this.state.password))
    this.setState({
      modalLoader: true
    })
    if (!reg.test(this.state.password)) {
      this.setState({
        modalLoader: false,
        showStrongPasswordError: true,
        strongPasswordError: "*password is too weak"
      })
    }
    else if (this.state.newPassword == "" || this.state.confirmPassword == "" || this.state.oldPassword == "") {
      this.setState({ alertShow: true, alertMessage: Strings.ALL_FIELDS_REQUIRED, theme: "danger", modalLoader: false })
    }
    else if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ errorMsg: Strings.PASSWORD_NOT_MATCHED, modalLoader: false })
    }
    else {
      let obj = {
        password: this.state.newPassword,
        oldPassword: this.state.oldPassword
      }
      // alert("your data has been updated")
      console.log(obj)
      console.log(this.props.userData._id)
      axios.put(Routes.UPDATE_USER_PASSWORD + this.props.userData._id, obj)
        .then(response => {
          console.log(response)
          // if (response.data.data.result == Strings.EMAIL_PASSWORD_INCORRECT) {
          //   this.setState({ oldPasswordError: Strings.INVALID_PASSWORD })
          // }
          // else 
          if (response.data.responseCode == Response.SUCCESS) {
            this.setState({
              errorMsg: "", error: "", oldPasswordError: "", newPassword: "", userName: this.props.userData.userName, confirmPassword: "",
              alertShow: true, alertMessage: Strings.DATA_UPDATED, theme: "success", modalLoader: false
            })
            //   // alert(Strings.DATA_UPDATED)
          }
          else {
            this.setState({ alertShow: true, alertMessage: Strings.DATA_NOT_UPDATED, theme: "danger", modalLoader: false })
          }
          this.toggle()
        })
        .catch(err => {
          console.log(err.response)
          if (err.response.data.responseCode == Response.BAD_REQUEST) {
            this.setState({
              alertShow: true, alertMessage: Strings.INVALID_PASSWORD, theme: "danger", modalLoader: false
            })
          }
          else if (err.response == undefined) {
            this.setState({
              alertShow: true, alertMessage: "Network Error", theme: "danger", modalLoader: false
            })
          }
          else {
            this.setState({
              alertShow: true, alertMessage: err.response.data.responseMessage, theme: "danger", modalLoader: false
            })
          }
        })

    }
  }

  dismiss() {
    this.setState({ alertShow: false });
  }

  toggle() {
    console.log("122")
    this.setState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      open: !this.state.open,

    });
  }

  onClickCancel() {
    this.setState({
      userName: this.props.userData.name,
      email: this.props.userData.email,
    })

  }

  toggle2() {
    this.setState({
      info_open: !this.state.info_open
    });
  }

  render() {
    return (

      <Container fluid className="main-content-container px-4">
        <Alert className="mb-0" open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
          <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
        </Alert>
        <Row noGutters className="page-header py-4">
          <PageTitle title="User Profile" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
        </Row>
        <Row>
          <Col lg="12">
            <Card small className="mb-6">
              <Col lg="8">

                <ListGroup flush>
                  <ListGroupItem className="p-3">

                    <Row form>
                      {/* First Name */}
                      <Col md="4" className="form-group">
                        <label htmlFor="feFirstName">Full Name</label>

                      </Col>
                      <Col md="6" className="form-group">
                        <FormInput
                          id="feFirstName"
                          placeholder="Full Name"
                          value={this.state.userName}
                          onChange={this.onChangeUserName}
                        />
                      </Col>

                    </Row>
                    <Row form>
                      {/* Email */}
                      <Col md="4" className="form-group">
                        <label htmlFor="feEmail">Email</label>

                      </Col>
                      <Col md="6" className="form-group">
                        <FormInput
                          type="email"
                          id="feEmail"
                          placeholder="Email Address"
                          value={this.state.email}
                          autoComplete="email"
                          onChange={this.onChangeEmail}

                        />
                      </Col>

                    </Row>

                    <Row form>
                      <Col md="4"></Col>
                      <Col md="8">
                        <span size="sm" className="worldcerts-button" style={{ marginRight: "1em" }} onClick={this.onClickCancel}>Cancel</span>
                        {(this.state.loader) ? (<img src={loader} className="loader" />) : (<span size="sm" className="worldcerts-button" onClick={this.onClickUpdate}>Save</span>)}
                      </Col>
                    </Row>
                    <Row form style={{ marginTop: "20px" }}>
                      {/* First Name */}
                      <Col md="4" className="form-group">
                        <label htmlFor="feFirstName">Change Password</label>

                      </Col>
                      <Col md="8">
                        <span size="sm" className="worldcerts-button" style={{ marginRight: "1em" }} onClick={this.toggle}>Change Password</span>
                      </Col>
                      <Modal size="md" open={this.state.open} centered="Yes" toggle={this.toggle}>
                        <ModalHeader>Change Password</ModalHeader>
                        <ModalBody>
                          <Col sm="12">
                            <Row>
                              <Col sm="5" className="form-group">
                                <label htmlFor="fePassword">Old Password</label>
                              </Col>
                              <Col md="5">
                                <FormInput

                                  type="password"
                                  id="fePassword"
                                  placeholder="********"
                                  value={this.state.oldPassword}
                                  onChange={this.onChangeOldPassword}
                                  autoComplete="current-password"

                                />
                                <div style={{ color: "red", borderBottom: "1px", textAlign: 'center' }}>{this.state.oldPasswordError}</div>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm="5" className="form-group">
                                <label htmlFor="fePassword">New Password</label>

                              </Col>
                              <Col sm="5">
                                <FormInput
                                  id="popover-2"
                                  onClick={this.toggle2}
                                  type="password"
                                  placeholder="Password"
                                  value={this.state.newPassword}
                                  onChange={this.onChangeNewPassword}
                                  autoComplete="new-password"
                                />
                              </Col>

                              <Popover
                                placement="top"
                                open={this.state.info_open}
                                target="#popover-2"
                              >
                                <PopoverBody>
                                  A Password must be more than 8 character long contains atleast one numeric value (0-9), one uppercase alphabet ( A-Z), one lowercase alphabet (a-z) and one special character.
                                </PopoverBody>
                              </Popover>
                            </Row>

                            <Col sm="5"></Col>
                            <Col sm="5">
                              <label style={{ fontSize: "12px", color: "red" }}>{this.state.strongPasswordError}</label>

                            </Col>

                            <Row>
                              <Col sm="5" className="form-group">
                                <label htmlFor="fePassword">Confirm Password</label>
                              </Col>
                              <Col md="5">
                                <FormInput
                                  type="password"
                                  id="fePassword"
                                  placeholder="Password"
                                  value={this.state.confirmPassword}
                                  onChange={this.onChangeConfirmPassword}
                                  autoComplete="confirm-password"
                                />
                                <div style={{ color: "red", borderBottom: "1px", textAlign: 'center', fontSize: "12px" }}>{this.state.errorMsg}</div>

                              </Col>
                            </Row>
                            <Row style={{ marginTop: "15px" }}>
                              <Col md="5" className="form-group"></Col>
                              <Col md="7">
                                <span size="sm" className="worldcerts-button" style={{ marginRight: "1em" }} onClick={this.toggle}>Cancel</span>
                                {(this.state.modalLoader) ? (<img src={loader} className="loader" />) : (<span size="sm" className="worldcerts-button" onClick={this.onClickSaveInModal}>Save</span>)}
                              </Col>
                            </Row>
                          </Col>
                        </ModalBody>
                      </Modal>

                    </Row>
                    {/* </Form>
                    </Col>
                  </Row> */}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    USER_DATA: (user) => {
      dispatch(USER_DATA(user))
    }
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);