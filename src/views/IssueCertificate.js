import React, { Component } from "react";
import {
  Container, Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Alert,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,

} from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'
import axios from 'axios'
import * as Routes from '../constants/apiRoutes'
import loader from "../images/loader.gif"
import CSVReader from 'react-csv-reader'
import ReactFileReader from 'react-file-reader';
// import ReactTable from "react-table";
// import "react-table/react-table.css";
import MaterialTable from 'material-table'
import certificate from '../images/certificate.png'
import { generateQrCodes } from '../utils/functions'




import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Icon from '@material-ui/core/Icon';


const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const tableIcons = {
  // Add:  forwardRef((props, ref) => <AddBox {...props} fontSize = "small" ref={ref} />),
  Add: forwardRef((props, ref) => <span> Add row<AddBox {...props} fontSize="medium" ref={ref} /> </span>),
  //  Add: ()=><span>Add row</span>,
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


class IssueCertificate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      certificateImage: '',
      fileName: '',
      data: [
        //   {
        //   did: "1398239",
        //   email: "abc@gmail.com",
        //   name: "carolina",
        //   phone: "6588888888",
        //   studentid: "3224"
        // }
      ],
      columns: [],
      registeredClassifications: [],
      classificationFields: [],
      selectedClassification: { classification: "Choose" },
      alertMessage: "",
      alertShow: false,
      classificationErrorShow: false,
      classificationErrorMessage: "",
      loading: false,
      cert: [
        {
          _id: 1222333,
          receiver_name: 'John',
          team_name: 'Xord'
        },
        {
          _id: 444443,
          receiver_name: 'Sami',
          team_name: 'Xord'
        }
      ],
      data2: null,
      // columns: [
      //   { title: 'Name', field: 'name' },
      //   { title: 'Did', field: 'did'},
      //   { title: 'Email', field: 'email' },
      //   { title: 'Phone' , field: 'phone'},
      //   { title: 'StudentId' , field: 'studentid'},
      // ],


      // columns: [
      //   { title: 'Name', field: 'name' },
      //   { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
      //   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      //   {
      //     title: 'Birth Place',
      //     field: 'birthCity',
      //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      //   },
      // ],
      // data: [
      //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      // ]

    }

    this.FileHandler = this.FileHandler.bind(this)
    this.csvJSON = this.csvJSON.bind(this)
    this.onIssueCertificate = this.onIssueCertificate.bind(this)
    this.getColumnsFromCSVFile = this.getColumnsFromCSVFile.bind(this)
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.getColumnsFromClassification = this.getColumnsFromClassification.bind(this)
  }

  // getColumns() {

  //   return Object.keys(this.state.data[0]).map(key => {
  //     console.log(key)
  //     return {
  //       title: key,
  //       field: key
  //     };
  //   });
  // }



  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }
  componentDidMount() {
    // console.log(this.props.userData)
    let temp;
    let that = this;
    // axios.get(Routes.CLASSIFICATION +this.props.userData._id)
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //     temp=response.data.result
    //     console.log(temp)
    //     that.setState({
    //       registeredClassifications:temp
    //     })

    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    if (this.props.selectedInstituteName.name != "Select Organization") {
      console.log("inside if")
      axios.get(Routes.CLASSIFICATION + this.props.selectedInstituteName.id)
        .then(function (response) {
          // handle success
          let obj = { classification: "Choose" }
          console.log(response);
          temp = response.data.result
          console.log(temp)
          temp.unshift(obj)
          that.setState({
            registeredClassifications: temp
          })

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    else {
      console.log("inside else")
      this.setState({
        classificationErrorShow: true,
        classificationErrorMessage: Strings.SELECT_ORGANIZATION,
      })
    }
  }
  FileHandler(data) {
    console.log(data)
  }

  handleFiles = files => {

    var reader = new FileReader();
    let temp;
    var temp1;
    console.log(files[0])
    let name = files[0].name
    this.setState({
      alertShow: false,
      fileName: name,
      data: null
    })
    let that = this
    reader.onload = function (e) {

      console.log(e)
      temp = reader.result
      console.log(temp)
      temp1 = that.csvJSON(temp)
      console.log(temp1)
      console.log(JSON.parse(temp1))

      // let uploadedData = JSON.parse(temp1)
      // console.log(uploadedData)


      that.getColumnsFromCSVFile(JSON.parse(temp1))
      // that.setState({
      //   data: JSON.parse(temp1),
      //   // data:[]
      // })
      // let obj = JSON.parse(temp1)

    }
    reader.readAsText(files[0]);
  }



  async onIssueCertificate() {

    // await generateQrCodes(this.state.cert);
    this.setState({
      loading: true
    })

    console.log("data => ", this.state.data)
    console.log("institute => ", this.props.selectedInstituteName)
    console.log(this.state.selectedClassification)
    if (this.state.data == null || this.state.selectedClassification == null || this.state.selectedClassification.classification == "Choose" || this.state.data.length==0) {
      this.setState({
        loading: false,
        alertShow: true,
        alertMessage: Strings.ALL_FIELDS_REQUIRED,
        theme: "danger"
      })
      return
    }
    let issuer = {
      id: this.props.selectedInstituteName.id
    }
    let recipient = this.state.data
    // let classificationObject = this.props.selectedClassification
    // let recipient = {name: "Mr Blockchain",
    // did: "DID:SG-NRIC:S99999999A",
    // email: "mr-blockchain@gmail.com",
    // phone: "+65 88888888",
    // studentId: "1232"}

    let classification = {
      id: this.state.selectedClassification._id,
      // description: this.state.selectedClassification.category,
      // issuedOn: "",
      // expiresOn: this.state.selectedClassification.durationValidity,
      // name: this.state.selectedClassification.classification,
    }
    console.log("classification => ", classification)




    // {
    //   name:this.props.selectedInstituteName.name ,
    //   id: this.props.selectedInstituteName.id,
    //   url: this.props.selectedInstituteName.url,
    //   email: this.props.selectedInstituteName.email,
    //   certificateStore: this.props.selectedInstituteName.certificateStore
    // }

    console.log("data => ", this.state.data)
    // let obj = [

    //   this.state.data
    // ]
    let temp = this.state.data
    // for (let i = 0; i < temp.length; i++) {
    //   // console.log(this.state.data[i].tableData)
    //   await delete temp[i].tableData
    // }
    console.log("temp => ", temp)
    var arrTemp=[];
    let checkFlag=false;
    //Data validation
    for(let key in temp){
      console.log(Object.values(temp[key]))
      console.log(Object.values(temp[key]).length-1!=this.state.columns.length)
      //adding -1 because material table add one extra field to data called tableData:(index)
      if(Object.values(temp[key]).length-1!=this.state.columns.length){
        checkFlag=true;
        break;
      }
      arrTemp.push(Object.values(temp[key]))
    }
    if(checkFlag){
      console.log("Data Missing")
      this.setState({
        loading: false,
        alertShow: true,
        alertMessage: "Data is Missing in Column",
        theme: "danger"
      })
    }
    else{
      console.log(arrTemp)
      for(let key in arrTemp){
        for(let i=0;i<arrTemp[key].length-1;i++){
          console.log(arrTemp[key][i])
          if(arrTemp[key][i]=="" || arrTemp[key][i]==" "){
            console.log("inside")
            this.setState({
              loading: false,
              alertShow: true,
              alertMessage: "Data is Missing in Column",
              theme: "danger"
            })
            checkFlag=true;
            break
          }
        }
        if(checkFlag){
          break
        }
        console.log("++++++++")
      }

    }
console.log(checkFlag)
if(!checkFlag){
  let obj = {
    classification,
    issuer,
    recipient: temp
  }
  console.log(this.props.selectedInstituteName.id)
  axios.post(Routes.ISSUE_CERTIFICATE, obj).then(response => {
    console.log(response)
    if (response.data.responseMessage == Strings.CERTIFICATE_ISSUED) {
      this.setState({
        loading: false,
        alertShow: true,
        alertMessage: response.data.result,
        theme: "info",
        data: [],
        fileName: ""
      })
    }
    else if (response.data.responseMessage == Strings.TRANSACTION_REVERTED) {
      this.setState({
        loading: false,
        theme: "danger",
        alertShow: true,
        alertMessage: response.data.responseMessage,
        data: [],
        fileName: ""

      })
    }
  })
    .catch(err => {
      console.log(err.response)
      if (err.response == undefined) {
        this.setState({
          loading: false,
          theme: "danger",
          alertShow: true,
          alertMessage: "Network Error",
          data: [],
          fileName: ""
        })
      }
      else if (err.response.data.responseCode == Response.SERVER_ERROR) {
        this.setState({
          loading: false,
          theme: "danger",
          alertShow: true,
          alertMessage: "Internal Server Error! Please Try Again",
          data: [],
          fileName: ""
        })
      }
      else if (err.response.data.responseMessage == Strings.INVALID_FILE_UPLOADED || err.response.data.responseMessage == Strings.COULD_NOT_CREATE_PARTICIPANT) {
        this.setState({
          loading: false,
          theme: "danger",
          alertShow: true,
          alertMessage: err.response.data.responseMessage,
          data: "",
          fileName: ""
        })

      }
      else if (err.response.data.responseMessage == Strings.TRANSACTION_REVERTED) {
        this.setState({
          loading: false,
          theme: "danger",
          alertShow: true,
          alertMessage: err.response.data.responseMessage,
          data: [],
          fileName: ""

        })
      }
      else {
        console.log("**** err" + err.response.data.responseMessage)
      }

    })
}
    
  }
  csvJSON(cssv) {

    let lines = cssv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length - 1; i++) {
      let obj = {};
      let currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);

    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  getColumnsFromCSVFile(dt) {
    console.log(dt)
    let temp = []
    Object.keys(dt[0]).map(key => {
      // console.log(key)
      let obj = {
        title: key,
        field: key
      }
      temp.push(obj)
    });
    console.log(temp)
    if(this.state.columns.length==temp.length){
      console.log("Number of fields same")
      var matchCsvAndClassificationColumn=true
      let tempFieldsArray=[]
      for (var key in temp) {
        tempFieldsArray.push(temp[key].title)
        // console.log(temp[key].title)
      }
      console.log("tempFieldsArray ==>", tempFieldsArray)
      for (var key in tempFieldsArray){
        console.log(this.state.columns[key].title)
        let checkFlag=tempFieldsArray.includes(this.state.columns[key].title)
        console.log(checkFlag)
        if(!checkFlag){
          matchCsvAndClassificationColumn=false;
        }
      }
      console.log(matchCsvAndClassificationColumn)
      if(matchCsvAndClassificationColumn){
        this.setState({
          data: dt,
          // data:[]
        })
      }
      else{
        this.setState({
          theme: "danger",
          alertShow: true,
          alertMessage: "Wrong File",
        })  
        // console.log("Wrong File Uploaded")
      }

    }
    else{
      this.setState({
        theme: "danger",
        alertShow: true,
        alertMessage: "Please Upload A file that contain same fields as mention in below table",
      })
      // console.log("Please Upload A file that contain same fields as mention in below table")
    }
    
    // this.setState({ columns: temp })
  }


  getColumnsFromClassification(temp) {
    // let temp=["name","did","email","phone","studentid"]
    let temp1 = []
    for (let i = 0; i < temp.length; i++) {
      let obj = {
        title: temp[i],
        field: temp[i]
      }
      temp1.push(obj)
    }
    console.log(temp1)
    this.setState({
      columns: temp1
    })


  }


  categoryChangeHandler(ev) {
    console.log(ev.target.value)
    console.log(this.state.registeredClassifications[ev.target.value])
    console.log(this.state.registeredClassifications[ev.target.value].certificateImageUrl)
    console.log(this.state.registeredClassifications.combineFields)
    this.setState({
      alertShow: false,
      selectedClassification: this.state.registeredClassifications[ev.target.value],
      certificateImage: this.state.registeredClassifications[ev.target.value].certificateImageUrl,
      classificationFields: this.state.registeredClassifications.combineFields
    })
    console.log(this.state.registeredClassifications[ev.target.value].combineFields)
    if (ev.target.value != 0) {

      this.getColumnsFromClassification(this.state.registeredClassifications[ev.target.value].combineFields)
    }
    // this.setState({category: this.state.registeredClassifications[e.target.value].obj})
    // this.setState({
    //   category: ev.target.value
    // })
  }
  dismiss() {
    this.setState({ alertShow: false });
  }
  render() {
    //   if(this.state.data){
    //   this.getColumns()
    // }
    console.log(this.state)

    return (
      <Container fluid className="main-content-container px-4">
        <Alert className="mb-0" open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
          <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
        </Alert>
        <Row noGutters className="page-header py-4">
          <PageTitle title="Issue Certificate" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
          {/* subtitle="Registration" */}
        </Row>
        <Row>
          <Col lg="7" md="12">
            <label>Select Classification</label>
            {(this.state.classificationErrorShow) ? (<label style={{ float: "right", fontSize: "12px" }}>{this.state.classificationErrorMessage}</label>) : (null)}
            <FormSelect placeholder="Category" onChange={this.categoryChangeHandler} >
              {/* <option>category</option> */}
              {console.log(this.state.registeredClassifications)}

              {
                this.state.registeredClassifications.map((category, index) => {
                  return (
                    // console.log(category.categoryName)
                    <option key={index} value={index}>{category.classification}</option>

                  )
                })
              }
            </FormSelect>
            {(this.state.selectedClassification.classification != 'Choose') ? (
              <>
                <label style={{ marginTop: "3em" }} className="cursor-default">Select a CSV file to upload</label>

                <ReactFileReader
                  handleFiles={this.handleFiles.bind(this)} fileTypes={'.csv'} >

                  {/* <button className='btn' style={{ border: '1px solid' }}>Upload File</button> */}
                  <button onClick={() => { this.setState({ data2: null }) }} size="sm" className="mb-2 mr-1 worldcerts-button"

                  >Upload File</button>
                  <span style={{ color: 'green', paddingLeft: "1em" }}>{this.state.fileName}</span>
                </ReactFileReader>
              </>
            ) : (null)}


          </Col>
          <Col lg="5" md="12">
            <Card small className="mb-3">
              <CardBody className="p-0">
                {(this.state.certificateImage) ? (<img src={this.state.certificateImage} alt="certificate" height="100%" width="100%" />) : (null)}
              </CardBody>

            </Card>
          </Col>
        </Row>
        <Row noGutters className="page-header py-4">
          <PageTitle title="Issue Certificate" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
          {/* subtitle="Registration" */}
        </Row>
        {(this.state.loading == true) ?
          (<img src={loader} className="loader" style={{ marginBottom: "2em" }} />) :
          (<label style={{ marginBottom: "2em" }} size="sm" className="worldcerts-button" onClick={this.onIssueCertificate}>Issue</label>)}
        {/* <CSVReader
          cssClass="csv-reader-input"
          label="Select CSV File"
          onFileLoaded={this.FileHandler}
          onError={this.handleDarkSideForce}
          inputId="ObiWan"
          inputStyle={{color: 'red'}}
        /> */}
        {
          (this.state.selectedClassification.classification != 'Choose') ? (
            // <ReactTable
            //       data={this.state.data}
            //       columns={this.getColumns()}
            //       defaultPageSize={10}
            //       className="-striped -highlight"
            //     />
            <div style={{ marginBottom: "2em" }}>
              <MaterialTable
                title="Recievers List"
                columns={this.state.columns}
                data={this.state.data}
                icons={tableIcons}
                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          console.log(this.state)
                          console.log(this.state.data)
                          const data = this.state.data;
                          console.log(newData, "aaaa", this.state.data)
                          data.push(newData);
                          console.log(data)
                          this.setState({ data }, () => resolve());
                        }
                        resolve()
                      }, 1000)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          const data = this.state.data;
                          const index = data.indexOf(oldData);
                          console.log(index)
                          data[index] = newData;
                          console.log(data)
                          this.setState({ data }, () => resolve());
                        }
                        resolve()
                      }, 1000)
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        {
                          let data = this.state.data;
                          const index = data.indexOf(oldData);
                          data.splice(index, 1);
                          this.setState({ data }, () => resolve());
                        }
                        resolve()
                      }, 1000)
                    }),

                }}
              />
            </div>
          ) : (null)
        }

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    // Title: state.pageTitle,
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    // userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueCertificate);