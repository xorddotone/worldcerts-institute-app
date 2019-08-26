import React, { Component } from "react";
import ReCaptcha from "react-google-recaptcha";
import { Link } from 'react-router-dom'
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
import logo from '../images/logo2.png'

import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import axios from 'axios'
import Signin from './Login'
import * as constants from '../utils/constants'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      captchaText: "",
      passwordError: "",
      errorMsg:""
    }

    // Binding Functions
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this)
    this.onChangeCaptcha = this.onChangeCaptcha.bind(this)
    this.onClickRegister = this.onClickRegister.bind(this)
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

  }

  componentDidMount() {
    this.props.UpdateTitle("User Regsitration");
    if (this.captchaDemo) {
      console.log("started, just a second...")
      this.captchaDemo.reset();
    }
  }

  onChangeUserName(event) {
    // console.log(event.target.value)
    this.setState({
      userName: event.target.value
    })
  }

  onChangeEmail(event) {
    // console.log(event.target.value)
    this.setState({
      email: event.target.value
    })
  }

  onChangePassword(event) {
    // console.log(event.target.value)
    this.setState({
      password: event.target.value
    })
  }

  onChangeConfirmPassword(event) {
    // console.log(event.target.value)
    this.setState({
      confirmPassword: event.target.value
    })
    if (event.target.value !== this.state.password) {
      this.setState({ passwordError: "password not matched" })
    }
    else {
      this.setState({ passwordError: "" })

    }
  }

  onChangeCaptcha(event) {
    console.log(event)
    this.setState({
      captchaText: event
    })

  }

  onClickRegister() {
    if( this.state.captchaText=="" || this.state.userName=="" || this.state.password=="" || this.state.email=="" || this.state.userName==" " || this.state.password==" " || this.state.email==" "){
      this.setState({
        errorMsg:"All Fields are required"
      })
      // console.log("All Fields are required")
    }
    else if(this.state.password!==this.state.confirmPassword){
      this.setState({
        errorMsg:"Password Does Not matched"
      })
      // console.log("Password Does Not matched")
    }
    else{
      
      // this.props.history.push('/emailVerification')
      let user = {
        name: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        // confirmPassword: this.state.confirmPassword
      }
      axios.post(constants.server_url + 'signup' , user).then(response => {
        console.log(response)
        this.props.history.push('/institute_registration')
      })
        .catch(err => {
          console.log(err)
        })
    }
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }
  render() {
    return (
      <Card className="mb-4">
        <div style = {{textAlign: "center"}}>
            <img src={logo} alt="" style={{ width: "50%" , height: "50%" , marginTop: "2em" , marginBottom: "2em"  }} />
            </div>
            <CardHeader className="border-bottom">
              <h6 className="m-0">User Registration </h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem >
                <Row >
                  <Col className="form-group">
                    <label >Full Name</label>
                    <FormInput
                      type="text"
                      placeholder="Enter your Full Name"
                      value={this.state.userName}
                      onChange={this.onChangeUserName}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col className="form-group">
                          <label>Email</label>
                          <FormInput
                            type="email"
                            placeholder="Enter your Email Address"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                          />
                        </Col>
                      </Row>

                      <Row >
                        <Col className="form-group">
                          <label>Password</label>
                          <FormInput
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                          />
                        </Col>
                      </Row>
                      <Row >
                        <Col className="form-group">
                          <label>Confirm Password</label>
                          <FormInput
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                          />
                          <label style={{ color: "red", borderBottom: "1px" }}>{this.state.passwordError}</label>
                        </Col>
                      </Row>
                      <Row style = {{width: "50%"}}>
                        <Col className="form-group">

                          <ReCaptcha
                            ref={(el) => { this.captchaDemo = el; }}
                            size="normal"
                            render="explicit"
                            sitekey="6Le-RrQUAAAAAOsjfBslPh4hr8JWT8WjX_96fPnP"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                            onChange={this.onChangeCaptcha}
                          />
                        </Col>
                      </Row>
                      <Row >
                        <Col className="form-group" style={{ textAlign: "center" }}>
                          <span style={{ fontWeight: "bold" }}>Already have an account? </span><Link to="/signin" Component={Signin}>Sign In</Link>

                        </Col>
                      </Row>

                    <div style={{ color: "red", borderBottom: "1px",textAlign:'center' }}>{this.state.errorMsg}</div>
                     <div style = {{textAlign: 'center'}}> <Button theme="accent" onClick={this.onClickRegister}>Register</Button></div>
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
  console.log("Redux=>", state.pageTitle);
  return {
    Title: state.pageTitle,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
