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
  Button
} from "shards-react";
import { connect } from 'react-redux';
import * as constants from '../utils/constants'
import axios from 'axios'
import PageTitle from "../components/common/PageTitle";


class AddClassification extends Component {
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
    // this.props.UpdateTitle("Insttue Registration");
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
let that=this;
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
      axios.post(constants.server_url +'instituteRegister',obj)
      .then(function (response) {
        
        console.log(response);
        if(response.data.data.result=="Can't register - registration number already exist"){
          console.log(response.data.data.result)
          that.setState({
            ErrorStatus:true,
            error:"Can't register - Registration Number Already Exist"
          })
        }
        else if(response.data.data.result=="registration number is too long"){
          that.setState({
            ErrorStatus:true,
            error:"Registration Number is too long"
          })
          console.log(response.data.data.result)
        }
        else{
          
          
          console.log(response.data.data.result)
          
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
          alert("Request Send")
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
      <Row noGutters className="page-header py-4">
        <PageTitle title="Add Classification"  md="12" className="ml-sm-auto mr-sm-auto" />
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
                        onChange={this.InstituteNameChangeHandler}
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
                      onChange={this.InstituteAddressChangeHandler}
                        placeholder="7th street Canberra Australia"
                        value={this.state.instituteAddress}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6">
                      <label>Company/Institute Website</label>
                      <FormInput
                      onChange={this.InstituteWebsiteChangeHandler}
                        placeholder="www.worldcerts.com"
                        value={this.state.instituteWebsite}
                      />
                    </Col>
                    <Col md="6">
                      <label>Company/Institute Telephone #</label>
                      <FormInput
                      onChange={this.InstituteTelephoneChangeHandler}
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
        </Col>
      </Row>
    </Container>
   
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(null, mapDispatchToProps)(AddClassification);
