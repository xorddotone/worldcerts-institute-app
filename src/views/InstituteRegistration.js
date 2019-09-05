import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  Alert
} from "shards-react";
import { connect } from 'react-redux';
import * as constants from '../constants/apiRoutes'
import axios from 'axios'
import PageTitle from "../components/common/PageTitle";
import * as Strings from '../constants/strings'
import * as Routes from '../constants/apiRoutes'


class AddClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instituteName: '',
      buisnessRegistrationNum: "",
      instituteAddress: '',
      instituteWebsite: '',
      instituteTelephone: '',
      country: '',
      postalCode: '',
      ErrorStatus: false,
      error: "",
      alertShow: false,
      alertMessage: ""
    }
    this.instituteNameChangeHandler = this.instituteNameChangeHandler.bind(this)
    this.buisnessRegistrationNumChangeHandler = this.buisnessRegistrationNumChangeHandler.bind(this)
    this.instituteAddressChangeHandler = this.instituteAddressChangeHandler.bind(this)
    this.instituteWebsiteChangeHandler = this.instituteWebsiteChangeHandler.bind(this)
    this.instituteTelephoneChangeHandler = this.instituteTelephoneChangeHandler.bind(this)
    this.countryChangeHandler = this.countryChangeHandler.bind(this)
    this.postalcodeChangeHandler = this.postalcodeChangeHandler.bind(this)
  }

  componentWillMount() {
    // this.props.UpdateTitle("Insttue Registration");
  }

  instituteNameChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      instituteName: ev.target.value
    })
  }

  buisnessRegistrationNumChangeHandler(ev) {
    var reg = new RegExp('^\\d+$');
    console.log(ev.target.value)
    if (reg.test(ev.target.value) || ev.target.value == "") {
      this.setState({
        buisnessRegistrationNum: ev.target.value
      })
    }
  }

  instituteAddressChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      instituteAddress: ev.target.value
    })
  }

  instituteWebsiteChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      instituteWebsite: ev.target.value
    })
  }

  instituteTelephoneChangeHandler(ev) {
    var reg = new RegExp('^\\d+$');
    console.log(ev.target.value)
    if (reg.test(ev.target.value) || ev.target.value == "") {

      console.log(ev.target.value)
      this.setState({
        instituteTelephone: ev.target.value
      })
    }
  }

  countryChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      country: ev.target.value
    })
  }

  postalcodeChangeHandler(ev) {
    var reg = new RegExp('^\\d+$');
    console.log(reg.test(ev.target.value) || ev.target.value == "")
    if (reg.test(ev.target.value)) {

      console.log(ev.target.value)
      this.setState({
        postalCode: ev.target.value
      })
    }
  }

  onRegisterClick() {
    let that = this;
    if (this.state.buisnessRegistrationNum == " " || this.state.country == " " || this.state.instituteAddress == " " || this.state.instituteName == " " || this.state.instituteTelephone == " " || this.state.instituteWebsite == " " || this.state.postalCode == " " || this.state.buisnessRegistrationNum == "" || this.state.country == "" || this.state.instituteAddress == "" || this.state.instituteName == "" || this.state.instituteTelephone == "" || this.state.instituteWebsite == "" || this.state.postalCode == "") {
      console.log(Strings.ALL_FIELDS_REQUIRED)
      this.setState({
        ErrorStatus: true,
        alertShow: true,
        alertMessage: Strings.ALL_FIELDS_REQUIRED,
        error: Strings.ALL_FIELDS_REQUIRED
      })
    }
    else {
      let obj = {
        companyName: this.state.instituteName,
        businessRegistrationNumber: this.state.buisnessRegistrationNum,
        companyAddress: this.state.instituteAddress,
        companyWebsite: this.state.instituteWebsite,
        companyContactNumber: this.state.instituteTelephone,
        country: this.state.country,
        postalCode: this.state.postalCode
      }
      console.log(obj)
      axios.post(Routes.REGISTER_INSTITUTE + this.props.userData._id,obj)
      .then(function (response) {
        
        console.log(response);
        if(response.data.result=="Can't register - registration number already exist"){
          console.log(response.data.result)
          that.setState({
            ErrorStatus:true,
            error:"Can't register - Registration Number Already Exist"
          })
        }
        else if(response.data.result=="registration number is too long"){
          that.setState({
            ErrorStatus:true,
            error:"Registration Number is too long"
          })
          console.log(response.data.result)
        }
        else{
          
          
          console.log(response.data.result)
          
          that.setState({
            instituteName:'',
            buisnessRegistrationNum:' ',
            instituteAddress:'',
            instituteWebsite:'',
            instituteTelephone:'',
            country:'',
            postalCode:' ',
            ErrorStatus:false
          })
         this.setState({ alertShow: true})
          // that.props.history.push("/manageInstitute")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
         <Alert className="mb-0" open = {this.state.alertShow}>
        <i className="fa fa-info mx-2"></i> {this.state.alertMessage}
      </Alert>
      <Row noGutters className="page-header py-4">
        <PageTitle title="Insititute Registration"  md="12" className="ml-sm-auto mr-sm-auto" />
        {/* subtitle="Registration" */}
      </Row>
      <Row>
        <Col lg="11">
        <Card small className="mb-4">
        {/* <CardHeader className="border-bottom">
        </CardHeader> */}
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label>Company/Institute Name</label>
                      <FormInput
                        onChange={this.instituteNameChangeHandler}
                        placeholder="Worldcerts"
                        value={this.state.instituteName}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label >Business Registration Number (UEN)</label>
                      <FormInput

                        onChange={this.buisnessRegistrationNumChangeHandler}
                        placeholder="12445"
                        value={this.state.buisnessRegistrationNum}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label>Company/Institute Address</label>
                      <FormInput
                        onChange={this.instituteAddressChangeHandler}
                        placeholder="7th street Canberra Australia"
                        value={this.state.instituteAddress}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6">
                      <label>Company/Institute Website</label>
                      <FormInput
                        onChange={this.instituteWebsiteChangeHandler}
                        placeholder="www.worldcerts.com"
                        value={this.state.instituteWebsite}
                      />
                    </Col>
                    <Col md="6">
                      <label>Company/Institute Telephone #</label>
                      <FormInput
                        onChange={this.instituteTelephoneChangeHandler}
                        placeholder="03422200220"
                        value={this.state.instituteTelephone}
                      />
                    </Col>
                  </Row>
                  <Row form style={{ marginTop: "15px" }}>
                    <Col md="6" className="form-group">
                      <label>Country</label>
                      <FormInput
                        onChange={this.countryChangeHandler}
                        placeholder="Pakistan"
                        value={this.state.country}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label>Postal Code</label>
                      <FormInput
                        onChange={this.postalcodeChangeHandler}
                        placeholder="12345"
                        value={this.state.postalCode}
                      />
                    </Col>
                   
                  </Row>
                  <hr />
                  <Button size="sm" theme = "success" style = {{backgroundColor: "lightgreen" ,  color: "#0000008c" , padding: "0.5em 3em", fontSize: "12px" , fontWeight: "bold"}} className="mb-2 mr-1"
                    onClick={this.onRegisterClick.bind(this)}
                  >Register</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
        </Col>
      </Row>
    </Container>
   
    )
  }
}
const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state.pageTitle);
  return {
    Title: state.pageTitle,
    userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddClassification);

