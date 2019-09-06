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
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Register from './Register'
import * as Routes from '../constants/apiRoutes'
import axios from 'axios'
import logo from '../images/logo.png'
import { USER_DATA,LOGIN_STATUS } from "../redux/actions/login-action"
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'
import loader from '../images/loader.gif'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      ErrorStatus: false,
      error: '',
      loading:false
    }

    // Binding Functions
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onClickLogin = this.onClickLogin.bind(this)
  }

  componentDidMount() {
    // this.props.UpdateTitle("");
  }

  onChangeEmail(event) {
    console.log(event.target.value)
    this.setState({
      ErrorStatus:false,
      error: "",
      email: event.target.value
    })
  }

  onChangePassword(event) {
    console.log(event.target.value)
    this.setState({
      ErrorStatus:false,
      error: "",
      password: event.target.value
    })
  }

  onClickLogin() {
   
    if (this.state.email == " " || this.state.password == " " || this.state.email == "" || this.state.password == "") {
      // console.log("All fields aur required")
      this.setState({
        ErrorStatus: true,
        error: Strings.ALL_FIELDS_REQUIRED,
        loader: false
      })
    }
    else {
      this.setState({
        loader:true
      })
      let user = {
        email: this.state.email,
        password: this.state.password,
      }
      axios.post(Routes.LOGIN_USER, user).then(response => {
        console.log(response)
       if(response.data.responseCode == Response.SUCCESS) {
          this.props.USER_DATA(response.data.result)
          this.props.LOGIN_STATUS(true)
          this.setState({
            loader:false
          })
          this.props.history.push('/manageInstitute')
        }
      })
        .catch(err => {
          console.log(err)
          console.log(err.response.data.responseMessage)
          if(err.response.data.responseCode == Response.BAD_REQUEST){
          this.setState({
            ErrorStatus: true,
            error: err.response.data.responseMessage,
            loader:false
          })
        }
        
        //   console.log(err.response)
        //   if (err.response.data.responseCode == Response.BAD_REQUEST) {
        //     // console.log("1st")
        //     this.setState({
        //       ErrorStatus: true,
        //       error: err.response.data.responseMessage
        //     })
        //   }
        //   else if (err.response.data.responseCode == Response.SERVER_ERROR) {
        //     // console.log("2nd")
        //     this.setState({
        //       ErrorStatus: true,
        //       error: err.response.data.responseMessage
        //     })
        //   }
        // 
      })
    }
  }

  render() {
    return (
      <Card className="mb-4">
        <Row >
          <Col md="7">
            <img src={logo} alt="" style={{ width: "100%" }} />
          </Col>
          <Col md="5">

            <ListGroup style={{ margin: "5em 3em" }} >
              <Row >
                <Col >
                  <Form >
                    <Row >
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
                        {(this.state.ErrorStatus) ? (

                          <label style={{ color: "red", borderBottom: "1px" }}>{this.state.error}</label>
                        ) : (null)}
                      </Col>
                    </Row>
                    <Row >
                      <Col className="form-group" style={{ textAlign: "center" }}>
                        <span style={{ fontWeight: "bold" }}>Dont have an account? </span><Link to="/register" style = {{  color: "#00D0A9"  , fontWeight: "bold" , fontSize:  "" }} Component={Register}> Register</Link>

                      </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}> 
                    
                    {( this.state.loader ) ? (<img src = {loader} style = {{height : "8%"}} />) : (<Button size="sm" theme = "success" style = {{backgroundColor: "lightgreen" , color: "#0000008c" , padding: "0.5em 3em", fontSize: "12px" , fontWeight: "bold"}} className="mb-2 mr-1" onClick={this.onClickLogin}>Login</Button>)} 
                    </div>
                  </Form>
                </Col>
              </Row>
            </ListGroup>
          </Col>
        </Row>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    userData: state.user_reducer.user
    // Title: state.pageTitle,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);