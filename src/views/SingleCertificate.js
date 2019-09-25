import React, { Component } from 'react';
import { connect } from 'react-redux';
// import logo from './logo.svg';
// import './App.css';
import '../css/SingleCertificate.css';


import * as Routes from '../constants/apiRoutes'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import inventLogo from '../images/invent-logo.png'
import IBALogo from '../images/IBA-logo.png'
import ibaesLogo from '../images/ibaes-logo.png'
import furor from '../images/furor.png'
import xord from '../images/xord.png';
import pharma from '../images/pharma.png'
import ced from '../images/ced.png'
import tameer from '../images/tameer.png'
import fm91 from '../images/fm91.png'
// import reducers from './redux/reducers';
import signature1 from '../images/signature1.png'
import signature2 from '../images/signature2.png'
import qrcode from '../images/qrcode.png'
import background from '../images/Background.jpg';
import QRCode from 'qrcode';

const axios = require('axios');


class SingleCertificate extends Component {
  state={
    certData: {},
    qrCode: ""
  
  }
  componentDidMount(){
    console.log(this.props.location.search)
    let query= this.props.location.search.split('?');
    console.log(query)
let that=this;
      axios.get(Routes.GET_PARTICIPANT_DATA+query[1])
      .then(function(response){
        console.log(response.data.result,"response")
        that.setState({
          certData:response.data.result
        })
        that.getQRCode(response.data.result)
      })
      .catch(function(error){
        console.log(error)
      })




// let query = this.props.location.search.split('?');
//     let that = this;
//     axios.get("https://encert-server.herokuapp.com/issuer/certificate/" + query[1])
//       .then(function (response) {
//         console.log("Certificate ", response.data.data.result)
//         that.getQRCode(response.data.data.result);
//         try {
//           that.setState({
//             certData: response.data.data.result,
//           })
//           // return qr;
//           //            await download(qr, `${certificates[i].receiver_name} , team ${certificates[i].team_name}.png`);
//           //          }
//         } catch (e) {
//           console.log(e);
//           // return null;
//         }
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
  }

  async getQRCode(certificate) {
    console.log("Getting QR for cert: ", certificate);
    try {
      //          for (let i = 0; i < certificates.length; i++) {
      let qr = await QRCode.toDataURL('http://192.168.0.119:3000/Certificate?' + certificate._id);

      console.log("QR: ", qr);
      this.setState({
        qrCode: qr
      })
      return qr;
      //            await download(qr, `${certificates[i].receiver_name} , team ${certificates[i].team_name}.png`);
      //          }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

    // state = {
    //     certificateData: this.props.certificateData
    // }

    render() {
        console.log(this.props.location,"location")
        console.log("State is: ", this.state);
        return (
            <div>
              <div>
                <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}} className="cert-border">
                  <Container fluid >
                    <Row>
                      <Col xl={3} lg={3} md={3} xs={4} sm={4}>
                        <img className="header-logo-left" src={IBALogo} />
                      </Col>
                      <Hidden sm xs>
                        <Col xl={1} lg={1} md={1} sm={0} xs={0}>
      
                        </Col>
                      </Hidden>
                      <Col className="text-center" xl={4} lg={4} md={4} xs={4} sm={4}>
                        <img className="header-logo-center" src={inventLogo} />
                      </Col>
                      <Hidden sm xs>
                        <Col xl={1} lg={1} md={1} sm={0} xs={0}>
      
                        </Col>
                      </Hidden>
                      <Col xl={3} lg={3} md={3} xs={4} sm={4}>
                        <img className="header-logo-right" src={ibaesLogo} />
                      </Col>
                    </Row>
      
                    <div>
                      <h3 className="text-center text-uppercase">This certificate is awarded to</h3>
                    </div>
                    <Row>
                      <Col md={3} sm={1} xs={1}>
      
                      </Col>
                      <Col md={6} xs={10} sm={10}>
                        <div className="participant-placeholder text-center">
                          <p>{this.state.certData.name}</p>
                        </div>
                      </Col>
                      <Col md={3} sm={1} xs={1}>
      
                      </Col>
                    </Row>
                    <div>
                      <h3 className="text-center text-uppercase">Of Team</h3>
                    </div>
                    <Row>
                      <Col md={3} sm={1} xs={1}>
      
                      </Col>
                      <Col md={6} xs={10} sm={10}>
                        <div className="participant-placeholder text-center">
                          <p>"JOHN"</p>
                        </div>
                      </Col>
                      
                      <Col md={3} sm={1} xs={1}>
      
                      </Col>
                    </Row>
                  
                  </Container>
                  <div>
                    <p className="text-center">for participation and remarkable contribution towards</p>
                    <p className="text-center"><strong>INVENT 2019 - THE ENTREPRENEURIAL CHALLENGE</strong></p>
                    <p className="text-center">organized by IBA Entrepreneurship Society</p>
                    <p className="text-center">At IBA Karachi from 19th-21st April 2019</p>
                  </div>
                  <div>
                  <Container fluid style={{marginTop:'5vh'}} >
                    <Row>
      
                      <Col style={{backgroundImage: `url(${furor})`}} className="partner-logo" md={2} xs={4} sm={4}>
                      
                      </Col>
                      <Col style={{backgroundImage: `url(${xord})`, backgroundOrigin:'border-box'}} className="partner-logo" md={2} xs={4} sm={4}>
                        
                      </Col>
                      <Col style={{backgroundImage: `url(${pharma})`}} className="partner-logo" md={2} xs={4} sm={4}>
                        
                      </Col>
                      <Col style={{backgroundImage: `url(${ced})`}} className="partner-logo" md={2} xs={4} sm={4}>
                      
                      </Col>
                      <Col style={{backgroundImage: `url(${tameer})`}} className="partner-logo" md={2} xs={4} sm={4}>
                        
                      </Col>
                      <Col style={{backgroundImage: `url(${fm91})`}} className="partner-logo" md={2} xs={4} sm={4}>
                        
                      </Col>
      
                    </Row>
      
                    <Row style={{marginTop:'50px'}}>
                      <Col md={4} xs={12} sm={12}>
                        <div>
                          <div className="participant-placeholder text-center">
                          <img src={signature1}/>
                        </div>
                        <div className="text-center">
                          <h2>Muhammad Taha Rafique</h2>
                          <p>Manager IBA Entrepreneurship Society</p>
                         </div>
                        </div>
                      </Col>
                      <Hidden sm xs>
                        <Col md={1} sm={0} xs={0}>
      
                        </Col>
                      </Hidden>
      
                      <Hidden sm xs>
                      <Col style={{backgroundImage: `url(${this.state.qrCode})`}} className="qr-container" md={2} xs={12} sm={12} >
                        <div>
                          
                        </div>
                      </Col >
                      </Hidden>
      
                      <Hidden sm xs>
                        <Col md={1} sm={0} xs={0}>
      
                        </Col>
                      </Hidden>
                      <Col md={4} xs={12} sm={12}>
                        <div>
                          <div className="participant-placeholder text-center">
                          <img src={signature2}/>
                        </div>
                        <div className="text-center">
                          <h2>Dr. Shahid Qureshi</h2>
                          <p>Director IBA Center for Entrepreneurial Development</p>
                         </div>
                        </div>
                      </Col>
      
                      <Visible sm xs>
                      <Col style={{backgroundImage: `url(${qrcode})`}} className="qr-container" md={2} xs={12} sm={12} >
                        <div>
                          
                        </div>
                      </Col >
                      </Visible>
                    </Row>
      
                  </Container>
                  </div>
                </div>
              </div>
            </div>
          );
        }
}
// function mapStateToProp(state) {
//     console.log(state)
//     return ({
//         certificateData: state.signIn_reducer.certificate_data,
//     })
// }

// export default connect(mapStateToProp,null)(SingleCertificate);
export default SingleCertificate;