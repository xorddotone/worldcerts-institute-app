import React, { useState } from 'react';
import ButtonGroup from "../../components/common/ButtonGroup"
import { ChromePicker } from "react-color"
import { Container, Row, Col, Button } from "shards-react"
import italic from "../../images/italic-text.svg"

const TextTransfrom = () => {
    // const styles = props.state ? {boxShadow:"inset 1px 1px 3px 0px rgba(0,0,0,0.5)"} : {}
    return (
        <>
            <button style={{ padding: "3px 6px", border: "2px solid lightgrey", fontWeight: "bold", backgroundColor: "white", marginRight: 5 }} >
                <span style={{ display: "inline-block", height: 20, width: 20 }} >B</span>
            </button>
            <button style={{ padding: "3px 6px", border: "2px solid lightgrey", fontStyle: "italic", backgroundColor: "white", marginRight: 5 }} >
                <img style={{ display: "inline-block" }} src={italic} height="13px" width="20px" />
            </button>
            <button style={{ padding: "3px 6px", border: "2px solid lightgrey", backgroundColor: "white" }} >
                <span style={{ display: "inline-block", textDecoration: 'underline', height: 20, width: 20 }} >U</span>
            </button>
        </>
    )
}

const FontFamily = () => {
    const fonts = ['Arial', 'Courier New', 'Times New Roman', 'Georgia', 'Impact', 'Comic Sans MS', 'Trebuchet MS', 'Helvetica', 'Arial-black', 'Garamond', 'Verdana', 'Bookman Old Style', 'Palatino', 'Times', 'Courier']
    return (
        <>
            <select style={{ padding: 8, backgroundColor: "white" }} >
                {
                    fonts.map(item => {
                        return <option value={item} >{item}</option>
                    })
                }
            </select>
        </>
    )
}

const FontSize = () => {
    const sizes = [];
    let i = 4;

    while (true) {
        if (i > 48)
            break;
        sizes.push(i);
        i += 2;
    }

    return (
        <>
            <select style={{ padding: 8, backgroundColor: "white" }} >
                {
                    sizes.map(item => {
                        return <option value={item} >{item}</option>
                    })
                }
            </select>
        </>
    )
}


const Alignment = () => {
    return <ButtonGroup alignment="center" />
}

const ColorPicker = (props) => {
    console.log('props ==>', props)
    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    // const style = props.isPickerOpen ? { position: "absolute", bottom: 0 } : { display: 'none' }
    return (
        <>
            <button style={{ border: "2px solid lightgrey", padding: '5px 10px', backgroundColor: "white" }} onClick={() => props.handleClickPicker()} >
                <div>
                    <div style={{ height: 18 }} >A</div>
                    <div style={{ height: 5, width: 15, backgroundColor: props.color }} ></div>
                </div>
            </button>
            {
                props.isPickerOpen && <div style={popover}>
                    <div style={cover} onClick={() => props.handleClickPicker()} />
                    <ChromePicker color={props.color} onChange={props.handleChangePicker} />
                </div>
            }
            {/* {props.isPickerOpen && <ChromePicker styles={{ position: "absolute", bottom: 0 }} color={props.color} onChange={props.handleChangePicker} />} */}
        </>
    )
}

const Toolbar = () => {

    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [color, setColor] = useState("black")

    const handleChangePicker = (color) => {
        console.log('color ==>', color)
        setColor(color.hex)
    }

    const handleClickPicker = () => {
        setIsPickerOpen(!isPickerOpen)
    }


    const pickerProps = {
        color,
        isPickerOpen,
        handleChangePicker,
        handleClickPicker
    }
    return (
        <>
            <Container style={{ backgroundColor: 'white', padding: 10, boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.5)', borderRadius: 5, marginBottom: 20, alignItems: 'center', }} >
                <Row>
                    <Col lg="2" style={{ paddingTop: 14, }} >
                        <TextTransfrom />
                    </Col>
                    <Col lg="2" style={{ paddingTop: 14, }} >
                        <FontFamily />
                    </Col>
                    <Col lg="1" style={{ paddingTop: 14, }} >
                        <FontSize />
                    </Col>
                    <Col lg="2" style={{ paddingTop: 11, }} >
                        <Alignment />
                    </Col>
                    <Col lg="3" style={{ paddingTop: 14, }} >
                        <ColorPicker {...pickerProps} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Toolbar;