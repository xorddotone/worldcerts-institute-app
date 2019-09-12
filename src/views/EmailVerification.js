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
import { Link } from 'react-router-dom'
import Register from './Register'
import * as Routes from '../constants/apiRoutes'
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'
import axios from 'axios'
import logo from '../images/logo.png'
import loader from '../images/loader.gif'

import {LOGIN_STATUS,USER_DATA} from "../redux/actions/login-action"


class EmailVerification extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code: "",
      errorMsg: "",
      loader:false
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
    this.setState({
      loader:true
    })
    console.log(this.state.code)
    if (this.state.code == "") {
      // console.log("All fields aur required")
      this.setState({
        errorMsg: Strings.CODE_NOT_EMPTY,
        loader:false
      })
    }
    else {
      
      let user = {
        code: this.state.code,
      } 

      console.log(this.props.userData._id)

      // let tempUser=this.props.userData;
      console.log(this.props.userData,"========")
      // tempUser.isVerified=true
      // console.log(tempUser,"+++++++")
      let tempUser={
        _id:this.props.userData._id,
        classification:this.props.userData.classification,
        code:this.props.userData.code,
        email:this.props.userData.email,
        hash:this.props.userData.hash,
        isVerified:true,
        name:this.props.userData.name,
        registerInstitute:this.props.userData.registerInstitute

      }
      console.log(tempUser)
      axios.put(Routes.USER + this.props.userData._id, user).then(response => {
        console.log(response)
        console.log(response.data.result)
        if (response.data.result) {
          this.props.USER_DATA(tempUser)
          this.props.LOGIN_STATUS(true)  
          this.setState({
            loader:false
          })     
          this.props.history.push(Strings.INSTITUTE_MANAGEMENT)
        }
        else {
         
          this.setState({ errorMsg: Strings.CODE_NOT_EMPTY ,loader:false })
        }
      }).catch(err => {
        if(err.response.data.responseCode == Response.BAD_REQUEST){
          this.setState({
            errorMsg: err.response.data.responseMessage,
            loader: false
          })
        }
        console.log(err.response)
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
                        <label>We have sent you the Verification Code at the {this.props.userData.email} Kindly check it</label>
                      </Col>
                    </Row>
                    <Row >
                      <Col className="form-group">
                        <label>Verification Code</label>
                        <FormInput
                          type="text"
                          placeholder="Verification Code"
                          value={this.state.code}
                          onChange={this.onChangeCode}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                    <div style={{ textAlign: "center" }}> 
                    {( this.state.loader ) ? (<img src = {loader} className = "loader loader-paddingLeft" />) : (<button size="sm" className ="worldcerts-button" onClick={this.onClickVerify}>Verify</button>)} 
                      <div style={{ color: "red", textAlign: 'center' , marginTop: "1em"  }}>{this.state.errorMsg}</div>
                    </div>
                    </Col>
                    </Row>
                    <Row>
                      <Col>
                    <div style={{ textAlign: "center" , fontSize: "13px" , marginTop: "1em"}}> 
                    <span>if you want to skip now </span><Link to = "/manage_organization">click here</Link>
                    </div>
                    </Col>
                    </Row>
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
    LOGIN_STATUS: (statusLogin) => {
      dispatch(LOGIN_STATUS(statusLogin))
    },
    USER_DATA: (user) => {
      dispatch(USER_DATA(user))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);