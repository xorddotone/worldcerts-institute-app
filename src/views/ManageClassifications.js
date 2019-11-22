import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Alert,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Badge
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import '../css/style.css'
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as Strings from '../constants/strings'
import * as Routes from '../constants/apiRoutes'
import cross from '../images/cross.svg'
import add from '../images/add.png'
import '../css/style.css'
import {
  EditClassification,
  EditClassificationState,
  ClassificationCategory,
  ClassificationDurationTime,
  ClassificationDurationSpan,
  ClassificationName,
  Image
} from "../redux/actions/dashboard-action"
import certificate from "../images/cert_sample.jpg"

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
      alertShow: false,
      theme: "",
      isTop: true,
      open: false
    }
    this.onClickClose = this.onClickClose.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onAddClick = this.onAddClick.bind(this)
  }
  componentDidUpdate() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 1;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
  }

  async onClickClose(name, classificationId) {
    console.log(classificationId)
    let tempArr = []
    for (let i = 0; i < this.state.registeredClassifications.length; i++) {
      if (this.state.registeredClassifications[i]._id != classificationId) {
        // console.log(this.state.registeredInstitute[i]._id)
        tempArr.push(this.state.registeredClassifications[i])
      }
    }
    console.log(tempArr)
    try {
      console.log(this.props.userData._id)

      let obj = {
        id: classificationId,

      }
      console.log(obj)

      let request = await axios.delete(Routes.Delete_CLASSIFICATION + this.props.selectedInstituteName.id, { data: obj });
      console.log(request.data)
      //  let certificateId = request.data.result.certificateImage.certificateImageID
      //  Routes.CLOUDINARY_API.destroy(certificateId, function(error,result) {
      //   console.log(result, error) });
      // await axios.post(Routes.CLOUDINARY_API + "destory", certificateId)
      //               .then(function (res) {
      //                   console.log(res)
      //                   console.log(res.data)
      //               })
      //               .catch(function (err) {
      //                   console.log("err", err)
      //               })
      this.setState({
        alertShow: true,
        alertMessage: name + " classification has been deleted",
        theme: "success",
        registeredClassifications: tempArr,
        deleteId: "",
      }, () => this.toggle())
    } catch (e) {
      this.toggle()
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
    let that = this;
    if (this.props.selectedInstituteName.name != "Select Organization") {
      console.log("inside if")
      axios.get(Routes.CLASSIFICATION + this.props.selectedInstituteName.id)
        .then(function (response) {
          // handle success
          console.log(response);
          temp = response.data.result
          console.log(temp)
          delete temp.durationValidity
          that.setState({
            registeredClassifications: temp
          })

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    else {
      console.log("inside else")
      this.setState({
        registeredClassifications: false
      })
    }
  }

  onEditClick(data) {
    console.log("in edit")

    console.log(data)
    this.props.EditClassification(data);
    this.props.EditClassificationState(true);
    this.props.history.push("/addClassification");
  }
  onAddClick() {
    console.log("in add")
    if (this.props.selectedInstituteName.name == "Select Organization") {
      console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

      this.setState({
        alertShow: true,
        alertMessage: "Select Institute",
        theme: "danger",
      })
      // alert("up")
      // this.setState({
      //   loading:false
      // })
    }
    else {
      let obj = {
        category: "",
        classification: "",
        durationValidity: null,
        instituteName: "",
        _id: ""
      }
      this.props.ClassificationCategory("")
      this.props.ClassificationDurationTime(null)
      this.props.ClassificationDurationSpan("")
      this.props.ClassificationName("")
      this.props.IMAGE({ name: "" })
      this.props.EditClassification(obj)
      this.props.EditClassificationState(false)
      this.props.history.push("/addClassification")
    }
  }

  toggle = (name = "", id = "") => {
    console.log('id in console ==>', id)
    this.setState({ open: !this.state.open, certId: id, certName: name })
  }

  render() {
    const {
      PostsListTwo,
    } = this.state;
    return (
      <>
        <Modal size="md" open={this.state.open} centered="Yes" toggle={this.toggle}>
          <ModalHeader>Delete Certificate</ModalHeader>
          <ModalBody>
            Do you want to delete the certificate?
        </ModalBody>
          <ModalFooter>
            <button className="worldcerts-button" onClick={() => this.toggle()} >Cancel</button>
            <button className="worldcerts-button" onClick={() => this.onClickClose(this.state.certName, this.state.certId)} >Delete</button>
          </ModalFooter>
        </Modal>
        <Container fluid className="main-content-container px-4">
          {(this.props.userData.isVerified) ? (
            null
          ) : (
              <Alert className="mb-0" style={(this.state.isTop) ? (null) : ({ position: 'fixed', zIndex: '100', minWidth: "80%", maxWidth: "84%", transition: "2s" })} open={true} theme="danger">
                <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to="account_activation" style={{ color: "white", fontWeight: "bold" }}>click here</Link> to verify it.
        </Alert>
            )}
          <Alert className="mb-0" style={(this.state.isTop) ? (null) : ({ position: 'fixed', zIndex: '100', minWidth: "80%", maxWidth: "84%", transition: "2s" })} open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
            <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
          </Alert>
          <Row noGutters className="page-header py-4">
            <PageTitle title="Certificate Template" md="10" className="ml-sm-auto mr-sm-auto cursor-default" />
            {/* subtitle="Registration" */}
            {/* <Link to="/addClassification">   */}
            <span onClick={this.onAddClick} size="sm" className="mb-2 mr-1 d-flex justify-content-end worldcerts-button">
              <img src={add} alt="" height="17px" />
              Add
          {/* <i class="material-icons">
          add
</i> */}
            </span>
            {/* </Link> */}
          </Row>
          {console.log(this.state.registeredClassifications)}
          {(this.state.registeredClassifications) ? (
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
                // <Col lg="4" key={id}>
                //   <Card small className="card-post mb-4">
                //     <CardBody style={{ height: 200, backgroundImage: `url(${classification.certificateImage.certificateImageUrl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
                //       <h5 className="card-title "> <img src={cross} className="close-button" onClick={() => this.onClickClose(classification.classification, classification._id)} /></h5>

                //       {/* <p className="card-text text-muted">{classification.category}</p>
                //     <p className="card-text text-muted">{classification.classification}  </p> */}
                //       {/* <p className="card-text text-muted">{institute.companyAddress}  </p>
                //     <p className="card-text text-muted">{institute.postalCode}  </p> */}


                //     </CardBody>
                //     <CardFooter className="border-top d-flex">
                //       <div className="card-post__author d-flex">
                //         <a
                //           href="#"
                //           className="card-post__author-avatar card-post__author-avatar--small"
                //           style={{ backgroundImage: `url('${require("../images/logo.png")}')` }}
                //         >
                //           {classification.instituteName}
                //         </a>
                //         <div className="d-flex flex-column justify-content-center ml-3">
                //           <span className="card-post__author-name">
                //             {(classification.durationValidity.durationTime == null) ? (null) : (classification.durationValidity.durationTime) + " " + classification.durationValidity.durationSpan}
                //           </span>
                //           {/* <small className="text-muted">{institute.companyContactNumber}</small> */}
                //         </div>
                //       </div>
                //       <div className="my-auto ml-auto">
                //         <span size="sm" className="mb-2 mr-1 d-flex justify-content-end worldcerts-button" onClick={() => this.onEditClick(classification)}>
                //           {/* <i className="far fa-bookmark mr-1" />   */}
                //           EDIT
                //       </span>
                //       </div>







                //     </CardFooter>
                //   </Card>
                // </Col>

                <Col lg="4" key={id} style={{ marginBottom: 10 }} >
                  {console.log(classification)}
                  <div style={{ height: 300, boxShadow: "3px 3px 6px 0px rgba(0,0,0,0.5)", borderRadius: 21, backgroundColor: "white" }} >
                    <div style={{ position: "relative", padding: 20, height: "80%" }} >
                      <img src={classification.certificateImage.certificateImageUrl} width="100%" height="100%" style={{ objectFit: "contain" }} />
                      <i style={{ position: "absolute", top: 12, right: 10, cursor: "pointer" }} onClick={() => this.toggle(classification.classification, classification._id)} class="far fa-trash-alt"></i>
                    </div>
                    <div style={{ position: "relative", height: "20%", width: "100%", textAlign: "center" }} >
                      <p style={{ fontWeight: "bold", marginBottom: "0.75rem" }} >{`${classification.classification}`} Template</p>
                      <p style={{ fontSize: 10, marginBottom: "0.75rem" }} >{`${classification.durationValidity.durationTime}`} Year(s) Validity</p>
                      <i style={{ position: "absolute", bottom: 20, right: 10, cursor: "pointer" }} class="far fa-edit" onClick={() => this.onEditClick(classification)} ></i>
                    </div>
                  </div>
                </Col>

              )
              )}


            </Row>
          ) : (
              <div style={{ textAlign: "center", margin: "15% 30%" }}><h3 >Nothing added yet</h3></div>
            )}
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user,
    selectedInstituteName: state.user_reducer.selectedInstituteName,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    EditClassification: (data) => {
      dispatch(EditClassification(data))
    },
    EditClassificationState: (data) => {
      dispatch(EditClassificationState(data))
    },
    ClassificationCategory: (data) => {
      dispatch(ClassificationCategory(data))
    },
    ClassificationDurationTime: (data) => {
      dispatch(ClassificationDurationTime(data))
    },
    ClassificationDurationSpan: (data) => {
      dispatch(ClassificationDurationSpan(data))
    },
    ClassificationName: (data) => {
      dispatch(ClassificationName(data))
    },
    IMAGE: (imageFile) => {
      dispatch(Image(imageFile))
    },
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClassifications);