import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
Alert,
  Button,
  // CardFooter,

  Badge
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import "../css/style.css"
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import cross from '../images/cross.svg'
import * as Strings from '../constants/strings'
import * as Routes from '../constants/apiRoutes'
import '../css/style.css'
const axios = require('axios');


class ManageInstitutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostsListTwo: [
        {
          author: "John James",
          authorAvatar: require("../images/logo.png"),
          title: "Had denoting properly jointure which well books beyond",
          body:
            "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
          date: "29 February 2019"
        },
        {
          author: "John James",
          authorAvatar: require("../images/logo.png"),
          title: "Had denoting properly jointure which well books beyond",
          body:
          "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
          date: "29 February 2019"
        },
        {
          author: "John James",
          authorAvatar: require("../images/logo.png"),
          title: "Had denoting properly jointure which well books beyond",

          body:
          "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
          date: "29 February 2019"
        }
      ],
      registeredInstitute:[],
      alertMessage: "",
      alertShow: false,
      theme: ""
    }
    this.onClickClose = this.onClickClose.bind(this)
    this.dismiss = this.dismiss.bind(this)

  }

  componentDidMount() {
    console.log(this.props.userData)
    let that=this;
    console.log(this.props.userData._id)
    axios.get(Routes.GET_REGISTERED_INSTITUTES+ this.props.userData._id)
    .then(function (response) {
      let temp;
        // handle success
        console.log(response);
        temp=response.data.result
        console.log(temp)
        that.setState({
          registeredInstitute:temp
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  async onClickClose(name,id){
    let tempArr=[]
    for(let i=0;i<this.state.registeredInstitute.length;i++){
      if(this.state.registeredInstitute[i]._id!=id){
        // console.log(this.state.registeredInstitute[i]._id)
        tempArr.push(this.state.registeredInstitute[i])
      }
    }
    // console.log(tempArr)
    try{
      console.log(id)
      console.log(this.props.userData._id)
  
      let obj = {
        id : this.props.userData._id,
        // name: "hasanm"
      }
      console.log(obj)

     let request =  await axios.delete(Routes.REGISTER_INSTITUTE + id, {data : obj});
     console.log(request.data)
     
     this.setState({
       alertShow: true,
     alertMessage: name + " institute has been deleted",
     registeredInstitute:tempArr,
     theme: "success"
     })

     
    }catch(e){
      console.log(e)
    }
  
  }
  dismiss() {
    this.setState({ alertShow: false });
  }
  render() {
    const {
      PostsListTwo,
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
         <Alert className="mb-0" open = {this.state.alertShow} theme = {this.state.theme}  dismissible={this.dismiss}>
         <i className="fas fa-exclamation mx-2"></i>{this.state.alertMessage}
      </Alert>
      {(this.props.userData.isVerified)?(
        <div>
           
        <Row noGutters className="page-header py-4">
          <PageTitle title="Organizations" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
          {/* subtitle="Registration" */}
          {/* <Link to="/organization_registration"><Button theme="accent">Add</Button></Link> */}
        </Row>
        {console.log(this.state.registeredInstitute)}
      {  (this.state.registeredInstitute)?(
            <Row>
        {console.log(this.state.registeredInstitute)}
              
            {this.state.registeredInstitute.map((institute, id) => (
            
                <Col lg="4" key={id}>
                <Card small className="card-post mb-4">
                  <CardBody>
                    <h5 className="card-title ">{institute.companyName} <img src = {cross} className = "close-button" onClick = {() => this.onClickClose(institute.companyName,institute._id)}/></h5>
                    <p className="card-text text-muted">{institute.buisnessRegistrationNumber}</p>
                    <p className="card-text text-muted">{institute.country}  </p>
                    <p className="card-text text-muted">{institute.companyAddress}  </p>
                    <p className="card-text text-muted">{institute.postalCode}  </p>


                  </CardBody>
                  <CardFooter className="border-top d-flex">
                    <div className="card-post__author d-flex">
                      <a
                        href="#"
                        className="card-post__author-avatar card-post__author-avatar--small"
                        style={{ backgroundImage: `url('${require("../images/logo.png")}')` }}
                      >
                        {institute.companyWebsite}
                      </a>
                      <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="card-post__author-name">
                        {institute.companyWebsite}
                         </span>
                        <small className="text-muted">{institute.companyContactNumber}</small>
                      </div>
                    </div>
                    {/* <div className="my-auto ml-auto">
                      <Button size="sm" theme="white">
                        <i className="far fa-bookmark mr-1" /> Bookmark
                      </Button>
                    </div> */}
                  </CardFooter>
                </Card>
              </Col>
            )
            )}
          </Row>
        ):(
      <div><h3 className = "nothing-added-yet">Nothing added yet</h3></div>
      )}
        </div>
        ):(
        <div style={{textAlign:"center",margin:"15% 30%"}}>
          <h3 >Verify You account First</h3>
          <Link to="/emailVerification"><Button size="sm" theme = "success" className = "worldcerts-button">Verify</Button></Link>
        </div>
      )}
        
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageInstitutes);
