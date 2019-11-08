import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
import { useDispatch, useSelector } from "react-redux";
import FontPicker from "font-picker-react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import qrExample from '../../images/qrcode.png'
import { Resizable } from "re-resizable";

import {

  FormSelect,
  FormCheckbox,
  Card,
  Row,
  Col,
} from "shards-react";

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
  console.log("Checkbox: ", name, checked);

  return (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );
};

const Qrstyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const styles = {
  width: "100%",
  height: "100%",
  position: 'relative',
}
const Container = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 920, title: 'Drag me around' },
    b: { top: 60, left: 920, title: 'Drag me too' },
  })
  const dispatch = useDispatch()
  const image = useSelector(state => state.dashboard_reducer.image)
  const [fields, setFields] = useState([]);
  const classificationFields = useSelector(state => state.dashboard_reducer.classificationCombineFields)
  const qrVisibility = useSelector(state => state.dashboard_reducer.qrVisibility)  
  const [fontSizes, setFontSize] = useState([]);
  const [activeFontSize, setActiveFontSize] = useState(6)
  const [activeFontDecoration, setActiveFontDecoration] = useState(6)
  const [editorState,setEditorState] = useState([])
  const [qrIndex, setQrIndex] = useState()
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
  const [qrWidth, setqrWidth] = useState(200)
  const [qrHeight, setqrHeight] = useState(200)

  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans")


  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      console.log(item)
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      console.log(item)
      moveBox(item.id, left, top)
      return undefined
    },
  })
  const moveBox = (id, left, top) => {
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth

    setFields(
      update(fields, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
    let tempField = JSON.parse(JSON.stringify(fields))
    for (let i = 0; i < tempField.length - 1; i++) {
      let tops = convertPxToPercentage(imageHeight, tempField[i].top +60)
      let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 335)
      tempField[i].left = lefts
      tempField[i].top = tops
    }

    let tops = convertPxToPercentage(imageHeight, top +60)
    let lefts = convertPxToPercentage(imageWidth, left + 335)
    tempField[id].left = lefts
    tempField[id].top = tops
    console.log("tempFields ==> ", tempField)

    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempField })
    // handleAdd()
  }

  useEffect(() => {
    let left = document.getElementById("DnDImage").clientWidth;
    console.log(typeof (left))
    setTop(4)
    setLeft(left - 20)
    fontSizes[0] = 6
    setFontSize(fontSizes)
    for (let i = 1; i < 25; i++) {
      fontSizes[i] = fontSizes[i - 1] + 2
      setFontSize(fontSizes)
    }

    

    console.log(classificationFields.length)
    const tempEditorState = [...editorState]
    let top = 0 
    for(let i = 0;i<classificationFields.length;i++){
        top = top + 80
       console.log("top ==> ", top)
      fields.push({top: top , left:-150 , htmlStringCode:classificationFields[i],value: classificationFields[i], editorValue: classificationFields[i]})
        tempEditorState.push(EditorState.createEmpty())
    setEditorState(tempEditorState)
    }
    if(qrVisibility){
      fields.push({top: top + 80, left:-150 , htmlStringCode : qrVisibility, value : qrVisibility})
      console.log("fields ==> ",fields)      
      console.log("fields length ==> ",fields.length)
      setQrIndex(fields.length - 1 )
    }
    return () => {
      console.log(fields)
    }
  }, [])

  function convertPxToPercentage(image, box) {
    console.log("In percentage")
    console.log("box => ", box)
    console.log("image => ", image)
    let percentage = (box / image) * 100
    console.log("percentage => ", percentage)
    return percentage
  }
  function handleChange(i,editorStateValue) {
    console.log(editorStateValue)
    console.log(editorStateValue.getCurrentContent().getPlainText())
    const tempEditorState = [...editorState]
    tempEditorState[i] = editorStateValue
    setEditorState(tempEditorState)
   console.log(draftToHtml(convertToRaw(editorStateValue.getCurrentContent())))
    const values = [...fields];
    values[i].editorValue = editorStateValue.getCurrentContent().getPlainText()
    values[i].htmlStringCode = draftToHtml(convertToRaw(editorStateValue.getCurrentContent()));
    setFields(values);
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    for (let i = 0; i < tempFields.length; i++) {
      let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 60)
      let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 335)
      tempFields[i].left = lefts
      tempFields[i].top = tops
    }
    console.log("tempFields ==> ", tempFields)
    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })
  }

  function handleAdd() {
    const tempEditorState = [...editorState]
    tempEditorState.push(EditorState.createEmpty())
    setEditorState(tempEditorState)
    const values = [...fields];
    console.log("boxTop==>", boxTop, "boxLeft==>", boxLeft)
    values.push({ top: boxTop, left: boxLeft,htmlStringCode:EditorState.createEmpty(), value: EditorState.createEmpty() });
    console.log(values)
    setFields(values);

  }

  function handleRemove(i) {
    console.log("fields before ==> ", fields)

    const values = [...fields];
    const tempEditorstate = [...editorState]
    console.log("fields before ==> ", fields)
    console.log("values before ==> ", values)
    tempEditorstate.splice(i,1)
    values.splice(i, 1);
    console.log("values after splice ==> ", values)
    setEditorState(tempEditorstate)
    setFields(values);
    console.log(values)
    if( i !== qrIndex && values.length !== 0 ){
      if(values[values.length - 1].value == true){
    setQrIndex(values.length - 1)
    }
  }
    console.log("values after set ==> ", values)
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    console.log("tempFields after parse==> ", tempFields)
    console.log("values after parse ==> ", values)

    for (let i = 0; i < tempFields.length; i++) {
      let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 60)
      let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 335)
      tempFields[i].left = lefts
      tempFields[i].top = tops
    }
    console.log("tempFields => ", tempFields)
    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })

  }

  function fontSizeChangeHandler(ev) {
    console.log(ev.target.value)
    setActiveFontSize(ev.target.value)
  }
  function fontDecorationChangeHandler(ev) {
    console.log(ev.target.value)
    setActiveFontDecoration(ev.target.value)
  }

  return (
    <Card >
    <div id="DnDContainer" ref={drop} style={styles}>
      {console.log("FontSize",fontSizes)}
      {console.log("activeFontSize",activeFontSize)}
      {console.log("activeFoneDec",activeFontDecoration)}
      {console.log("fields",fields)}
      {console.log("editorState",editorState)}
      {console.log("image ==> " , image)}
      <Row>
        <Col md = "9">
          <div style = {{width: "100%"}}>
      <img id="DnDImage" src={URL.createObjectURL(image)} style = {{maxWidth: "100%"}}/>
      </div>
      </Col>
<Col md = "3">
{Object.keys(fields).map((field, idx) => {
        const { left, top, title } = fields[idx]
        console.log(fields[idx].value)
        return (
          (qrIndex == idx )?
            (
            <div>
             <Box
              key={idx}
              id={idx}
              left={left}
              top={top}
              value ={fields}
              hideSourceOnDrag={hideSourceOnDrag}
            >
              
           {/* <Resizable
           style={Qrstyle}
           defaultSize={{
             width: 200,
             height: 200
           }}
              // style={Qrstyle}
              // size={{ width: qrWidth, height: qrHeight }}
              // onResizeStop={(e, direction, ref, d) => {
                
              //     setqrWidth(qrWidth + d.width)
              //     setqrHeight(qrHeight + d.height)
              
              // }}
            >  */}
      

      <img width = "40%" src = {qrExample} /> 
      
      {/* </Resizable> */}
    
      <span onClick = {() => handleRemove(idx)}>
      X
      </span>
    
            </Box> 
      </div>
            ):
            (<div key={`${field}-${idx}`}>
            {console.log(field, idx)}
            
            <Box
              key={idx}
              id={idx}
              left={left}
              top={top}
              value={fields}
              hideSourceOnDrag={hideSourceOnDrag}
            >
              <Row>
<Col md = "10">
<Editor
  wrapperClassName="wrapper-class"
  editorClassName="editor-class"
  toolbarClassName="toolbar-class"
  toolbarOnFocus
  toolbar={{
    options: ['inline','fontSize', 'fontFamily','textAlign'],
    inline: {
      inDropdown: true,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['bold', 'italic', 'underline'],
    },
    fontSize: {
      // icon: fontSize,
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    fontFamily: {
      options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    textAlign: {
      inDropdown: true,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['left', 'center', 'right', 'justify'],
    },
  }}
  editorState={editorState[idx]}
  // defaultEditorState = "Text"
  onEditorStateChange={e => handleChange( idx,e)}
  placeholder = {fields[idx].value}
  // value = {fields[idx].value}
/> 
</Col>
  <Col md = "1" style = {{alignSelf: "flex-end"}}>
<span onClick = {() => handleRemove(idx)}>
    X
</span>
</Col>
</Row>
            </Box>

          </div>)       
        );
      })
    }
      </Col>
      </Row>
      {/* {Object.keys(boxes).map(key => {
        const { left, top, title } = boxes[key]
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            <input type = "text"  />
          </Box>
        )
      })} */}
      

    </div>
    </Card>
  )
}
export default Container
