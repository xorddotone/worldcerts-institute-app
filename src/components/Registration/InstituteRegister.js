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
import { pageTitle } from '../../Redux/action';
import { connect } from 'react-redux';
import * as constants from '../../utils/constants'
import axios from 'axios'


class UserAccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
      instituteName:'',
      buisnessRegistrationNum:"",
      instituteAddress:'',
      instituteWebsite:'',
      instituteTelephone:'',
      country:'',
      postalCode:'',
      ErrorStatus:false,
      error:""
  }  
    this.InstituteNameChangeHandler = this.InstituteNameChangeHandler.bind(this)
    this.buisnessRegistrationNumChangeHandler = this.buisnessRegistrationNumChangeHandler.bind(this)
    this.InstituteAddressChangeHandler = this.InstituteAddressChangeHandler.bind(this)
    this.InstituteWebsiteChangeHandler = this.InstituteWebsiteChangeHandler.bind(this)
    this.InstituteTelephoneChangeHandler = this.InstituteTelephoneChangeHandler.bind(this)
    this.countryChangeHandler = this.countryChangeHandler.bind(this)
    this.postalcodeChangeHandler = this.postalcodeChangeHandler.bind(this)
   
  }
  
  
  componentWillMount() {
    this.props.UpdateTitle("Institue Registration");
  }

  InstituteNameChangeHandler(ev){
    console.log(ev.target.value)
    this.setState({
      instituteName:ev.target.value
    })
  }

  buisnessRegistrationNumChangeHandler(ev){
    var reg = new RegExp('^\\d+$');
    console.log( ev.target.value)
    if(reg.test(ev.target.value) || ev.target.value==""){
      this.setState({
        buisnessRegistrationNum:ev.target.value
      })
    }
    
        
  }
  InstituteAddressChangeHandler(ev){
    console.log(ev.target.value)
    this.setState({
      instituteAddress:ev.target.value
    })
  }
  InstituteWebsiteChangeHandler(ev){
    console.log(ev.target.value)
    this.setState({
      instituteWebsite:ev.target.value
    })
  }
  InstituteTelephoneChangeHandler(ev){
    var reg = new RegExp('^\\d+$');
    console.log( ev.target.value)
    if(reg.test(ev.target.value) || ev.target.value==""){

      console.log(ev.target.value)
      this.setState({
        instituteTelephone:ev.target.value
      })
    }
  }
  countryChangeHandler(ev){
    console.log(ev.target.value)
    this.setState({
      country:ev.target.value
    })
  }
  postalcodeChangeHandler(ev){
    var reg = new RegExp('^\\d+$');
    console.log( reg.test(ev.target.value) || ev.target.value=="")
    if(reg.test(ev.target.value)){

      console.log(ev.target.value)
      this.setState({
        postalCode:ev.target.value
      })
    }
  }
  onRegisterClick(){

    if(this.state.buisnessRegistrationNum==" " || this.state.country==" " || this.state.instituteAddress==" " || this.state.instituteName==" " || this.state.instituteTelephone==" " || this.state.instituteWebsite==" " || this.state.postalCode==" " || this.state.buisnessRegistrationNum=="" || this.state.country=="" || this.state.instituteAddress=="" || this.state.instituteName=="" || this.state.instituteTelephone=="" || this.state.instituteWebsite=="" || this.state.postalCode==""){
      console.log("All fields Are Required")
      this.setState({
        ErrorStatus:true,
        error:"All Fields Are Required"
      })
    }
    else{

      let obj={
        companyName:this.state.instituteName,
        businessRegistrationNumber:this.state.buisnessRegistrationNum,
        companyAddress:this.state.instituteAddress,
        companyWebsite:this.state.instituteWebsite,
        companyContactNumber:this.state.instituteTelephone,
        country:this.state.country,
        postalCode:this.state.postalCode
      }
      console.log(obj)
      axios.post(constants.server_url +'register/instituteRegister',obj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      this.setState({
        instituteName:'',
        buisnessRegistrationNum:' ',
        instituteAddress:'',
        instituteWebsite:'',
        instituteTelephone:'',
        country:'',
        postalCode:' '
      })
    }

  }




  
  



  render() {
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label>Company/Institute Name</label>
                      <FormInput
                        onChange={this.InstituteNameChangeHandler}
                        placeholder="Name of Company/Institute"
                        value={this.state.instituteName}
                      /> 
                    </Col>
                    <Col md="6" className="form-group">
                      <label >Business Registration Number (UEN)</label>
                      <FormInput
                                    
                      onChange={this.buisnessRegistrationNumChangeHandler}
                        placeholder="UEN#"
                        value={this.state.buisnessRegistrationNum}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12" className="form-group">
                      <label>Company/Institute Address</label>
                      <FormInput
                      onChange={this.InstituteAddressChangeHandler}
                        placeholder="Address, street #......"
                        value={this.state.instituteAddress}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6">
                      <label>Company/Institute Website</label>
                      <FormInput
                      onChange={this.InstituteWebsiteChangeHandler}
                        placeholder="Webiste"
                        value={this.state.instituteWebsite}
                      />
                    </Col>
                    <Col md="6">
                      <label>Company/Institute Telephone #</label>
                      <FormInput
                      onChange={this.InstituteTelephoneChangeHandler}
                        placeholder="Contact#"
                        value={this.state.instituteTelephone}
                      />
                    </Col>
                  </Row>
                  <Row form style={{ marginTop: "15px" }}>
                    <Col md="6" className="form-group">
                      <label>Country</label>
                      <FormInput
                      onChange={this.countryChangeHandler}
                        placeholder="Country"
                        value={this.state.country}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label>Postal Code</label>
                      <FormInput
                      onChange={this.postalcodeChangeHandler}
                        placeholder="Zip Code"
                        value={this.state.postalCode}
                      />
                    </Col>
                    {(this.state.ErrorStatus)?(
                        
                        <label style={{ color: "red", borderBottom: "1px" }}>{this.state.error}</label>
                      ):(null)}
                  </Row>
                  <hr />
                  <Button theme="accent"
                  onClick={this.onRegisterClick.bind(this)}
                  >Register</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(null, mapDispatchToProps)(UserAccountDetails);
