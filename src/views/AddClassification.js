

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
import axios from 'axios'
import * as Routes from '../constants/apiRoutes'

const categoryOptions = [
  "Diploma", "Bachelors"
]
const instituteOptions = [
  "XYZ" , "ABC"
]
const duration = [
  "year" ,"month" , "day"
]
class InstituteRegistration extends Component {
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
      dropdown1: false,
      dropdown2: false , 
      categoryOptions : [
        {label : "Diploma", value: "Diploma" },
        {label : "Bachelors" , value: "Bachelors"}
      ]
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
      axios.post(Routes.REGISTER_INSTITUTE + this.props.userData._id, obj)
        .then(function (response) {

          console.log(response);
          if (response.data.data.result == Strings.REGISTRATION_NUMBER_EXISTS) {
            console.log(response.data.data.result)
            that.setState({
              ErrorStatus: true,
              error: Strings.REGISTRATION_NUMBER_EXISTS
            })
          }
          else if (response.data.data.result == Strings.REGISTRATION_NUMBER_LONG) {
            that.setState({
              ErrorStatus: true,
              error: Strings.REGISTRATION_NUMBER_LONG
            })
            console.log(response.data.data.result)
          }
          else {
            console.log(response.data.data.result)

            that.setState({
              instituteName: '',
              buisnessRegistrationNum: ' ',
              instituteAddress: '',
              instituteWebsite: '',
              instituteTelephone: '',
              country: '',
              postalCode: ' ',
              ErrorStatus: false
            })
            alert(Strings.REQUEST_SENT)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
onChangeInstitute(event){ 
  console.log(event.target.value)
  this.setState({
    // changeIsntitute 
  })
}
  toggle(which) {
    const newState = { ...this.state };
    newState[which] = !this.state[which];
    this.setState(newState);
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Institute Registration" md="12" className="ml-sm-auto mr-sm-auto" />
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
                        <Row>
                          <Col md="6" className="form-group">
                            <label>Insitute Name</label>

                            <FormSelect onChange = {this.onChangeInstitute}>

                            {
                                     instituteOptions.map((category) => {
                                       return(
                                         <option>{category}</option>
                                         
                                       )
                                     })
                                    }
                            </FormSelect>
                          </Col>
                          <Col md="6" className="form-group">
                            <label>Category</label>


                            <FormSelect>
                            {
                                     categoryOptions.map((category) => {
                                       return(
                                         <option>{category}</option>
                                         
                                       )
                                     })
                                    }
                            </FormSelect>
                          </Col>
                        </Row>
                        <Row form>

                         

                          <Col md="6" className="form-group">
                            <label >Classification</label>
                            <FormInput

                              onChange={this.buisnessRegistrationNumChangeHandler}
                              placeholder="12445"
                              value={this.state.buisnessRegistrationNum}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label>Certificate Validity</label>

                            <InputGroup className="mb-3">
                              <FormInput 
                              onChange={this.buisnessRegistrationNumChangeHandler}
                              placeholder="0"
                              value={this.state.buisnessRegistrationNum}
                              />
                              <Dropdown
                                open={this.state.dropdown1}
                                toggle={() => this.toggle("dropdown1")}
                                addonType="append"
                              >
                                <DropdownToggle caret>Dropdown</DropdownToggle>
                                <DropdownMenu small right
                                >
                                   {
                                     duration.map((durationtime) => {
                                       return(
                                         <DropdownItem>{durationtime}</DropdownItem>
                                         
                                       )
                                     })
                                    }
                                </DropdownMenu>
                              </Dropdown>
                            </InputGroup>
                          </Col>
                        </Row>
                        {/* <Row form>
                          <Col md="12" className="form-group">
                            <label>Company/Institute Address</label>
                            <FormInput
                              onChange={this.instituteAddressChangeHandler}
                              placeholder="7th street Canberra Australia"
                              value={this.state.instituteAddress}
                            />
                          </Col>
                        </Row> */}
                     
                        {/* <Row form style={{ marginTop: "15px" }}>
                        <InputGroup className="mb-3">
          <FormInput />
          <Dropdown
            open={this.state.dropdown1}
            toggle={() => this.toggle("dropdown1")}
            addonType="append"
          >
            <DropdownToggle caret>Dropdown</DropdownToggle>
            <DropdownMenu small right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </InputGroup>
                          <Col md="6" className="form-group">
                            <label>Postal Code</label>
                            <FormInput
                              onChange={this.postalcodeChangeHandler}
                              placeholder="12345"
                              value={this.state.postalCode}
                            />
                          </Col>
                          {(this.state.ErrorStatus) ? (

                            <label style={{ color: "red", borderBottom: "1px" }}>{this.state.error}</label>
                          ) : (null)}
                        </Row> */}
                        <Button theme="accent"
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
  console.log(Strings.REDUX, state);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstituteRegistration);
