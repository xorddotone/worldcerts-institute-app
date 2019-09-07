import React, { Component } from "react";
import { Container, Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  Alert,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
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
      loader: false

    }

    this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onClickUpdate = this.onClickUpdate.bind(this)
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }

  onChangeNewPassword(event) {
    console.log(event.target.value)
    this.setState({ newPassword: event.target.value })
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

  onChangeOldPassword(event) {
    console.log(event.target.value)
    this.setState({ oldPassword: event.target.value })
  }

  onClickUpdate() {
    console.log(" In update ")
    this.setState({
      loader:true
    })

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ errorMsg: Strings.PASSWORD_NOT_MATCHED , loader: false })
    }
    else {
      let obj = {
        name: this.state.userName,
        email: this.state.email,
        password: this.state.newPassword,
        oldPassword: this.state.oldPassword
      }
      // alert("your data has been updated")
      console.log(obj)
      console.log(this.props.userData._id)
      axios.put(Routes.UPDATE_USER + this.props.userData._id, obj)
        .then(response => {
          console.log(response)
          // if (response.data.data.result == Strings.EMAIL_PASSWORD_INCORRECT) {
          //   this.setState({ oldPasswordError: Strings.INVALID_PASSWORD })
          // }
          // else 
          if (response.data.result) {
            this.setState({ errorMsg: "", error: "", oldPasswordError: "", newPassword: "", userName: this.props.userData.userName, confirmPassword: "",
             alertShow: true, alertMessage: Strings.DATA_UPDATED, theme: "success" , loader:false })
            // alert(Strings.DATA_UPDATED)
          }
          else {
            this.setState({ alertShow: true, alertMessage: Strings.DATA_NOT_UPDATED , theme:"danger",loader:false })
          }
        })
        .catch(err => {
          console.log(err.response)
          this.setState({
            alertShow: true, alertMessage: Strings.INVALID_PASSWORD, theme: "danger" , loader:false
          })
        })
    }
  }
  dismiss() {
    this.setState({ alertShow: false });
  }

  render() {
    return (
      
      <Container fluid className="main-content-container px-4">
<Alert className="mb-0" open = {this.state.alertShow} theme = {this.state.theme} dismissible={this.dismiss}>
<i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
      </Alert>
        <Row noGutters className="page-header py-4">
          <PageTitle title="User Profile" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
          {/* subtitle="Registration" */}
        </Row>
        <Row>
          <Col lg="11">
            <Card small className="mb-6">
              {/* <CardHeader className="border-bottom">
    </CardHeader> */}
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form>
                        <Row form>
                          {/* First Name */}
                          <Col md="12" className="form-group">
                            <label htmlFor="feFirstName">Full Name</label>
                            <FormInput
                              id="feFirstName"
                              placeholder="Full Name"
                              value={this.state.userName}
                              onChange={this.onChangeUserName}
                            />
                          </Col>
                          {/* Last Name */}
                          {/* <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value="Brooks"
                    onChange={() => {}}
                  />
                </Col> */}
                        </Row>
                        <Row form>
                          {/* Email */}
                          <Col md="6" className="form-group">
                            <label htmlFor="feEmail">Email</label>
                            <FormInput
                              type="email"
                              id="feEmail"
                              placeholder="Email Address"
                              value={this.state.email}
                              autoComplete="email"
                              disabled
                            />
                          </Col>
                          {/* Password */}
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Old Password</label>
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
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">New Password</label>
                            <FormInput
                              type="password"
                              id="fePassword"
                              placeholder="Password"
                              value={this.state.newPassword}
                              onChange={this.onChangeNewPassword}
                              autoComplete="new-password"
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label htmlFor="fePassword">Confirm Password</label>
                            <FormInput
                              type="password"
                              id="fePassword"
                              placeholder="Password"
                              value={this.state.confirmPassword}
                              onChange={this.onChangeConfirmPassword}
                              autoComplete="confirm-password"
                            />
                            <div style={{ color: "red", borderBottom: "1px", textAlign: 'center' }}>{this.state.errorMsg}</div>

                          </Col>
                        </Row>
                        {/* <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  value="1234 Main St."
                  onChange={() => {}}
                />
              </FormGroup>
              <Row form>
                {/* City 
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    placeholder="City"
                    onChange={() => {}}
                  />
                </Col>
                {/* State 
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormSelect id="feInputState">
                    <option>Choose...</option>
                    <option>...</option>
                  </FormSelect>
                </Col>
                {/* Zip Code 
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    placeholder="Zip"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description 
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea id="feDescription" rows="5" />
                </Col>
              </Row> */}
                       
                        {(this.state.loader)?(<img src = {loader} className = "loader" />):( <Button size="sm" className = "worldcerts-button" onClick={this.onClickUpdate}>Update Account</Button>)}
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state.pageTitle);
  return {
    Title: state.pageTitle,
    userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);