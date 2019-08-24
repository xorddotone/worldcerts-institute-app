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


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      userName : "",
      email : "",
      password : "",
  }  
  
  this.onChangeEmail = this.onChangeEmail.bind(this)
  this.onChangePassword = this.onChangePassword.bind(this)
  this.onChangeUserName = this.onChangeUserName.bind(this)
  this.onClickUpdate = this.onClickUpdate.bind(this)

  }
  
  componentWillMount() {
    this.props.UpdateTitle("Institue Registration");
  }

  onChangeEmail(event){
        console.log(event.target.value)
        this.setState({email : event.target.value})
  }

  onChangePassword(event){
    console.log(event.target.value)
    this.setState({password : event.target.value})
  }

  onChangeUserName(event){
    console.log(event.target.value)
    this.setState({userName : event.target.value})
  }

  onClickUpdate(){
      console.log(" In update ")
      let obj = {
          userName : this.state.userName,
          email : this.state.email,
          password : this.state.password
      }

    //   axios.post(constants.server_url +'/' , obj)
    //   .then(response => {
    //       console.log(response)
    //   })
  }

  render() {
    return (
        <Card small className="mb-6">
    <CardHeader className="border-bottom">
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="12" className="form-group">
                  <label htmlFor="feFirstName">Full Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="Full Name"
                    value={this.state.userName}
                    onChange={this.onChangeUserName}
                  />
                </Col>
                {/* Last Name */}
                {/* <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value="Brooks"
                    onChange={() => {}}
                  />
                </Col> */}
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              {/* <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  value="1234 Main St."
                  onChange={() => {}}
                />
              </FormGroup>
              <Row form>
                {/* City 
                <Col md="6" className="form-group">
                  <label htmlFor="feCity">City</label>
                  <FormInput
                    id="feCity"
                    placeholder="City"
                    onChange={() => {}}
                  />
                </Col>
                {/* State 
                <Col md="4" className="form-group">
                  <label htmlFor="feInputState">State</label>
                  <FormSelect id="feInputState">
                    <option>Choose...</option>
                    <option>...</option>
                  </FormSelect>
                </Col>
                {/* Zip Code 
                <Col md="2" className="form-group">
                  <label htmlFor="feZipCode">Zip</label>
                  <FormInput
                    id="feZipCode"
                    placeholder="Zip"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Description 
                <Col md="12" className="form-group">
                  <label htmlFor="feDescription">Description</label>
                  <FormTextarea id="feDescription" rows="5" />
                </Col>
              </Row> */}
              <Button theme="accent" onClick = {this.onClickUpdate}>Update Account</Button>
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

export default connect(null, mapDispatchToProps)(Profile);
