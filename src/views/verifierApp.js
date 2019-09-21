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
import logo from '../images/logo2.png'
import fileUpload from '../images/file.png'
import arrow from "../images/arrow.png"
import { USER_DATA, LOGIN_STATUS } from "../redux/actions/login-action"
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'
import loader from '../images/loader.gif'
import { useDropzone } from 'react-dropzone'
// import Dropzone from 'react-dropzone'
import Dropzone from "./Dropzone";
import { DropzoneArea } from 'material-ui-dropzone'




class VerifierApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    };
    // Binding Functions

  }
  handleChange(files) {
    this.setState({
      files: files
    });
  }
  render() {
    return (
      <div>
      <Card className="mb-3" style = {{marginBottom: "2em"}} >
        <div style={{ margin: "2em 4em 2em 4em" }}>
          <div style={{ textAlign: "center" }}>
            <img src={logo} alt="" style={{ width: "40%" }} />
          </div>

          <div style={{ margin: "2em 0em" ,textAlign: "center" }}>
            <h4 style = {{fontSize:"20px"}}>Certificate Verifier</h4>
          </div>
          <div style = {{marginBottom: "1em", textAlign: "center"}}>
            <Row>
                    <Col md = "10">    
                    <FormInput
                          type="text"
                          placeholder="Certificate Url"
                          
                        />
                        </Col>
            <Link to={{ pathname: "/Certificate", search: "?" + "5d848944135bd436b312c79a" }}><Button className = "worldcerts-button" style = {{border: "none"}} >Verify</Button></Link>
            </Row>
          </div>
          
          <div className="">
            <div className="">
              <Dropzone  />
            </div>
          </div>
        </div>
      </Card>
      <div style = {{textAlign: "center"}}>
      <img
      src = {arrow}
      width = "2%"
      />
      </div>
      <div style = {{textAlign: "center"}}>
      <img
      src = {fileUpload}
      width = "8%"
      />
      </div>

      <div style = {{textAlign: "center"}}>
        Drag the above demo certificate into the upload area
      </div>
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