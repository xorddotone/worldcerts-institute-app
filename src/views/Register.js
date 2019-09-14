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
import loader from '../images/loader.gif'


// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import axios from 'axios'
import Signin from './Login'
import * as Routes from '../constants/apiRoutes'
import {USER_DATA,LOGIN_STATUS} from "../redux/actions/login-action"
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'

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
    // this.props.UpdateTitle("User Regsitration");
    if (this.captchaDemo) {
      console.log("started, just a second...")
      this.captchaDemo.reset();
    }
  }

  onChangeUserName(event) {
    // console.log(event.target.value)
    this.setState({
      userName: event.target.value,
      errorMsg: ""
    })
  }

  onChangeEmail(event) {
    // console.log(event.target.value)
    this.setState({
      email: event.target.value,
      errorMsg: ""
    })
  }

  onChangePassword(event) {
    // console.log(event.target.value)
    this.setState({
      password: event.target.value,
      errorMsg: ""
    })
  }

  onChangeConfirmPassword(event) {
    // console.log(event.target.value)
    this.setState({
      confirmPassword: event.target.value
    })
    if (event.target.value !== this.state.password) {
      this.setState({ passwordError: Strings.PASSWORD_NOT_MATCHED })
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
      console.log("hello")
      this.setState({
        loader:false,
        errorMsg: Strings.ALL_FIELDS_REQUIRED
      })
      // console.log("All Fields are required")
    }
    else if(this.state.password!==this.state.confirmPassword){
      this.setState({
        loader:false,
        errorMsg: Strings.PASSWORD_NOT_MATCHED
      })
      // console.log("Password Does Not matched")
    }
    else {
      this.setState({
        loader:true
      })
      let user = {
        name: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        // confirmPassword: this.state.confirmPassword
      }
      
      axios.post(Routes.SIGN_UP_USER , user).then(response => {
        console.log(response)
        console.log(response.data.responseCode)
        if(response.data.responseCode == Response.SUCCESS){
          this.props.USER_DATA(response.data.result)
          this.setState({
            loader:false
          })
          this.props.history.push('/emailVerification')
        }
      })
        .catch(err => {
          console.log(err)
          if(err.response !== undefined){
          if(err.response.data.responseCode == Response.BAD_REQUEST){
            this.setState({errorMsg: err.response.data.responseMessage , loader: false})
          }
          else if(err.response.data.responseCode == Response.SERVER_ERROR){
            this.setState({errorMsg: err.response.data.responseMessage , loader:false})
          }
        }
        else{
          this.setState({errorMsg: "Network Error" , loader: false})
        }
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

  clickEnter(event){
    console.log(event.key)
  
    if(event.key=="Enter"){
      this.onClickRegister()
    }
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
                        onKeyPress={this.clickEnter.bind(this)}
                      
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
                        onKeyPress={this.clickEnter.bind(this)}
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
                        onKeyPress={this.clickEnter.bind(this)}
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
                        onKeyPress={this.clickEnter.bind(this)}
                        type="password"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.onChangeConfirmPassword}
                          />
                          <label style={{ color: "red", borderBottom: "1px" }}>{this.state.passwordError}</label>
                        </Col>
                      </Row>
                    <div style = {{width: "100%"}}>
                      <Row >
                        <Col className="form-group">

                          <ReCaptcha
                        onKeyPress={this.clickEnter.bind(this)}
                            
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
                      </div>
                      <Row >
                        <Col className="form-group" style={{ textAlign: "center" }}>
                          <span style={{ fontWeight: "bold" }}>Already have an account? </span><Link to="/signin" style = {{  color: "#00D0A9" , fontWeight: "bold" }} Component={Signin}>Sign In</Link>

                        </Col>
                      </Row>

                    <div style={{ color: "red", borderBottom: "1px",textAlign:'center' }}>{this.state.errorMsg}</div>
                     <div style = {{textAlign: 'center'}}> 
                    {( this.state.loader ) ? (<img src = {loader} className = "loader" />) : (<span size="sm" className="mb-2 mr-1 worldcerts-button" onClick={this.onClickRegister}>Register</span> )} 
                     </div>
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
    USER_DATA: (user) => {
      dispatch(USER_DATA(user))
    },
    LOGIN_STATUS: (statusLogin) => {
      dispatch(LOGIN_STATUS(statusLogin))
    },
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);