import React, { Component } from "react";
import upload from '../../images/upload.svg'
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  InputGroup,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { connect } from 'react-redux';
import * as Strings from '../../constants/strings'
import { EditClassification, EditClassificationState, Image } from "../../redux/actions/dashboard-action"
import Example from '../CertificateBuilder/example'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";

class ClassificationDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hightlight: true,
      // certificate : this.props.editClassificationData.certificateImage.certificateImageUrl,
      certificate: '',
      alertShow: false,
      theme: "",
      alertMessage: ""

    };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  componentDidMount() {
    console.log(this.props.imageFile)
    if (this.props.imageFile.name != null && this.props.imageFile.name != undefined && this.props.imageFile.name != "") {
      console.log(this.props.imageFile.name)
      console.log("in if")
      document.getElementById("uploadButton").hidden = true;
      this.setState({
        certificate: URL.createObjectURL(this.props.imageFile)
      })
    }
    else if (this.props.editClassificationState) {
      console.log("in else if")
      console.log("CERTIFICATE URL", this.props.editClassificationData.certificateImage.certificateImageUrl)
      this.setState({
        certificate: this.props.editClassificationData.certificateImage.certificateImageUrl
      })
      this.props.IMAGE(this.props.editClassificationData.certificateImage.certificateImageUrl)
      document.getElementById("uploadButton").hidden = true;

    }
  }

  openFileDialog() {
    if (this.props.disabled) return;

    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    console.log(evt)
    this.handleFileChoosen(evt.target.files[0])
    if (this.props.disabled) return;

    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    console.log(files)
  }

  onDragOver(evt) {
    // evt.preventDefault();
    window.addEventListener("dragover", function (e) {
      e = e || evt;
      e.preventDefault();
    }, false);
    if (this.props.disabled) return;

    this.setState({ hightlight: true });
  }

  onDragLeave() {

    this.setState({ hightlight: false });
  }

  onDrop(event) {
    console.log(event)
    // event.preventDefault();
    window.addEventListener("drop", function (e) {
      e = e || event;
      e.preventDefault();
    }, false);
    console.log(event.dataTransfer.getData("image/jpeg"))
    console.log(event, event.dataTransfer)
    console.log(event.dataTransfer)
    console.log(event.dataTransfer.files)
    if (this.props.disabled) return;
    console.log(event.dataTransfer)

    if (event.dataTransfer.files[0] == undefined) {
      console.log("IN 1st If")
      alert("invalid file uploaded")
    }
    else {

      if (event.dataTransfer.files[0].type == "image/jpg" || event.dataTransfer.files[0].type == "image/png" || event.dataTransfer.files[0].type == "image/jpeg") {

        console.log("In If png spotted")
        const files = event.dataTransfer.files;
        this.handleFileChoosen(files[0]);
      }
      else {
        console.log("IN 2nd If")

        alert("invalid file uploaded")
      }
    }


  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  async handleFileChoosen(files) {
    let that = this
    console.log(files)
    // let temp = URL.createObjectURL(files)
    // console.log("temp.naturalWidht ==>",temp.naturalWidth )
    // console.log("temp.naturalHeight ==>",temp.naturalHeight )
    var img = document.createElement("img");

    img.src = URL.createObjectURL(files);

    img.onload = await function () {
      var width = img.naturalWidth,
        height = img.naturalHeight;

      URL.revokeObjectURL(img.src);

      console.log("temp.naturalWidht ==>", width)
      console.log("temp.naturalHeight ==>", height)

      if (width > 500 & height > 500) {
        console.log("IN IFFFF")
        that.props.IMAGE(files)
        that.setState({
          certificate: URL.createObjectURL(files),
          alertShow: false,
        })
        document.getElementById("uploadButton").hidden = true;
      }
      else {
        console.log("IN Elsee")

        that.setState({
          alertShow: true,
          theme: "danger",
          alertMessage: "Certificate width and height must be greater than 500px"
        })
      }
    }
  }


  render() {
    return (

      <Container fluid className="main-content-container px-4">
        {/* <Alert className="mb-0" open = {this.state.alertShow} theme = {this.state.theme} >
       <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
    </Alert> */}
        <Row>
          <Col lg="12">

            {/* <div id = "uploadButton" style = {{textAlign: 'center' , verticalAlign: 'center', border: '1px dashed',padding: "15%"}}>
          <ReactFileReader
            handleFiles={this.handleFiles.bind(this)} fileTypes={['.png', '.jpg', '.jpeg']} 
            >

            <button  size="sm" className="mb-2 mr-1 worldcerts-button"

            >Upload Certificate</button>
          </ReactFileReader>
          </div> */}
            <div id="uploadButton">
              <div style={{ margin: "0em 0em 02em 0em" }}>

                {/* <h4 style={{ fontSize: "20px", marginTop: "1em", textAlign: "center" }}>Upload Certificate</h4> */}

                <div style={{ marginBottom: "1em", textAlign: "center" }}>
                  <div
                    className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                    style={{ background: "transparent" }}

                    style={{ cursor: this.props.disabled ? "default" : "pointer" }}
                  >
                    <div style={{ textAlign: "center", border: "1px dashed grey", background: "transparent", padding: "9em 0em" }} onClick={this.openFileDialog}>
                      <input
                        ref={this.fileInputRef}
                        className="FileInput"
                        type="file"
                        // ,image/png,image/png
                        accept="image/jpg,image/png,image/jpeg"
                        multiple
                        onChange={e => { this.handleFileChoosen(e.target.files[0]) }}
                        onChange={this.onFilesAdded}
                      // onDrop={acceptedFiles => console.log(acceptedFiles)}
                      />

                      <img
                        alt="upload"
                        className="Icon"
                        src={upload}
                      />

                      <span style={{ fontSize: "13px", color: "grey" }}> Drag n drop your Certificate, or click to select file</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {console.log(this.props.imageFile)}
          {console.log(this.props.imageFile)}
          {console.log(this.state.certificate)}
          {(this.state.certificate == "") ? (null) :
            (<DndProvider backend={HTML5Backend}>
              {console.log("in the container")}
              <Example />
            </DndProvider>)}

        </Row>
      </Container>

    );
  }
}
// pathname: "/Certificate"+ this.props.uploadedFileData.classification.id, search: "?" + this.props.uploadedFileData.participant.id

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user,
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    editClassificationState: state.dashboard_reducer.editClassificationState,
    editClassificationData: state.dashboard_reducer.editClassificationData,
    imageFile: state.dashboard_reducer.image
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassificationDropzone));
// export default Dropzone;
