import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  CardBody,
  CardFooter,
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
import {Link} from 'react-router-dom'
import PageTitle from "../components/common/PageTitle";
import * as Strings from '../constants/strings'
import * as Routes from '../constants/apiRoutes'
import * as Response from '../constants/responseCodes'
import loader from '../images/loader.gif'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'


class AccountActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  
  }

  componentWillMount() {
    // this.props.UpdateTitle("Insttue Registration");
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Activate Your Account"  md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
        {/* subtitle="Registration" */}
      </Row>
      <Row>
      <Col lg="12">
                <Card small className="card-post mb-12">
                    {console.log(this.props.userData)}
                    
                    {(this.props.userData.isVerified)?( <CardBody>
            
            Activate Your Account <span className = "worldcerts-button" style = {{float:"right"}}>Verified</span>


        </CardBody>):( <CardBody>
            
            Activate Your Account <Link to = "/emailVerification"><button className = "worldcerts-button" style = {{float:"right"}}>Activate</button></Link>


        </CardBody>)}
                 
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
    userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountActivation);

