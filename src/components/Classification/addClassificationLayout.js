import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddClassification from '../../views/AddClassification';
import UploadCertificate from '../../views/UploadCertificate'
import RegisterClassification from '../../views/Classification/RegisterClassification';
import ClassificationRegistration from '../../views/Classification/ClassificationRegistration';
import { useDispatch, useSelector } from "react-redux";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(to left, rgb(4, 221, 138), rgb(18, 178, 165));',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(to left, rgb(4, 221, 138), rgb(18, 178, 165));',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(to left, rgb(4, 221, 138), rgb(18, 178, 165));',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(to left, rgb(4, 221, 138), rgb(18, 178, 165));',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '98%',
    margin: "1em"
    // height: '50%'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Add classification details', 'Create Certificate ', 'complete the process'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
          <AddClassification/>
      );
    case 1:
      return <UploadCertificate/>;
    case 2:
      return <RegisterClassification/>;
      case 3:
        return <ClassificationRegistration/>
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const organizationName = useSelector(state => state.user_reducer.selectedInstituteName.name)
  const classificationCategory = useSelector(state => state.dashboard_reducer.registerClassificationCategory)
  const classificationName = useSelector(state => state.dashboard_reducer.registerClassificationName)
  const classificationCertificate = useSelector(state => state.dashboard_reducer.image.name)

  const steps = getSteps();

  const handleNext = () => {
    console.log(activeStep)
    switch (activeStep) {
      case 0: 
      if(organizationName == "Select Organization" || classificationCategory == "" || classificationName == "" ){
       return alert("Fill the required Fields before Proceeding to next Step")
      }
      else{
        return setActiveStep(prevActiveStep => prevActiveStep + 1);    
      }
      case 1: 
      if(classificationCertificate == ""){
       return alert("upload the certificate before Proceeding to next Step")
      }
      else{
        return setActiveStep(prevActiveStep => prevActiveStep + 1);  
      }
    
      case 2:
          return setActiveStep(prevActiveStep => prevActiveStep + 1);  

    }
    // console.log(activeStep)
    // switch (activeStep){
    //   case 0: 
    //   console.log("zero")
    //   return setActiveStep(prevActiveStep => prevActiveStep + 1);
    //   case 1: 
    //    console.log("one")
    //    return setActiveStep(prevActiveStep => prevActiveStep + 1);
    //    case 0: 
    //    return setActiveStep(prevActiveStep => prevActiveStep + 1);
    //    console.log("two")
    // }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
    {    console.log(activeStep)}
      
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            {activeStep === steps.length ? (null) : (
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              
              <Button
                variant="contained"
                style = {{backgroundImage:'linear-gradient(to left, rgb(4, 221, 138), rgb(18, 178, 165))' , color: 'white', fontWeight: 'bold'}}
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Register' : 'Next'}
              </Button>
            </div>
            )
            }
          </div>
        
      </div>
    </div>
  );
}