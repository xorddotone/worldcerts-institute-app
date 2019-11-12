import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
import { useDispatch, useSelector } from "react-redux";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import qrExample from '../../images/qrcode.png'
import { Resizable } from "re-resizable";
import ReactFileReader from 'react-file-reader';

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
  const [editorState, setEditorState] = useState([])
  const [qrIndex, setQrIndex] = useState()
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
  const [height , setHeight] = useState(200)
  const [qrWidth, setqrWidth] = useState(200)
  const [qrHeight, setQrHeight] = useState(80)

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
    console.log("imageHeight ==>", imageHeight)
    console.log("imageWidth ==>", imageWidth)

    setFields(
      update(fields, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: fields })

    let tempField = JSON.parse(JSON.stringify(fields))
    for (let i = 0; i < tempField.length - 1; i++) {
      if(tempField[i].value !== true){
      let tops = convertPxToPercentage(imageHeight, tempField[i].top + 40 )
      let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 250)
      tempField[i].left = lefts
      tempField[i].top = tops
    }
    else{
      let tops = convertPxToPercentage(imageHeight, tempField[i].top + 40 )
      let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 100)
      tempField[i].left = lefts
      tempField[i].top = tops
    }
  }
  if(tempField[id].value == true){
    let tops = convertPxToPercentage(imageHeight, top + 40 )
    let lefts = convertPxToPercentage(imageWidth, left + 115)
    tempField[id].left = lefts
    tempField[id].top = tops
    console.log("tempFields ==> ", tempField)
  }
  else{
    let tops = convertPxToPercentage(imageHeight, top + 40 )
    let lefts = convertPxToPercentage(imageWidth, left + 250)
    tempField[id].left = lefts
    tempField[id].top = tops
    console.log("tempFields ==> ", tempField)
  }
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
    let top = 0
    console.log(classificationFields)
    console.log(classificationFields.length)
    const tempEditorState = [...editorState]
    for (let i = 0; i < classificationFields.length; i++) {
    if(classificationFields[i].htmlStringCode == ""){
      top = top + 70
      console.log("top ==> ", top)
      fields.push({ top: top, left: -35, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue })
      tempEditorState.push(EditorState.createEmpty())
      setEditorState(tempEditorState)
    }
    else if( classificationFields[i].value !== true){
      console.log("IN elseeeee")
      fields.push({ top: classificationFields[i].top, left: classificationFields[i].left, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue })
      tempEditorState.push(EditorState.createEmpty())
      setEditorState(tempEditorState)
    }
  }
  console.log((classificationFields.length -1).value == true )
      if(qrVisibility){

        if((classificationFields.length -1).value == true ){
         console.log("top ============>" , top)
         fields.push({ top: (classificationFields.length -1).top, left: (classificationFields.length -1).left, value: qrVisibility , height: (classificationFields.length -1).height })
         console.log("fields ==> ", fields)
         console.log("fields length ==> ", fields.length)
         setQrIndex(fields.length - 1)
       }
       else {
         console.log("top uuuiuiui============>" , top)
         fields.push({ top: top +70, left: -70, value: qrVisibility , height: qrHeight })
         console.log("fields ==> ", fields)
         console.log("fields length ==> ", fields.length)
         setQrIndex(fields.length - 1)
       }
     
      }
    return () => {
      console.log(fields)
    // dispatch({ type: 'CLASSIFICATION_QR', payload: false })
      
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
  function handleChange(i, editorStateValue) {
    console.log(editorStateValue)
    console.log(editorStateValue.getCurrentContent().getPlainText())
    const tempEditorState = [...editorState]
    tempEditorState[i] = editorStateValue
    setEditorState(tempEditorState)
    console.log(draftToHtml(convertToRaw(editorStateValue.getCurrentContent())))
    const values = [...fields];
    values[i].editorValue = editorStateValue
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
    values[i].editorValue = editorStateValue.getCurrentContent().getPlainText()
    values[i].htmlStringCode = draftToHtml(convertToRaw(editorStateValue.getCurrentContent()));
    setFields(values);
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    for (let i = 0; i < tempFields.length; i++) {

      if(tempFields[i].value !== true){
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40 )
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
      else{
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40 )
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 115)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
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
    values.push({ top: boxTop, left: boxLeft, htmlStringCode: EditorState.createEmpty(), value: EditorState.createEmpty() });
    console.log(values)
    setFields(values);

  }

  function handleRemove(i) {
    console.log("fields before ==> ", fields)

    const values = [...fields];
    const tempEditorstate = [...editorState]
    console.log("fields before ==> ", fields)
    console.log("values before ==> ", values)
    tempEditorstate.splice(i, 1)
    values.splice(i, 1);
    console.log("values after splice ==> ", values)
    setEditorState(tempEditorstate)
    setFields(values);
    console.log(values)
    if (i !== qrIndex && values.length !== 0) {
      if (values[values.length - 1].value == true) {
        setQrIndex(values.length - 1)
      }
    }
    console.log("values after set ==> ", values)
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })

    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    console.log("tempFields after parse==> ", tempFields)
    console.log("values after parse ==> ", values)

    for (let i = 0; i < tempFields.length; i++) {
      if(tempFields[i].value !== true){
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40 )
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
      else{
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40 )
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 115)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
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
  function handleFiles(file) {
    console.log(file[0])

    var img = document.createElement("img");

    img.src = URL.createObjectURL(file[0]);

    img.onload = function () {
      var width = img.naturalWidth,
        height = img.naturalHeight;

      URL.revokeObjectURL(img.src);

      console.log("temp.naturalWidht ==>", width)
      console.log("temp.naturalHeight ==>", height)

      if (width > 1000 & height > 1000) {
        console.log("IN IFFFF")
        dispatch({ type: 'UPLOADED_IMAGE', payload: file[0] })
      }
      else {
        console.log("IN Elsee")
        alert("errorrrrrr")
      }
    }
  }
  function zoomPicIn(i){
    setQrHeight(prev => prev + 20)
    const values = [...fields];
    let temp = values[i].height
    values[i].height = 20 + temp
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
    setFields(values);
  }
  
  function zoomPicOut(i){
    setQrHeight(prev => prev - 20)
    const values = [...fields];
    let temp = values[i].height
    values[i].height =  temp -20
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: values })
    setFields(values);
    
  }
  return (
    <Card >
      <div id="DnDContainer" ref={drop} style={styles}>
        {console.log("FontSize", fontSizes)}
        {console.log("activeFontSize", activeFontSize)}
        {console.log("activeFoneDec", activeFontDecoration)}
        {console.log("classificationFields", classificationFields)}
        {console.log("fields", fields)}
        {console.log("editorState", editorState)}
        {console.log("image ==> ", image)}
        <Row>
          <Col md="9">
            <div style={{ width: "100%" }}>
              <img id="DnDImage" src={URL.createObjectURL(image)} style={{ maxWidth: "100%" }} />
            </div>
          </Col>
          <Col md="3">
            <ReactFileReader
              handleFiles={handleFiles} fileTypes={['.png', '.jpg', '.jpeg']}
            >

              <span style={{ marginTop: "8em", color: "blue", textDecoration: "underline", cursor: "pointer" }} size="sm" className="mb-2 mr-1"

              >Change Certificate</span>
            </ReactFileReader>
            {Object.keys(fields).map((field, idx) => {
              const { left, top, title } = fields[idx]
              console.log(fields[idx].value)
              return (
                (qrIndex == idx) ?
                  (
                    
                      
                      <Box
                        key={idx}
                        id={idx}
                        left={left}
                        top={top}
                        value={fields}
                        hideSourceOnDrag={hideSourceOnDrag}
                        isImage = {true}
                      >
                      
                        <Row>
                          <Col md="5">
                          <div style = {{textAlign : 'center' , marginBottom: "1em"}}>  <span style = {{ borderRadius : "1em" ,padding: "0px 10px", background:  "linear-gradient(to left, rgb(4, 221, 138), rgb(18, 178, 165))" , color : "white" , marginRight: "1em"}} onClick={() =>zoomPicOut(idx)}>-</span>
        <span style = {{     background: "linear-gradient(to left, rgb(4, 221, 138), rgb(18, 178, 165))",
           borderRadius : "1em" ,padding: "0px 10px" , color : "white"}} onClick={() =>zoomPicIn(idx)}>+</span></div>
                            <div style={{textAlign:'center'}}><img width="inherit" height = {qrHeight} src={qrExample} /></div>
                          </Col>
                          {/* </Resizable> */}
                          <Col md="1" >
                            <span style = {{background :  "grey" , padding: "1px 3px" ,color: "white"}} onClick={() => handleRemove(idx)}>
                              x
                           </span>
                          </Col>
                        </Row>
                      </Box>
                    
                  ) :
                  (

                    <Box
                      key={idx}
                      id={idx}
                      left={left}
                      top={top}
                      value={fields}
                      hideSourceOnDrag={hideSourceOnDrag}
                    >
                      <Row>
                        <Col md="10">
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            toolbarOnFocus
                            toolbar={{
                              options: ['inline', 'fontSize', 'fontFamily', 'textAlign'],
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
                            onEditorStateChange={e => handleChange(idx, e)}
                            placeholder={fields[idx].value}
                          // value = {fields[idx].value}
                          />
                        </Col>
                        <Col md = "1" style = {{alignSelf : 'flex-end'}}>
                          <span  onClick={() => handleRemove(idx)}>
                            X
</span>
</Col>
                      </Row>
                    </Box>

                 )
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
