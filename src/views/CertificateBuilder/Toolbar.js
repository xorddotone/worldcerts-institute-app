import React, { useState } from 'react';
import ButtonGroup from "../../components/common/ButtonGroup"
import { ChromePicker } from "react-color"
import { Container, Row, Col, Button } from "shards-react"
import italic from "../../images/italic-text.svg"

const TextTransfrom = (props) => {
    console.log(props)
    const boldStyle = props.activeObject && props.activeObject.bold ? { boxShadow: "inset 1px 1px 3px 0px rgba(0,0,0,0.5)" } : {}
    const italicStyle = props.activeObject && props.activeObject.italic ? { boxShadow: "inset 1px 1px 3px 0px rgba(0,0,0,0.5)" } : {}
    const underlineStyle = props.activeObject && props.activeObject.underline ? { boxShadow: "inset 1px 1px 3px 0px rgba(0,0,0,0.5)" } : {}
    console.log('text transform ==>', props)

    return (
        <>
            {console.log(props.activeObject)}
            <button onClick={() => {
                console.log("IN props", props)
                props.applyStyles({ fontWeight: "bold" })
            }
            }
                style={{ ...boldStyle, padding: "3px 6px", border: "2px solid lightgrey", fontWeight: "bold", backgroundColor: "white", marginRight: 5 }}
            >
                <span style={{ display: "inline-block", height: 20, width: 20 }} >B</span>
            </button>
            <button onClick={() => props.applyStyles({ fontStyle: "italic" })}
                style={{ ...italicStyle, padding: "3px 6px", border: "2px solid lightgrey", fontStyle: "italic", backgroundColor: "white", marginRight: 5 }} >
                <img style={{ display: "inline-block" }} src={italic} height="13px" width="20px" />
            </button>
            <button onClick={() => props.applyStyles({ textDecoration: 'underline' })}
                style={{ ...underlineStyle, padding: "3px 6px", border: "2px solid lightgrey", backgroundColor: "white" }} >
                <span style={{ display: "inline-block", textDecoration: 'underline', height: 20, width: 20 }} >U</span>
            </button>
        </>
    )
}

const FontFamily = (props) => {
    const fonts = ['Arial', 'Courier New', 'Times New Roman', 'Georgia', 'Impact', 'Comic Sans MS', 'Trebuchet MS', 'Helvetica', 'Arial-black', 'Garamond', 'Verdana', 'Bookman Old Style', 'Palatino', 'Times', 'Courier']
    return (
        <>
            <select onChange={(e) => props.setFont(e)} style={{ padding: 8, backgroundColor: "white" }} >
                {
                    fonts.map(item => {
                        return <option value={item} >{item}</option>
                    })
                }
            </select>
        </>
    )
}

const FontSize = (props) => {
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
            <select onChange={(e) => props.setSize(e)} style={{ padding: 8, backgroundColor: "white" }} >
                {
                    sizes.map(item => {
                        return <option value={item} >{item}</option>
                    })
                }
            </select>
        </>
    )
}


const Alignment = (props) => {
    return <ButtonGroup alignment={props.activeObject && props.activeObject.align} setAlignment={props.setAlignment} />
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

const Toolbar = (props) => {

    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [color, setColor] = useState("black")

    const handleChangePicker = (color) => {
        console.log('color ==>', color)
        setColor(color.hex)
        props.applyStyles({ color: color.hex })
    }

    const handleClickPicker = () => {
        setIsPickerOpen(!isPickerOpen)
    }

    const setFont = (e) => {
        console.log('font ==>', e.target.value)
        props.applyStyles({ fontFamily: e.target.value })
    }

    const setSize = (e) => {
        console.log('size ==>', e)
        props.applyStyles({ fontSize: `${e.target.value}px` })
    }

    const setAlignment = (align) => {
        props.applyStyles({ textAlign: align })
    }

    const overlayStyle = {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        zIndex: 1000,
        left: 0,
        cursor: 'not-allowed'
    }

    const pickerProps = {
        color,
        isPickerOpen,
        handleChangePicker,
        handleClickPicker
    }
    return (
        <>
            <Container style={{ backgroundColor: 'white', padding: "10px 10px 0px 10px", boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.5)', borderRadius: 5, marginBottom: 20, alignItems: 'center', position: "relative" }} >
                {!props.activeObject && <div style={overlayStyle} ></div>}
                <Row>
                    <Col lg="2" style={{ paddingTop: 14, }} >
                        <TextTransfrom {...props} />
                    </Col>
                    <Col lg="2" style={{ paddingTop: 14, }} >
                        <FontFamily {...props} setFont={setFont} />
                    </Col>
                    <Col lg="1" style={{ paddingTop: 14, }} >
                        <FontSize {...props} setSize={setSize} />
                    </Col>
                    <Col lg="2" style={{ paddingTop: 11, }} >
                        <Alignment {...props} setAlignment={setAlignment} />
                    </Col>
                    <Col lg="3" style={{ paddingTop: 14, }} >
                        <ColorPicker {...pickerProps} {...props} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Toolbar;