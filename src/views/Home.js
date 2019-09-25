
import React, { Component } from "react";

import PropTypes from "prop-types";
import { Container, Row, Col , Alert } from "shards-react";
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./UsersOverview";
import UsersByDevice from "./UsersByDevice";
// import NewDraft from "./../components/blog/NewDraft";
// import Discussions from "./../components/blog/Discussions";
// import TopReferrals from "./../components/common/TopReferrals";
import { connect } from 'react-redux';
import * as Routes from '../constants/apiRoutes'
import * as Strings from '../constants/strings'
import {Link} from 'react-router-dom'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smallStats: [
        {
          label: "PARTICIPANTS",
          value: "2,390",
          percentage: "4.7%",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(0, 184, 216, 0.1)",
              borderColor: "rgb(0, 184, 216)",
              data: [1, 2, 1, 3, 5, 4, 7]
            }
          ]
        },
        {
          label: "ORGANIZATIONS",
          value: "182",
          percentage: "12.4",
          increase: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "6", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(23,198,113,0.1)",
              borderColor: "rgb(23,198,113)",
              data: [1, 2, 3, 3, 3, 4, 4]
            }
          ]
        },
        {
          label: "CERTIFICATES ISSUED",
          value: "8,147",
          percentage: "3.8%",
          increase: false,
          decrease: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(255,180,0,0.1)",
              borderColor: "rgb(255,180,0)",
              data: [2, 3, 3, 3, 4, 3, 3]
            }
          ]
        },
        {
          label: "REVOKED CERTIFICATES",
          value: "29",
          percentage: "2.71%",
          increase: false,
          decrease: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(255,65,105,0.1)",
              borderColor: "rgb(255,65,105)",
              data: [1, 7, 1, 3, 1, 4, 8]
            }
          ]
        },
        {
          label: "Subscribers",
          value: "17,281",
          percentage: "2.4%",
          increase: false,
          decrease: true,
          chartLabels: [null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6" },
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgb(0,123,255,0.1)",
              borderColor: "rgb(0,123,255)",
              data: [3, 2, 3, 2, 4, 5, 4]
            }
          ]
        }
      ],
      alertMessage: "",
      alertShow: false,
      theme: ""
      // pagetitle: Strings.WORLDCERTS
    }
  }

  componentDidMount() {
    if(!this.props.userData.isVerified){
      this.setState({
        alertShow:true
      })
    }
    // const { pagetitle } = this.state;
    // this.props.UpdateTitle(pagetitle);
  }

  // onBtnClick() {
  //   // this.props.history.push("/freelancers-regsitration")
  //   // this.props.history.push("/freelancers-regsitration")
  // }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Alert className="mb-0" open={this.state.alertShow} theme="danger">
          <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to = "account_activation" style = {{color:"white" , fontWeight: "bold"}}>click here</Link> to verify it.
        </Alert>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Stats Overview" subtitle="Home" className="text-sm-left mb-3" />
        </Row>
        {/* Small Stats Blocks */}
        <Row>
          {this.state.smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}

                label={stats.label}

                value={stats.value}

                percentage={stats.percentage}

                increase={stats.increase}

                decrease={stats.decrease}

              />

            </Col>

          ))}

        </Row>

        <Row>

          {/* Users Overview */}

          <Col lg="8" md="12" sm="12" className="mb-4">

            <UsersOverview />

          </Col>

          {/* Users by Device */}

          <Col lg="4" md="6" sm="12" className="mb-4">

            <UsersByDevice />

          </Col>

          {/* New Draft */}

          {/* <Col lg="4" md="6" sm="12" className="mb-4">

        <NewDraft />

      </Col> */}

          {/* Discussions */}

          {/* <Col lg="5" md="12" sm="12" className="mb-4">

        <Discussions />

      </Col> */}

          {/* Top Referrals */}

          {/* <Col lg="3" md="12" sm="12" className="mb-4">

        <TopReferrals />

      </Col> */}

        </Row>

      </Container>
    );
  }
}



// BlogOverview.propTypes = {

//   /**

//    * The small stats dataset.

//    */

//   smallStats: PropTypes.array

// };

// BlogOverview.defaultProps = {

//   smallStats: [

//     {

//       label: "Posts",

//       value: "2,390",

//       percentage: "4.7%",

//       increase: true,

//       chartLabels: [null, null, null, null, null, null, null],

//       attrs: { md: "6", sm: "6" },

//       datasets: [

//         {

//           label: "Today",

//           fill: "start",

//           borderWidth: 1.5,

//           backgroundColor: "rgba(0, 184, 216, 0.1)",

//           borderColor: "rgb(0, 184, 216)",

//           data: [1, 2, 1, 3, 5, 4, 7]

//         }

//       ]

//     },

//     {

//       label: "Pages",

//       value: "182",

//       percentage: "12.4",

//       increase: true,

//       chartLabels: [null, null, null, null, null, null, null],

//       attrs: { md: "6", sm: "6" },

//       datasets: [

//         {

//           label: "Today",

//           fill: "start",

//           borderWidth: 1.5,

//           backgroundColor: "rgba(23,198,113,0.1)",

//           borderColor: "rgb(23,198,113)",

//           data: [1, 2, 3, 3, 3, 4, 4]

//         }

//       ]

//     },

//     {

//       label: "Comments",

//       value: "8,147",

//       percentage: "3.8%",

//       increase: false,

//       decrease: true,

//       chartLabels: [null, null, null, null, null, null, null],

//       attrs: { md: "4", sm: "6" },

//       datasets: [

//         {

//           label: "Today",

//           fill: "start",

//           borderWidth: 1.5,

//           backgroundColor: "rgba(255,180,0,0.1)",

//           borderColor: "rgb(255,180,0)",

//           data: [2, 3, 3, 3, 4, 3, 3]

//         }

//       ]

//     },

//     {

//       label: "New Customers",

//       value: "29",

//       percentage: "2.71%",

//       increase: false,

//       decrease: true,

//       chartLabels: [null, null, null, null, null, null, null],

//       attrs: { md: "4", sm: "6" },

//       datasets: [

//         {

//           label: "Today",

//           fill: "start",

//           borderWidth: 1.5,

//           backgroundColor: "rgba(255,65,105,0.1)",

//           borderColor: "rgb(255,65,105)",

//           data: [1, 7, 1, 3, 1, 4, 8]

//         }

//       ]

//     },

//     {

//       label: "Subscribers",

//       value: "17,281",

//       percentage: "2.4%",

//       increase: false,

//       decrease: true,

//       chartLabels: [null, null, null, null, null, null, null],

//       attrs: { md: "4", sm: "6" },

//       datasets: [

//         {

//           label: "Today",

//           fill: "start",

//           borderWidth: 1.5,

//           backgroundColor: "rgb(0,123,255,0.1)",

//           borderColor: "rgb(0,123,255)",

//           data: [3, 2, 3, 2, 4, 5, 4]

//         }

//       ]

//     }

//   ]

// };

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state.pageTitle);
  return {
    // Title: state.pageTitle,
    userData: state.user_reducer.user,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);



// import React, { Component } from "react";
// import { Container, Row, Col } from "shards-react";
// import PageTitle from "../components/common/PageTitle";
// import { connect } from 'react-redux';
// // import { pageTitle } from '../Redux/action';
// import history from "../config/history"
// import * as Strings from '../constants/strings'

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pagetitle: Strings.WORLDCERTS
//     }
//   }

//   componentWillMount() {
//     const { pagetitle } = this.state;
//     // this.props.UpdateTitle(pagetitle);
//   }

//   onBtnClick() {
//     // this.props.history.push("/freelancers-regsitration")
//     // this.props.history.push("/freelancers-regsitration")
//   }

//   render() {
//     return (
//       <Container fluid className="main-content-container px-4">
//         <Row noGutters className="page-header py-4">
//           <PageTitle title="Home" subtitle="HomeView" md="12" className="ml-sm-auto mr-sm-auto" />
//         </Row>
//         <span onClick={this.onBtnClick.bind(this)}>tests</span>
//       </Container>
//     );
//   }
// }

// // onClick={()=>this.onBtnClick.bind(this)}
// const mapStateToProps = (state) => {
//   console.log(Strings.REDUX, state.pageTitle);
//   return {
//     Title: state.pageTitle,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // UpdateTitle: (title) => dispatch(pageTitle(title))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);