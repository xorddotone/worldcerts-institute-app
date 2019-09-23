import React, { Component } from "react";
import upload from '../images/upload.svg'
import logo from '../images/logo2.png'
import {
  Container,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  InputGroup,
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
import * as Strings from '../constants/strings'
import {FileFormatCheck, VerifyFileData} from '../redux/actions/dashboard-action'
import {Link} from 'react-router-dom'
// import {FileFormatCheck} from '../redux/actions/dashboard-action'
// import "./Dropzone.css";
var reader;

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: true };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleFileChoosen=this.handleFileChoosen.bind(this)
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    console.log(evt)
    // this.handleFileChoosen(evt.target.files)
    if (this.props.disabled) return;
    
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    console.log(files)
  }

  onDragOver(evt) {
    evt.preventDefault();

    if (this.props.disabled) return;

    this.setState({ hightlight: true });
  }

  onDragLeave() {
    
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();
console.log(event.target)
    if (this.props.disabled) return;

    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.handleFileChoosen(files[0]);
      console.log(array)
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  handleFileChoosen(files){
    let that=this
    console.log(files)
   reader= new FileReader();
    reader.onloadend= function (e){
        let content=reader.result
        console.log(content)
       console.log(JSON.parse(content))
       let temp= JSON.parse(content)
      //  console.log(temp.classification.id)
      //  console.log(temp.issuer.id)
      //  console.log(temp.participant.did)
      if(temp.classification!=undefined && temp.classification!="" && temp.classification!=' ' && temp.issuer!=undefined && temp.issuer!="" && temp.issuer!=' ' && temp.participant!=undefined && temp.participant!="" && temp.participant!=' ' ){
        if(temp.classification.id!=' '   && temp.issuer.id!=' ' && temp.participant.did!=' ' && temp.classification.id!=''   && temp.issuer.id!='' && temp.participant.did!=''  && temp.classification.id!=undefined   && temp.issuer.id!=undefined && temp.participant.did!=undefined &&  temp.classification!=undefined && temp.issuer!=undefined && temp.participant!=undefined ){
          console.log("inside if condition")
          that.props.CHECK_FORMAT_FLAG(true)
          that.props.VERIFY_FILE_DATA(temp)
 
        }
        else{
          that.props.CHECK_FORMAT_FLAG(false)
          console.log("wrong file uploaded")
        }
      }
      else{
        that.props.CHECK_FORMAT_FLAG(false)
        console.log("wrong File uploaded")
      }
       
    }
    reader.readAsText(files)


    // onChange={e=>{this.handleFileChoosen(e.target.files[0])}}
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
         <Row>
              
              <Col md="12" className="form-group">

                <InputGroup className="mb-10">
                  <FormInput
                    type="text"
                    placeholder="Certificate Url"

                  />
                  {(this.props.FileFormatFlag && this.props.uploadedFileData.classification!=undefined && this.props.uploadedFileData.participant!=undefined)?(

                                    <Link to={{ pathname: "/Certificate", search: "?" + this.props.uploadedFileData.participant.did }} >  <span type="append" className="worldcerts-button verifierAppButton" style={{ border: "none" , borderRadius: "0rem" }}>  Verify</span> </Link>
                  ):(
                     <span type="append" className="worldcerts-button verifierAppButton" style={{ border: "none" , borderRadius: "0rem" }}>  Verify</span> 

                  )}

                </InputGroup>
              </Col>
            </Row>
        <Row style = {{padding: "0 4px"}}>
          <Col md="9">
            <div style = {{float: "left"}}>
            <input
              ref={this.fileInputRef}
              className="FileInput"
              type="file"
              accept="application/json"
              multiple
              onChange={e=>{this.handleFileChoosen(e.target.files[0])}}
            />

            <img
              alt="upload"
              className="Icon"
              src={upload}
            />

            <span  onClick={this.openFileDialog} style={{ fontSize: "13px", color: "grey" }}> Drag n drop your JSON file, or click to select file</span>
            </div>
          </Col>
          <Col md="3">
            <img src={logo} alt="" style={{ width: "100%" }} />
          </Col>
        </Row>
        
      </div>
    );
  }
}
// pathname: "/Certificate"+ this.props.uploadedFileData.classification.id, search: "?" + this.props.uploadedFileData.participant.id

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    FileFormatFlag:state.dashboard_reducer.FileFormatFlag,
    uploadedFileData:state.dashboard_reducer.uploadedFileData,
    // userData: state.user_reducer.user
    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CHECK_FORMAT_FLAG: (dt) => {
      dispatch(FileFormatCheck(dt))
    },
    VERIFY_FILE_DATA: (dt) => {
      dispatch(VerifyFileData(dt))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);
// export default Dropzone;
