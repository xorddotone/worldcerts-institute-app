import React, { Component } from "react";
import upload from '../images/upload.svg'
import logo from '../images/logo2.png'
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
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import {FileFormatCheck} from '../redux/actions/dashboard-action'
// import "./Dropzone.css";
var reader;


class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
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
    if (this.props.disabled) return;
    
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
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

    if (this.props.disabled) return;

    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
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
       console.log(temp.classification.id)
       console.log(temp.issuer.id)
       console.log(temp.participant.did)

       if(temp.classification.id!=' '   && temp.issuer.id!=' ' && temp.participant.did!=' ' && temp.classification.id!=''   && temp.issuer.id!='' && temp.participant.did!=''  && temp.classification.id!=undefined   && temp.issuer.id!=undefined && temp.participant.did!=undefined ){
         console.log("inside if condition")
         that.props.CHECK_FORMAT_FLAG(true)
         
       }
       else{
         
         that.props.CHECK_FORMAT_FLAG(false)
         console.log("else condition")
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
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          accept="application/pdf,application/json"
          multiple
          onChange={e=>{this.handleFileChoosen(e.target.files[0])}}
        />
        <img
          alt="upload"
          className="Icon"
          src={upload}
        />
        <span style = {{fontSize: "15px" , color: "grey" , marginBottom: "1em"}}>Drag n drop your JSON file, or click to select file</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    // userData: state.user_reducer.user
    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CHECK_FORMAT_FLAG: (dt) => {
      dispatch(FileFormatCheck(dt))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);
// export default Dropzone;
