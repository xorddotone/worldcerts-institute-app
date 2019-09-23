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
import {Link} from 'react-router-dom'
import {FileFormatCheck} from '../redux/actions/dashboard-action'
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

       if(temp.classification.id!=' '   || temp.issuer.id!=' ' || temp.participant.did!=' ' || temp.classification.id!=''   || temp.issuer.id!='' || temp.participant.did!=''  || temp.classification.id!=undefined   || temp.issuer.id!=undefined || temp.participant.did!=undefined ){
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
        
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
         <Row>
              
              <Col md="12" className="form-group">

                <InputGroup className="mb-10">
                  <FormInput
                    type="text"
                    placeholder="Certificate Url"

                  />
                  <Link to={{ pathname: "/Certificate", search: "?" + "5d848944135bd436b312c79a" }} >  <span type="append" className="worldcerts-button verifierAppButton" style={{ border: "none" , borderRadius: "0rem" }}>  Verify</span> </Link>

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
              accept="application/pdf,application/json"
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
