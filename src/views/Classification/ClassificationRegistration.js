

import React, { Component } from "react";
import {
    Container, Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    InputGroup,
    Alert,
    InputGroupAddon,
    InputGroupText,
    FormSelect,
    FormTextarea,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../../constants/strings'
import * as Response from '../../constants/responseCodes'
import axios from 'axios'
import * as Routes from '../../constants/apiRoutes'
import loader from '../../images/loader.gif'
import { EditClassification, EditClassificationState ,ClassificationFields} from "../../redux/actions/dashboard-action"
import { Link, withRouter } from 'react-router-dom'
import PropagateLoader from 'react-spinners/PropagateLoader';


const duration = [
    "Choose", "year", "months", "days"
]
var CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/demoworldcert/upload'
var CLOUDINARY_PRESET = 'demoWorldCertification'
class ClassificationRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instituteName: '',
            category: '',
            classification: this.props.editClassificationData.classification,
            duration: null,
            durationTemp: "",
            durationValidity: '',
            ErrorStatus: false,
            error: "",
            dropdown1: false,
            dropdown2: false,
            registeredInstitute: [],
            classificationCategory: [],
            selectedInstituteId: "",
            alertShow: false,
            alertMessage: "",
            loading: false,
            certificateImageURL: ''
        }
        this.onRegisterClick = this.onRegisterClick.bind(this)
        this.dismiss = this.dismiss.bind(this)
    }

    async componentDidMount() {

        console.log("#################################################3")
        console.log(this.props.classificationName, this.props.classificationCategory, this.props.classificationDuration, this.props.classificationDurationValidity)
        console.log(typeof (this.props.classificationDuration))
        console.log(Object.keys(this.props.classificationFields))
        console.log(this.props.classificationFields)
        let imageURL = ''
        let certificatePublicId = ''
        // console.log(this.state.selectedInstituteId)
        this.setState({
            loading: true
        })
        console.log(this.props.selectedInstituteName)
        if (this.props.selectedInstituteName.name == "Select Organization") {
            console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

            this.setState({
                alertShow: true,
                alertMessage: "Select Institute",
                theme: "danger",
                loading: false

            })
            // alert("up")
            // this.setState({
            //   loading:false
            // })
        }
        else {
            let that = this;
            // console.log(that.state.instituteName + " " + that.state.category +  " " + that.state.classification + " " +that.state.duration  + " " +  that.state.durationValidity )
            if (Object.keys(that.props.classificationFields).length == 0 || that.props.classificationCategory == "" || that.props.classificationCategory == "Choose" || that.props.classificationName == "") {

                that.setState({
                    alertMessage: Strings.ALL_FIELDS_REQUIRED,
                    alertShow: true,
                    theme: "info",
                    loading: false
                })
                // alert("stop")
            }
            else {
                let timeDuration = ""
                if (that.props.classificationDurationValidity == "year") {
                    timeDuration = parseInt(that.props.classificationDuration,10) * 31536000
                }
                else if (that.props.classificationDurationValidity == "months") {
                    timeDuration = parseInt(that.props.classificationDuration,10) * 2592000


                }
                else if (that.props.classificationDurationValidity == "days") {
                    timeDuration = parseInt(that.props.classificationDuration,10) * 86400
                }
                else if(that.props.classificationDurationValidity == "" ||that.props.classificationDurationValidity == "Choose" ){
                    timeDuration = 0
                  }

                console.log(timeDuration)
                let imageFile = this.props.classificationCertificate
                console.log(imageFile)
                var formData = new FormData()
                formData.append('file', imageFile)
                formData.append('upload_preset', Routes.CLOUDINARY_PRESET)
                await axios.post(Routes.CLOUDINARY_API + "/upload", formData)
                    .then(function (res) {
                        console.log(res)
                        console.log(res.data.public_id)
                        console.log(res.data.secure_url)
                        imageURL = res.data.secure_url
                        certificatePublicId = res.data.public_id
                    })
                    .catch(function (err) {
                        console.log("err", err)
                    })
                let temp = that.props.classificationFields
                for(let i= 0 ; i < temp.length ; i++){
                      let str =  temp[i].htmlStringCode
                      if(temp[i].editorValue){
                      temp[i].htmlStringCode = str.replace(temp[i].editorValue , temp[i].value)
                      delete temp[i].editorValue
                      }
                }
                this.props.ClassificationFields(temp)

                let obj = {
                    instituteName: that.props.selectedInstituteName.name,
                    category: that.props.classificationCategory,
                    classification: that.props.classificationName,
                    durationValidity: timeDuration,
                    dynamicCertificateFields: temp,
                    certificateImage : {
                    certificateImageUrl: imageURL,
                    certificateImageID : certificatePublicId
                    },

                    // country: this.state.country,
                    // postalCode: this.state.postalCode
                }
                console.log(obj)
                  console.log(that.state.selectedInstituteId)
                axios.post(Routes.CLASSIFICATION + that.props.selectedInstituteName.id, obj)
                    .then(function (response) {

                        // console.log(response.data.data.result);
                        that.setState({
                            loading: true
                        })
                        alert("Classification has been added")
                        that.props.history.push('/manageClassification')

                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log(error.response)
                        console.log(error.response.data.responseMessage)
                        if (error.response.data.responseCode == Response.BAD_REQUEST) {
                            that.setState({
                                alertShow: true,
                                alertMessage: error.response.data.responseMessage,
                                theme: "danger",
                                loading: false
                            })
                        }
                        // that.setState({
                        //   loading:false
                        // })
                    });
            }
        }

    }


    async onRegisterClick() {
        console.log("#################################################3")
        console.log(this.props.classificationName, this.props.classificationCategory, this.props.classificationDuration, this.props.classificationDurationValidity)
        console.log(typeof (this.props.classificationDuration))
        console.log(this.props.classificationCertificate)
        console.log(this.props.classificationFields)
        let imageURL = ''
        // console.log(this.state.selectedInstituteId)
        this.setState({
            loading: true
        })
        console.log(this.props.selectedInstituteName)
        if (this.props.selectedInstituteName.name == "Select Organization") {
            console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

            this.setState({
                alertShow: true,
                alertMessage: "Select Institute",
                theme: "danger",
                loading: false

            })
            // alert("up")
            // this.setState({
            //   loading:false
            // })
        }
        else {
            let that = this;
            // console.log(that.state.instituteName + " " + that.state.category +  " " + that.state.classification + " " +that.state.duration  + " " +  that.state.durationValidity )
            if (that.props.classificationCategory == "" || that.props.classificationCategory == "Choose" || that.props.classificationName == "" || that.props.classificationDuration == "" || that.props.classificationDurationValidity == "" || that.props.classificationDurationValidity == "Choose") {

                that.setState({
                    alertMessage: Strings.ALL_FIELDS_REQUIRED,
                    alertShow: true,
                    theme: "info",
                    loading: false
                })
                alert("stop")
            }
            else {
                let timeDuration = ""
                if (that.props.classificationDurationValidity == "year") {
                    timeDuration = that.props.classificationDuration * 31536000
                }
                else if (that.props.classificationDurationValidity == "months") {
                    timeDuration = that.props.classificationDuration * 2592000


                }
                else if (that.props.classificationDurationValidity == "days") {
                }
                timeDuration = that.props.classificationDuration * 86400

                console.log(timeDuration)
                let imageFile = this.props.classificationCertificate
                console.log(imageFile)
                var formData = new FormData()
                formData.append('file', imageFile)
                formData.append('upload_preset', Routes.CLOUDINARY_PRESET)
                await axios.post(Routes.CLOUDINARY_API, formData)
                    .then(function (res) {
                        console.log(res)
                        console.log(res.data.secure_url)
                        imageURL = res.data.secure_url
                    })
                    .catch(function (err) {
                        console.log("err", err)
                    })
                let obj = {
                    instituteName: that.props.selectedInstituteName.name,
                    category: that.props.classificationCategory,
                    classification: that.props.classificationName,
                    durationValidity: timeDuration,
                    certificateImageUrl: imageURL,
                    dynamicCertificateFields: that.props.classificationFields

                    // country: this.state.country,
                    // postalCode: this.state.postalCode
                }
                console.log(obj)
                //   console.log(that.state.selectedInstituteId)
                axios.post(Routes.CLASSIFICATION + that.props.selectedInstituteName.id, obj)
                    .then(function (response) {

                        // console.log(response.data.data.result);
                        that.setState({
                            loading: false
                        })
                        alert("Classification has been added")
                        that.props.history.push('/manageClassification')

                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log(error.response)
                        console.log(error.response.data.responseMessage)
                        if (error.response.data.responseCode == Response.BAD_REQUEST) {
                            that.setState({
                                alertShow: true,
                                alertMessage: error.response.data.responseMessage,
                                theme: "danger",
                                loading: false
                            })
                        }
                        // that.setState({
                        //   loading:false
                        // })
                    });
            }
        }
        // this.setState({
        //   loading:false
        // })
    }
    dismiss() {
        this.setState({ alertShow: false });
    }

    toggle(which) {
        const newState = { ...this.state };
        newState[which] = !this.state[which];
        this.setState(newState);
    }
    onClickOptionss(ev) {
        console.log(ev)
    }
    onCancelClick() {
        let obj = {
            category: '',
            classification: '',
            durationValidity: null,
            instituteName: '',
            _id: ''
        }
        this.props.EditClassification(obj)
        this.props.EditClassificationState(false)
        this.props.history.push("/manageClassification")
    }
    onSaveClick() {
        this.setState({
            loading: true
        })
        let that = this;
        console.log(that.state.instituteName + " " + that.state.category + " " + that.state.classification + " " + that.state.duration + " " + that.state.durationValidity)
        if (that.state.category == "" || this.state.category == "Choose" || that.state.classification == "" || that.state.duration == "" || that.state.durationValidity == "" || this.state.durationValidity == "Choose") {
            that.setState({
                alertMessage: Strings.ALL_FIELDS_REQUIRED,
                alertShow: true,
                theme: "danger",
                loading: false
            })
        }
        else {
            let timeDuration = ""
            if (that.state.durationValidity == "year") {
                timeDuration = that.state.duration * 31536000
            }
            else if (that.state.durationValidity == "months") {
                timeDuration = that.state.duration * 2592000


            }
            else if (that.state.durationValidity == "days") {
            }
            timeDuration = that.state.duration * 86400
            console.log(that.props.selectedInstituteName.id)
            console.log(timeDuration)
            let obj = {
                instituteName: that.props.selectedInstituteName.name,
                instituteId: that.props.selectedInstituteName.id,
                category: that.state.category,
                classification: that.state.classification,
                durationValidity: timeDuration,
                // country: this.state.country,
                // postalCode: this.state.postalCode
            }
            console.log(obj)
            console.log(that.state.selectedInstituteId)
            axios.put(Routes.EDIT_CLASSIFICATION + that.props.editClassificationData._id, obj)
                .then(function (response) {

                    // console.log(response.data.data.result);
                    that.setState({
                        loading: false
                    })
                    alert("Classification has been Updated")
                    that.props.history.push('/manageClassification')

                })
                .catch(function (error) {
                    console.log(error);
                    console.log(error.response);

                    if (error.response == undefined) {
                        that.setState({
                            alertMessage: "Network Error",
                            alertShow: true,
                            theme: "danger",
                            loading: false
                        })
                    }
                    else if (error.response.data.responseCode == Response.BAD_REQUEST) {
                        that.setState({
                            alertMessage: error.response.data.responseMessage,
                            alertShow: true,
                            theme: "danger",
                            loading: false
                        })
                    }
                    else {
                        that.setState({
                            alertMessage: error.response.data.responseMessage,
                            alertShow: true,
                            theme: "danger",
                            loading: false
                        })
                    }
                });
        }
    }


    render() {
        return (
            <Container fluid className="main-content-container px-4">
                {(this.props.userData.isVerified) ? (
                    null
                ) : (
                        <Alert className="mb-0" open={true} theme="danger">
                            <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to="account_activation" style={{ color: "white", fontWeight: "bold" }}>click here</Link> to verify it.
        </Alert>
                    )}
                <Alert className="mb-0" open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
                    <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
                </Alert>
                <div className='sweet-loading' style={{ margin: "25% 50%" }}>
                    <PropagateLoader
                        //   css={override}
                        color={'#a9b7e4'}
                        loading={this.state.loading}
                    />
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(Strings.REDUX, state);
    return {
        Title: state.pageTitle,
        userData: state.user_reducer.user,
        selectedInstituteName: state.user_reducer.selectedInstituteName,
        editClassificationState: state.dashboard_reducer.editClassificationState,
        editClassificationData: state.dashboard_reducer.editClassificationData,
        classificationCategory: state.dashboard_reducer.registerClassificationCategory,
        classificationName: state.dashboard_reducer.registerClassificationName,
        classificationDuration: state.dashboard_reducer.registerClassificationDuration,
        classificationDurationValidity: state.dashboard_reducer.registerClassificationDurationValidity,
        selectedInstituteName: state.user_reducer.selectedInstituteName,
        classificationCertificate: state.dashboard_reducer.image,
        classificationFields: state.dashboard_reducer.classificationFields,





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
        ClassificationFields : (data) => {
            dispatch(ClassificationFields(data))
        },
        // UpdateTitle: (title) => dispatch(pageTitle(title))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClassificationRegistration));
