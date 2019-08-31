import React, { Component } from "react";
import { Container,
   Row, 
   Col ,
    Card,
  CardBody,
  CardFooter,

  Button,
Badge } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import UserAccountDetails from "../components/Registration/InstituteRegister";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
class ManageInstitutes extends Component {
  constructor(props){
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
    }
  }
  componentDidMount() {
    // this.props.UpdateTitle("");
  }
  render() {
    const {
      PostsListTwo,
    } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
         <Row noGutters className="page-header py-4">
          <PageTitle title="Institute Registration"  md="11" className="ml-sm-auto mr-sm-auto" />
          {/* subtitle="Registration" */}
          <Link to = "/institute_registration"><Button theme="accent">Add</Button></Link>
        </Row>
           <Row>
          {PostsListTwo.map((post, idx) => (
           
             <Col lg="4" key={idx}>
             <Card small className="card-post mb-4">
               <CardBody>
                 <h5 className="card-title">{post.title}</h5>
                 <p className="card-text text-muted">{post.body}</p>
               </CardBody>
               <CardFooter className="border-top d-flex">
                 <div className="card-post__author d-flex">
                   <a
                     href="#"
                     className="card-post__author-avatar card-post__author-avatar--small"
                     style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                   >
                     Written by James Khan
                   </a>
                   <div className="d-flex flex-column justify-content-center ml-3">
                     <span className="card-post__author-name">
                       {post.author}
                     </span>
                     <small className="text-muted">{post.date}</small>
                   </div>
                 </div>
                 <div className="my-auto ml-auto">
                   <Button size="sm" theme="white">
                     <i className="far fa-bookmark mr-1" /> Bookmark
                   </Button>
                 </div>
               </CardFooter>
             </Card>
           </Col>
          ))}
        </Row>

        
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("redux =>", state);
  return {
    Title: state.pageTitle,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageInstitutes);
