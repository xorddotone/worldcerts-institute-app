import React from "react";
import { ButtonGroup, Button } from "shards-react";
import alignLeft from "../../images/left-alignment.svg"
import alignCenter from "../../images/align-center-2.svg"
import alignRight from "../../images/align.svg"

const ButtonGroups = ({ alignment = "left" }) => (
    <ButtonGroup className="mb-3">
        {console.log('alignment ==>', alignment)}
        <Button theme={alignment === "left" ? "primary" : "white"}>
            <img src={alignLeft} style={alignment === "left" ? { filter: "invert(1)" } : {}} height="20px" width="20px" />
        </Button>
        <Button theme={alignment === "center" ? "primary" : "white"}>
            <img src={alignCenter} style={alignment === "center" ? { filter: "brightness(10)" } : {}} height="20px" width="20px" />
        </Button>
        <Button theme={alignment === "right" ? "primary" : "white"}>
            <img src={alignRight} style={alignment === "right" ? { filter: "invert(1)" } : {}} height="20px" width="20px" />
        </Button>
    </ButtonGroup>
);

export default ButtonGroups;