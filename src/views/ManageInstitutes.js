import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as Strings from '../constants/strings'
import * as Routes from '../constants/apiRoutes'
const axios = require('axios');


class ManageInstitutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            "Conviction up partiality as delightful is discovered. Yet jennings resolved disposed exertion you off.",
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
            "Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. ",
          date: "29 February 2019"
        }
      ],
      registeredInstitute:[],
    }
  }

  componentDidMount() {
    console.log(this.props.userData)
    let temp;
    let that=this;
    axios.get(Routes.GET_REGISTERED_INSTITUTES+this.props.userData._id)
      .then(function (response) {
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

  render() {
    const {
      PostsListTwo,
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
      {(this.props.userData.isVerified)?(
        <div>
           
        <Row noGutters className="page-header py-4">
          <PageTitle title="Institute Registration" md="11" className="ml-sm-auto mr-sm-auto" />
          {/* subtitle="Registration" */}
          <Link to="/institute_registration"><Button theme="accent">Add</Button></Link>
        </Row>
      {  (this.state.registeredInstitute)?(
            <Row>
            {this.state.registeredInstitute.map((institute, id) => (
              <Col lg="6" sm="12" className="mb-4" key={id}>
                <Card small className="card-post card-post--aside card-post--1">
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url('${require("../images/logo.png")}')`, textAlign: "center" }}
                  >
                    {/* <Badge
                      pill
                      className={`card-post__category bg-${require("../images/logo.png")}`}
                    >
                      {post.category}
                    </Badge> */}
                    <div className="card-post__author d-flex">
                      <a
                        href="#"
                        className="card-post__author-avatar card-post__author-avatar--small"
                        style={{ backgroundImage: `url('${require("../images/logo.png")}')` }}
                      >
                        Written by Anna Ken
                      </a>
                    </div>
                  </div>
                  <CardBody>
                    <h5 className="card-title">
                      <a className="text-fiord-blue" href="#">
                        {institute.companyName}
                      </a>
                    </h5>
                    <div>{institute.country}</div>
                    <div>{institute.buisnessRegistrationNumber} </div>
                    {/* <p className="card-text d-inline-block mb-3">{post.body}</p> */}
                    {/* <span className="text-muted">{post.date}</span> */}
                    <div className="text-muted">{institute.companyAddress}</div>
                    <div className="text-muted">{institute.companyWebsite}</div>
                    <div className="text-muted">{institute.companyContactNumber}</div>
                    <div className="text-muted">{institute.postalCode}</div>
                  </CardBody>
                </Card>
              </Col>
            )
            )}
          </Row>
        ):(
      <div><h3 style={{textAlign:"center",margin:"15% 30%"}}>Nothing added yet</h3></div>
      )}
        </div>
        ):(
        <div style={{textAlign:"center",margin:"15% 30%"}}>
          <h3 >Verify You account First</h3>
          <Link to="/emailVerification"><Button theme="accent">Verify</Button></Link>
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
