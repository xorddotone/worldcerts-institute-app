import React, { Component } from "react";
import {
  Container,
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
// import {useDropzone} from 'react-dropzone'
// import Dropzone from 'react-dropzone'



class VerifierApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
    }

    // Binding Functions
    
  }

  render() {
    return (
<div className = "verifierContainer ">
<Card className=" " >
        <Row >
          <Col md="3">
            <img src={logo} alt="" style={{ width: "100%" }} />
          </Col>
          <Col md = "9">
          
{/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone> */}
          </Col>
         
        </Row>
      </Card>
      <Link to={{ pathname: "/Certificate", search: "?"+"5d8465a0a6f602001738191a" }}><Button>Verify</Button></Link>
    
</div>
        
      
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifierApp);