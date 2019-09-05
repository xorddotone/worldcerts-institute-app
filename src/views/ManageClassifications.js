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
  Badge
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as Strings from '../constants/strings'
import * as Routes from '../constants/apiRoutes'
import cross from '../images/cross.svg'
const axios = require('axios');

class ManageClassifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredClassifications: [],
      PostsListTwo: [
        {
          backgroundImage: require("../images/logo.png"),
          category: "Travel",
          categoryTheme: "info",
          author: "Anna Ken",
          authorAvatar: require("../images/logo.png"),
          title:
            "Attention he extremity unwilling on otherwise cars backwards yet",
          body:
            "Conviction up partiality as delightful is discovered. Yet jennings resolved disposed exertion you off. Left did fond drew fat head poor jet pan flying over...",
          date: "29 February 2019"
        },
        {
          backgroundImage: require("../images/logo.png"),
          category: "Business",
          categoryTheme: "dark",
          author: "John James",
          authorAvatar: require("../images/logo.png"),
          title:
            "Totally words widow one downs few age every seven if miss part by fact",
          body:
            "Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education to admitted speaking...",
          date: "29 February 2019"
        }
      ],
      alertMessage: "",
      alertShow: false
    }
    this.onClickClose = this.onClickClose.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  async onClickClose(name,classificationId){
    console.log(classificationId)
    try{
      console.log(this.props.userData._id)
  
      let obj = {
        id :  classificationId,
        
      }
      console.log(obj)

     let request =  await  axios.delete(Routes.Delete_CLASSIFICATION + this.props.selectedInstituteName.id ,{data:obj});
     this.setState({
      alertShow: true,
    alertMessage: name + " classification has been deleted"
    })
    console.log(request.data)
    }catch(e){
      console.log(e)
    }
  
  }
  dismiss() {
    this.setState({ alertShow: false });
  }
    // this.props.UpdateTitle("");
    componentDidMount() {
      console.log(this.props.userData)
      let temp;
      let that=this;
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
      if(this.props.selectedInstituteName.name!="worldcerts"){
        console.log("inside if")
      axios.get(Routes.CLASSIFICATION +this.props.selectedInstituteName.id)
        .then(function (response) {
          // handle success
          console.log(response);
          temp=response.data.result
          console.log(temp)
          that.setState({
            registeredClassifications:temp
          })
  
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }
      else{
        console.log("inside else")
        this.setState({
          registeredClassifications:false
        })
      }
    }
  

  render() {
    const {
      PostsListTwo,
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
          <Alert className="mb-0" open = {this.state.alertShow} theme = "danger" dismissible={this.dismiss}>
        <i className="fa fa-info mx-2"></i> {this.state.alertMessage}
      </Alert>
        <Row noGutters className="page-header py-4">
          <PageTitle title="Classifications" md="10" className="ml-sm-auto mr-sm-auto" />
          {/* subtitle="Registration" */}
          <Link to="/addClassification">  <Button size="sm" theme = "success" style = {{backgroundColor: "lightgreen" ,  color: "#0000008c" , padding: "0.5em 3em", fontSize: "12px" , fontWeight: "bold"}} className="mb-2 mr-1 d-flex justify-content-end">
        Add
      </Button></Link>
        </Row>
        {console.log(this.state.registeredClassifications)}
        {  (this.state.registeredClassifications)?(
            <Row>
            {this.state.registeredClassifications.map((classification, id) => (
            //  <div>{console.log(classification)}
            //   {console.log(id)}</div> 
              // <Col lg="6" sm="12" className="mb-4" key={id}>
              //   <Card small className="card-post card-post--aside card-post--1">
              //     <div
              //       className="card-post__image"
              //       style={{ backgroundImage: `url('${require("../images/logo.png")}')`, textAlign: "center" }}
              //     >
              //       {/* <Badge
              //         pill
              //         className={`card-post__category bg-${require("../images/logo.png")}`}
              //       >
              //         {post.category}
              //       </Badge> */}
              //       <div className="card-post__author d-flex">
              //         <a
              //           href="#"
              //           className="card-post__author-avatar card-post__author-avatar--small"
              //           style={{ backgroundImage: `url('${require("../images/logo.png")}')` }}
              //         >
              //           Written by Anna Ken
              //         </a>
                      
              //       </div>
              //     </div>
              //     <CardBody>
              //       <h5 className="card-title">
              //         <a className="text-fiord-blue" href="#">
              //           {classification.instituteName}
              //         </a>
              //         <img style = {{float: "right" , width: "3.5%" }} src = {cross} onClick = {this.onClickClose(classification._id)} alt = "cross"/>

              //       </h5>
              //       <div>{classification.category}</div>
              //       <div>{classification.classification} </div>
              //       {/* <p className="card-text d-inline-block mb-3">{post.body}</p> */}
              //       {/* <span className="text-muted">{post.date}</span> */}
              //       <div className="text-muted">{classification.durationValidity}</div>
              //       {/* <div className="text-muted">{institute.companyWebsite}</div>
              //       <div className="text-muted">{institute.companyContactNumber}</div>
              //       <div className="text-muted">{institute.postalCode}</div> */}
              //     </CardBody>
              //   </Card>
              // </Col>
                <Col lg="4" key={id}>
                <Card small className="card-post mb-4">
                  <CardBody>
                    <h5 className="card-title ">{classification.instituteName} <img src = {cross} style = {{float : "right" , width: "3%"}} onClick = {() => this.onClickClose(classification.classification,classification._id)}/></h5>
                    
                    <p className="card-text text-muted">{classification.category}</p>
                    <p className="card-text text-muted">{classification.classification}  </p>
                    {/* <p className="card-text text-muted">{institute.companyAddress}  </p>
                    <p className="card-text text-muted">{institute.postalCode}  </p> */}


                  </CardBody>
                  <CardFooter className="border-top d-flex">
                    <div className="card-post__author d-flex">
                      <a
                        href="#"
                        className="card-post__author-avatar card-post__author-avatar--small"
                        style={{ backgroundImage: `url('${require("../images/logo.png")}')` }}
                      >
                       {classification.instituteName}
                      </a>
                      <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="card-post__author-name">
                        {classification.durationValidity}
                         </span>
                        {/* <small className="text-muted">{institute.companyContactNumber}</small> */}
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
      <div><h3 style={{textAlign:"center",margin:"15% 30%"}}>Nothing added yet</h3></div>
      )}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user,
    selectedInstituteName:state.user_reducer.selectedInstituteName,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClassifications);