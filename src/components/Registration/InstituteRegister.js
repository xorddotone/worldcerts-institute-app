import React, { Component } from "react";
import {
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
import * as constants from '../../utils/constants'
import axios from 'axios'

class UserAccountDetails extends Component {
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
      error: ""
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
      console.log("All fields Are Required")
      this.setState({
        ErrorStatus: true,
        error: "All Fields Are Required"
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
      axios.post(constants.server_url + 'institute/' + this.props.userData._id, obj)
        .then(function (response) {

          console.log(response);
          if (response.data.data.result == "Can't register - registration number already exist") {
            console.log(response.data.data.result)
            that.setState({
              ErrorStatus: true,
              error: "Can't register - Registration Number Already Exist"
            })
          }
          else if (response.data.data.result == "registration number is too long") {
            that.setState({
              ErrorStatus: true,
              error: "Registration Number is too long"
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
            alert("Request Sent")
            // that.props.history.push("/manage_organization")
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }

  render() {
    return (
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
                    {(this.state.ErrorStatus) ? (

                      <label style={{ color: "red", borderBottom: "1px" }}>{this.state.error}</label>
                    ) : (null)}
                  </Row>
                  <hr />

                  <span size="sm" theme="success" style={{ backgroundColor: "lightgreen", color: "#0000008c", padding: "0.5em 3em", fontSize: "12px", fontWeight: "bold" }} className="mb-2 mr-1" onClick={this.onRegisterClick.bind(this)}>
                    Register
      </span>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("redux =>", state);
  return {
    userData: state.user_reducer.user
    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountDetails);
