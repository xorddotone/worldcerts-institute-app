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
import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Register from './Register'
import * as constants from '../utils/constants'
import axios from 'axios'
import logo from '../images/logo.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }

    // Binding Functions
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onClickLogin = this.onClickLogin.bind(this)

  }
  componentDidMount() {
    this.props.UpdateTitle("User Login");
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
    let user = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log("in on click")
    console.log(user)
console.log(constants.server_url)
      this.props.history.push('/institute_registration')

    // axios.post('http://169.254.69.231:3000/login' , user).then(response => {
    //   console.log(response)
    //   this.props.history.push('/institute_registration')
    // })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  render() {
    return (
      <Card className="mb-4">
        <Row >
          <Col md = "7">
            <img src = {logo} alt = "" style = {{width : "100%"}}/>
          </Col>
          <Col md = "5">
        <CardHeader className="border-bottom">
          <h6 className="">User Login </h6>
        </CardHeader>
        <ListGroup >
          <ListGroupItem className="">
            <Row>
              <Col>
                <Form>
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
                    </Col>
                  </Row>
                  <Row >
                    <Col className="form-group" style = {{textAlign: "center" }}>
                      <label style = {{fontWeight: "bold" }}>Dont have an account? </label><Link to = "/register" Component = {Register}>Register</Link>
                   
                    </Col>
                  </Row>
                  <Button theme="accent" onClick = {this.onClickLogin}>Login</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
        </Col>
        </Row>
      </Card>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("redux =>", state.pageTitle);
  return {
    Title: state.pageTitle,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
