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

class emailVerification extends Component {
  constructor(props) {
    super(props)
    this.state = {
        code: "",
      errorMsg:""
    }

    // Binding Functions
    this.onChangeCode = this.onChangeCode.bind(this)
    // this.onChangePassword = this.onChangePassword.bind(this)
    this.onClickVerify = this.onClickVerify.bind(this)

  }
  componentDidMount() {
    this.props.UpdateTitle("");
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
    if(this.state.code == ""){
      // console.log("All fields aur required")
      this.setState({
        errorMsg:"Code must not be empty"
      })
    }    
    else{
        

      let user = {
        code: this.state.code,
        
      }
      // console.log(user)
      // console.log(constants.server_url)
        this.props.history.push('/institute_registration')
  
      // axios.post(constants.server_url+'login' , user).then(response => {
      //   console.log(response.data.data.result)
      //   if(response.data.data.result=="Email or Password is wrong !"){
      //     // console.log("1st")
      //     this.setState({
      //       ErrorStatus:true,
      //       error:response.data.data.result
      //     })
      //   }
      //   else if(response.data.data.result=="Email not found"){
      //     // console.log("2nd")
      //     this.setState({
      //       ErrorStatus:true,
      //       error:response.data.data.result
      //     })
      //   }
      //   else{
          
      //     this.props.history.push('/institute_registration')
      //   }
      // })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }

  render() {
    return (
      <Card className="mb-4">
        <Row >
          <Col md = "7">
            <img src = {logo} alt = "" style = {{width : "100%"}}/>
          </Col>
          <Col md = "5">
        
        <ListGroup style = {{margin: "5em 3em"}} >
            <Row >
              <Col >
                <Form >
                     <Row >
                    <Col className="form-group">
                      <label>We have sent you the Verification Code at the xyz@gmail.com. Kindly check it</label>
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
                  <div style={{ color: "red", borderBottom: "1px",textAlign:'center' }}>{this.state.errorMsg}</div>

                  </Row>
                  
                 <div style = {{textAlign: "center"}}> <Button theme="accent" onClick = {this.onClickVerify}>Verify</Button></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(emailVerification);
