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
import {Link} from 'react-router-dom'
import Register from './Register'
import * as constants from '../utils/constants'
import axios from 'axios'
import logo from '../images/logo.png'
import {USER_DATA} from "../redux/actions/login-action"


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      ErrorStatus: false,
      error: ''
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
      email: event.target.value
    })
  }

  onChangePassword(event) {
    console.log(event.target.value)
    this.setState({
      password: event.target.value
    })
  }

  onClickLogin() {
    if (this.state.email == " " || this.state.password == " " || this.state.email == "" || this.state.password == "") {
      // console.log("All fields aur required")
      this.setState({
        ErrorStatus: true,
        error:"All fields are required"
            })
    }

    else {
      let user = {
        email: this.state.email,
        password: this.state.password,
      }

      axios.post(constants.server_url+'login', user).then(response => {
        console.log(response.data.data.result )
        if (response.data.data.result == "Email or password is incorrect") {
          // console.log("1st")
          this.setState({
            ErrorStatus: true,
            error: response.data.data.result
          })
        }
        else if (response.data.data.result ==  "Email not found") {
          // console.log("2nd")
          this.setState({
            ErrorStatus: true,
            error: response.data.data.result
          })
        }
        else {
          console.log(response.data.data.result)
          this.props.USER_DATA(response.data.data.result)
          this.props.history.push('/manageInstitute')
        }
      })
        .catch(err => {
          console.log(err)
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
                        <span style={{ fontWeight: "bold" }}>Dont have an account? </span><Link to="/register" Component={Register}> Register</Link>

                      </Col>
                    </Row>
                    <div style={{ textAlign: "center" }}> <Button theme="accent" onClick={this.onClickLogin}>Login</Button></div>
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
  console.log("Redux=>", state);
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
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);