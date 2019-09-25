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
import {Link} from 'react-router-dom'
import Register from './Register'
import * as Routes from '../constants/apiRoutes'
import axios from 'axios'
import logo from '../images/logo.png'

class emailVerification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code: "",
      errorMsg: ""
    }

    // Binding Functions
    this.onChangeCode = this.onChangeCode.bind(this)
    // this.onChangePassword = this.onChangePassword.bind(this)
    this.onClickVerify = this.onClickVerify.bind(this)
  }

  componentDidMount() {

  }

  onChangeCode(event) {
    console.log(event.target.value)
    this.setState({
      code: event.target.value
    })
  }

  //   onChangePassword(event) {
  //     console.log(event.target.value)
  //     this.setState({
  //       password: event.target.value
  //     })
  //   }

  onClickVerify() {
    console.log(this.state.code)
    if (this.state.code == "") {
      // console.log("All fields aur required")
      this.setState({
        errorMsg: ""
      })
    }
    else {
      let user = {
        code: this.state.code,
      }

      console.log(this.props.userData._id)

      axios.put(Routes.server_url + "verifyUser/" + this.props.userData._id, user).then(response => {
        console.log(response)
        console.log(response.data.data.result)
        if (response.data.data.result) {
          this.props.history.push('/organization_registration')
        }
        else {
          this.setState({ errorMsg: "Invalid Code"})
        }
      }).catch(err => {
        console.log(err.response)
      })
    }
  }

  clickEnter(event){
    console.log(event.key)
  
    if(event.key=="Enter"){
      this.onClickVerify()
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
                        <label>We have sent you the Verification Code at the {this.props.userData.email} Kindly check it</label>
                      </Col>
                    </Row>
                    <Row >
                      <Col className="form-group">
                        <label>Verification Code</label>
                        <FormInput
                        onKeyPress={this.clickEnter.bind(this)}
                          type="text"
                          placeholder="Verification Code"
                          value={this.state.code}
                          onChange={this.onChangeCode}
                        />
                      </Col>
                      <div style={{ color: "red", borderBottom: "1px", textAlign: 'center' }}>{this.state.errorMsg}</div>
                    </Row>
                    <div style={{ textAlign: "center" }}> <span onClick={this.onClickVerify}>Verify</span></div>
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
  console.log("redux =>" , state);
  return {
    userData: state.user_reducer.user
    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(emailVerification);
