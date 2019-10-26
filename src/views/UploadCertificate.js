

import React, { Component } from "react";
import {
  Container, Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  InputGroup,
  Alert,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  FormTextarea,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react"; import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'
import axios from 'axios'
import * as Routes from '../constants/apiRoutes'
import loader from '../images/loader.gif'
import { EditClassification, EditClassificationState, Image } from "../redux/actions/dashboard-action"
import { Link } from 'react-router-dom'
import ReactFileReader from 'react-file-reader';
import Example from './CertificateBuilder/example'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const duration = [
  "Choose", "year", "months", "days"
]



class UploadCertificate extends Component {
  imgEl = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      certificate: "",
    }
    this.handleSize = this.handleSize.bind(this)
  }
 
  handleFiles(file) {
    console.log(file[0])
    this.setState({
        certificate: URL.createObjectURL(file[0])
      })
    this.props.IMAGE(file[0])
  }
  handleSize(image) {
    console.log(image)
    console.log("width", image.offsetWidth, image.offsetHeight)
  }

  render() {
    console.log("REndering Upload Certificate")
    return (


      <Container fluid className="main-content-container px-4">
        {/* <Alert className="mb-0" open={true} theme="danger">
          <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to = "account_activation" style = {{color:"white" , fontWeight: "bold"}}>click here</Link> to verify it.
        </Alert>
         <Alert className="mb-0" open = {this.state.alertShow} theme = {this.state.theme} dismissible={this.dismiss}>
         <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
      </Alert> */}
        <Row>
          <Col lg="12">


            <ReactFileReader
              handleFiles={this.handleFiles.bind(this)} fileTypes={['.png', '.jpg', '.jpeg']} >

              <button size="sm" className="mb-2 mr-1 worldcerts-button"

              >Upload Cetificate</button>
            </ReactFileReader>

          </Col>
          {/* <img src = {this.state.certificate}  ref={this.imgEl} width= "100%"
        onLoad={() => console.log(this.imgEl.current.naturalHeight, this.imgEl.current.naturalWidth)} /> */}
        {console.log(this.props.imageFile)}
{(this.state.certificate =="")? (null): 
(<DndProvider backend={HTML5Backend}>
  {console.log("in the container")}
            <Example />
          </DndProvider>)}
          
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user,
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    editClassificationState: state.dashboard_reducer.editClassificationState,
    editClassificationData: state.dashboard_reducer.editClassificationData,
    imageFile : state.dashboard_reducer.image

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    EditClassification: (data) => {
      dispatch(EditClassification(data))
    },
    EditClassificationState: (data) => {
      dispatch(EditClassificationState(data))
    },
    IMAGE: (imageFile) => {
      dispatch(Image(imageFile))
    },
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadCertificate);
