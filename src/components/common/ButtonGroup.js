import React from "react";
import { ButtonGroup, Button } from "shards-react";
import alignLeft from "../../images/left-alignment.svg"
import alignCenter from "../../images/align-center-2.svg"
import alignRight from "../../images/align.svg"
import "../../css/style.css"

const ButtonGroups = ({ alignment = "left", setAlignment }) => (
    <ButtonGroup className="mb-3">
        {console.log('alignment ==>', alignment)}
        <Button theme="white" className={alignment === "left" ? "worldcerts-button" : ""} onClick={() => setAlignment("left")}  >
            <img src={alignLeft} style={alignment === "left" ? { filter: "invert(1)" } : {}} height="20px" width="20px" />
        </Button>
        <Button theme="white" className={alignment === "center" ? "worldcerts-button" : ""} onClick={() => setAlignment("center")} >
            <img src={alignCenter} style={alignment === "center" ? { filter: "brightness(10)" } : {}} height="20px" width="20px" />
        </Button>
        <Button theme="white" className={alignment === "right" ? "worldcerts-button" : ""} onClick={() => setAlignment("right")} >
            <img src={alignRight} style={alignment === "right" ? { filter: "invert(1)" } : {}} height="20px" width="20px" />
        </Button>
    </ButtonGroup>
);

export default ButtonGroups;