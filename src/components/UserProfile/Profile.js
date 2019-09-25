import React, { Component } from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { connect } from 'react-redux';
import { USER_DATA } from "../../redux/actions/login-action"

import * as constants from '../../utils/constants'
import axios from 'axios'

class Profile extends Component {
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
      error: ""
    }

    this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onClickUpdate = this.onClickUpdate.bind(this)
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this)
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
      this.setState({ errorMsg: "password not matched" })
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

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ errorMsg: "Password match invalid" })
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
      axios.put(constants.server_url + 'user/' + this.props.userData._id, obj)
        .then(response => {
          console.log(response)
          if (response.data.data.result == "Email or Password is incorrect") {
            this.setState({ oldPasswordError: "Invalid Current Password" })

          }
          else if (response.data.data.result) {


            this.setState({ errorMsg: "", error: "", oldPasswordError: "", newPassword: "", userName: this.props.userData.name, confirmPassword: "", })
            alert("Your Data has been updated")
          }
          else {
            this.setState({ error: "Your Data has not updated" })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return (
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
                  <span theme="accent" onClick={this.onClickUpdate}>Update Account</span>
                  <div style={{ color: "red", borderBottom: "1px", textAlign: 'center' }}>{this.state.error}</div>

                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("Redux=>", state);
  return {
    userData: state.user_reducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    USER_DATA: (user) => {
      dispatch(USER_DATA(user))
    },
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
