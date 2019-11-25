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
import qrExample from '../../images/worldCertsQr.png'
import { Resizable } from "re-resizable";
import ReactFileReader from 'react-file-reader';
import "../../css/style.css"
import {

  FormSelect,
  FormCheckbox,
  Card,
  FormInput,
  Row,
  InputGroup,
  Col,
  Button
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
const Container = ({ hideSourceOnDrag, setArrayFields, setActiveStyle, qrHeight, qrIndex, fields, editorState, setEditorState, classificationFields, setQrIndex, setConstantText, constantText, constantTextFields, setConstantTextFields }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 920, title: 'Drag me around' },
    b: { top: 60, left: 920, title: 'Drag me too' },
  })
  const dispatch = useDispatch()
  const image = useSelector(state => state.dashboard_reducer.image)
  // const [fields, setFields] = useState([]);
  const [dropDownFields, setDropDownFields] = useState([])
  const [selectField, setSelectFields] = useState();
  // const classificationFields = useSelector(state => state.dashboard_reducer.classificationCombineFields)
  const qrVisibility = useSelector(state => state.dashboard_reducer.qrVisibility)
  const [demoDataDisabled, setDemoDataDisabled] = useState(true)
  // const [editorState, setEditorState] = useState([])
  // const [qrIndex, setQrIndex] = useState()
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
  const [inputState, setInputState] = useState()
  // const [qrHeight, setQrHeight] = useState(80)
  const [editClassificationState, setEditClassificationState] = useState(useSelector(state => state.dashboard_reducer.editClassificationState))
  const [styleState, setStyleState] = useState()

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      console.log(item)
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      console.log(item)
      moveBox(item.id, left, top , item.fieldType)
      return undefined
    },
  })
  const moveBox = (id, left, top , fieldType) => {
    console.log(id , left , top)
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempField = null
    console.log("imageHeight ==>", imageHeight)
    console.log("imageWidth ==>", imageWidth)
    if(fieldType == "Dynamic Fields"){
    setArrayFields(
      update(fields, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: fields })
    tempField = JSON.parse(JSON.stringify(fields))
    }
    else if(fieldType == "ConstantField"){
      setConstantTextFields(
        update(constantTextFields, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
      // dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: fields })
      tempField = JSON.parse(JSON.stringify(constantTextFields))
    }
        for (let i = 0; i < tempField.length - 1; i++) {
      if (tempField[i].value !== true) {
        let tops = convertPxToPercentage(imageHeight, tempField[i].top + 40)
        let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 250)
        tempField[i].left = lefts
        tempField[i].top = tops
      }
      else {
        let tops = convertPxToPercentage(imageHeight, tempField[i].top + 40)
        let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 100)
        tempField[i].left = lefts
        tempField[i].top = tops
      }
    }
    if (tempField[id].value == true) {
      let tops = convertPxToPercentage(imageHeight, top + 40)
      let lefts = convertPxToPercentage(imageWidth, left + 115)
      tempField[id].left = lefts
      tempField[id].top = tops
      console.log("tempFields ==> ", tempField)
    }
    else {
      let tops = convertPxToPercentage(imageHeight, top + 40)
      let lefts = convertPxToPercentage(imageWidth, left + 250)
      tempField[id].left = lefts
      tempField[id].top = tops
      console.log("tempFields ==> ", tempField)
    }
    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempField })
    // handleAdd()
  }


  // useEffect(() => {
  //   let left = document.getElementById("DnDImage").clientWidth;
  //   setTop(4)
  //   setLeft(left - 20)   
  //   let top = 0
  //   console.log(classificationFields)
  //   console.log(classificationFields.length)
  //   const tempEditorState = [...editorState]
  //   for (let i = 0; i < classificationFields.length; i++) {
  //     if (classificationFields[i].htmlStringCode == "") {
  //       top = top + 70
  //       console.log("top ==> ", top)
  //       fields.push({ top: classificationFields[i].top, left: classificationFields[i].left, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue ,style : {} })
  //       dropDownFields.push({value : classificationFields[i].value , id : i })
  //       tempEditorState.push(EditorState.createEmpty())
  //       setEditorState(tempEditorState)
  //     }
  //     else if (classificationFields[i].value !== true) {
  //       console.log("IN elseeeee")
  //       fields.push({ top: classificationFields[i].top, left: classificationFields[i].left, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue , style : classificationFields[i].style })
  //       tempEditorState.push(EditorState.createEmpty())
  //       setEditorState(tempEditorState)
  //     }
  //   }
  //   console.log((classificationFields.length - 1).value == true)
  //   if (qrVisibility) {

  //     if ((classificationFields.length - 1).value == true) {
  //       console.log("top ============>", top)
  //       fields.push({ top: (classificationFields.length - 1).top, left: (classificationFields.length - 1).left, value: qrVisibility, height: (classificationFields.length - 1).height })
  //       console.log("fields ==> ", fields)
  //       console.log("fields length ==> ", fields.length)
  //       setQrIndex(fields.length - 1)
  //     }
  //     else {
  //       console.log("top uuuiuiui============>", top)
  //       fields.push({ top: top + 70, left: -70, value: qrVisibility, height: qrHeight })
  //       console.log("fields ==> ", fields)
  //       console.log("fields length ==> ", fields.length)
  //       setQrIndex(fields.length - 1)
  //     }

  //   }
  //   setArrayFields(fields)
  //   return () => {
  //     console.log(fields)
  //     // dispatch({ type: 'CLASSIFICATION_QR', payload: false })

  //   }
  // }, [])
  function onConstantFieldChange(ev) {
    console.log(ev.target.value)
    setConstantText(ev.target.value)

  }
  function convertPxToPercentage(image, box) {
    console.log("In percentage")
    console.log("box => ", box)
    console.log("image => ", image)
    let percentage = (box / image) * 100
    console.log("percentage => ", percentage)
    return percentage
  }
  function handleChange(i, editorStateValue) {
    // console.log(event.target.value) ********
    // setInputState(event.target.value) ********
    // var para = document.createElement("p"); ********
    // console.log(para) ********
    // var node = document.createTextNode(event.target.value); ********
    // console.log(node) ********
    // var htmlCode = para.appendChild(node); ********
    // console.log("htmlCode => ", htmlCode) ********

    // const values = selectField;
    // values.editorValue = event.target.value
    // values.htmlStringCode = htmlCode
    // dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
    // setSelectFields(values); ************
    // let imageHeight = document.getElementById("DnDImage").clientHeight
    // let imageWidth = document.getElementById("DnDImage").clientWidth
    // let tempFields = JSON.parse(JSON.stringify(values))
    // for (let i = 0; i < tempFields.length; i++) {

    //   if (tempFields[i].value !== true) {
    //     let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40)
    //     let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
    //     tempFields[i].left = lefts
    //     tempFields[i].top = tops
    //   }
    //   else {
    //     let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40)
    //     let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 115)
    //     tempFields[i].left = lefts
    //     tempFields[i].top = tops
    //   }
    // }
    // console.log("tempFields ==> ", tempFields)
    // dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })

    // *******************
    const values = [...fields];
    values[i].editorValue = editorStateValue.target.value
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
    values[i].editorValue = editorStateValue.target.value
    values[i].htmlStringCode = editorStateValue.target.value
    console.log(editorState)
    const tempEditorState = [...editorState]
    tempEditorState[i] = editorStateValue.target.value
    setEditorState(tempEditorState)
    // console.log(draftToHtml(convertToRaw(editorStateValue.getCurrentContent())))
    // const values = [...fields];
    // values[i].editorValue = editorStateValue
    // dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
    // values[i].editorValue = editorStateValue.getCurrentContent().getPlainText()
    // values[i].htmlStringCode = draftToHtml(convertToRaw(editorStateValue.getCurrentContent()));
    setArrayFields(values);
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    for (let i = 0; i < tempFields.length; i++) {

      if (tempFields[i].value !== true) {
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40)
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
      else {
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40)
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 115)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
    }
    console.log("tempFields ==> ", tempFields)
    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })
  }

  function addConstantTextHandler(constantText) {
    // var para = document.createElement("p");
    // console.log(para)
    // var node = document.createTextNode(constantText)
    // console.log(node)
    // var htmlConstantText = para.appendChild(node);
    // var element = document.getElementById("paragraphTag");
    // element.appendChild(htmlConstantText);
    const tempConstantFields = [...constantTextFields]
    tempConstantFields.push({top : 200 , left : -500 , htmlStringCode :constantText , value : constantText , style : {} , bold : false , italic : false , underline: false , type : "ConstantField"})
    setConstantTextFields(tempConstantFields)
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
    setArrayFields(values);
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
      if (tempFields[i].value !== true) {
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40)
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
      else {
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 40)
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 115)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
    }
    console.log("tempFields => ", tempFields)
    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })



  }

  // function fontSizeChangeHandler(ev) {
  //   console.log(ev.target.value)
  //   setActiveFontSize(ev.target.value)
  // }
  // function fontDecorationChangeHandler(ev) {
  //   console.log(ev.target.value)
  //   setActiveFontDecoration(ev.target.value)
  // }
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
        setEditClassificationState(false)
      }
      else {
        console.log("IN Elsee")
        alert("errorrrrrr")
      }
    }
  }
  function generateField(selectedField) {
    console.log(inputState)
    console.log(selectedField)
    var element = document.getElementById("paragraphTag");
    element.appendChild(selectedField.htmlStringCode);
  }
  // function zoomPicIn(i) {
  //   setQrHeight(prev => prev + 20)
  //   const values = [...fields];
  //   let temp = values[i].height
  //   values[i].height = 20 + temp
  //   dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
  //   setFields(values);
  // }

  // function zoomPicOut(i) {
  //   setQrHeight(prev => prev - 20)
  //   const values = [...fields];
  //   let temp = values[i].height
  //   values[i].height = temp - 20
  //   dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
  //   dispatch({ type: 'CLASSIFICATION_FIELDS', payload: values })
  //   setFields(values);

  // }

  function categoryChangeHandler(ev) {

    console.log(ev.target.value)
    let temp = {}
    let found = fields.some(el => {
      // console.log(el)
      if (el.value == ev.target.value) {
        console.log(el)
        temp = { top: el.top, left: el.left, htmlStringCode: el.htmlStringCode, value: el.value, editorValue: el.editorValue }
      }
      // if(found)
    })
    setDemoDataDisabled(false)
    setSelectFields(temp)
    // console.log(found)
    // selectField.push({ top: top, left: -35, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue })

  }

  function onFieldSelect(id , field) {
    console.log(fields[id])
    setActiveStyle(id,field.type)

    // let value = [...fields]

    // values[id].style = {}

  }
  return (
    <Card >
      <div id="DnDContainer" ref={drop} style={styles}>
        {console.log("ConstantTextFields", constantTextFields)}
        {/* {console.log("activeFontSize", activeFontSize)} */}
        {/* {console.log("activeFoneDec", activeFontDecoration)} */}
        {console.log("selectField ==> ", selectField)}
        {console.log("classificationFields", classificationFields)}
        {console.log("fields", fields)}
        {/* {console.log("editorState", editorState)} */}
        {/* {console.log("image ==> ", image)} */}
      
        <Row>
          <Col md="9">
            <div style={{ width: "100%" }}>
              <img id="DnDImage" src={(editClassificationState) ? (image) : URL.createObjectURL(image)} style={{ maxWidth: "100%" }} />
            </div>
          </Col>
          <Col md="3">
            <div style={{ margin: "15px", padding: "10px" }}>
              <div style={{ textAlign: 'center' }}>

                <ReactFileReader
                  handleFiles={handleFiles} fileTypes={['.png', '.jpg', '.jpeg']}


                >

                  <button size="sm" style={{ width: "100%" }} className="mb-2 mr-1 worldcerts-button"

                  >Change Background Image</button>
                </ReactFileReader>
              </div>
            </div>
            <div style={{ margin: "15px", padding: "10px", border: "2px solid #0000002b" }}>
              {/* <div style={{ textAlign: 'center' }}>

                <ReactFileReader
                  handleFiles={handleFiles} fileTypes={['.png', '.jpg', '.jpeg']}


                >

                  <button size="sm" style={{ width: "100%" }} className="mb-2 mr-1 worldcerts-button"

                  >Change Background Image</button>
                </ReactFileReader>
              </div> */}
              <div style={{ textAlign: 'center', display: "inline-flex" }}>
                <Row>
                  <Col md="12">
                    <InputGroup className="mb-10">
                      <FormInput
                        placeholder="Add Text"
                        value={constantText}
                        onChange={ onConstantFieldChange}
                      />


                      <button type="append" className="worldcerts-button" onClick={() => addConstantTextHandler(constantText)} >Add Text</button>
                    </InputGroup>
                  </Col>
                </Row>

              </div>
              <div style={{ textAlign: 'center' }}>
                <button style={{ marginTop: "15px", width: "100%" }} className="worldcerts-button" >Add Image</button>
              </div>
            </div>
            {/*  <div style={{ margin: "15px", padding: "10px", border: "2px solid #0000002b" }}>
              <FormSelect
                onChange={categoryChangeHandler}
                // onKeyPress={this.clickEnter.bind(this)}
                placeholder="Category"
              // value={this.props.classificationCategory}
              >
                {
                  Object.keys(dropDownFields).map((field, idx) => {
                    return (
                      (fields[idx].value !== true) ? (
                        <option >{fields[idx].value}</option>)
                        : (null)

                    )
                  })
                }
              </FormSelect>

              <div style={{ marginTop: "15px" }}>

                <FormInput
                  placeholder="Demo Data"
                  disabled={demoDataDisabled}
                  onChange={(e) => handleChange(e)}
                  value={inputState}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                {console.log(selectField)}
                <button className="worldcerts-button" style={{ width: "100%" }} onClick = {() => generateField(selectField)} > Generate Field</button>
              </div>
            </div> */}
            {/* {(selectField)? (<div style={{ margin: "15px", padding: "10px", border: "2px solid #0000002b" }}>
              <div >
 <Box
                      key={0}
                      id={0}
                      left={selectField.left}
                      top={selectField.top}
                      value={fields}
                      hideSourceOnDrag={hideSourceOnDrag}
                      isImage={true}
                    >

                     
                          <div id="paragraphTag" style={{ textAlign: 'center' }}></div>
                       
                       
                    </Box>
              </div>
            </div>): (null)}  */}
            {/* <div style={{ margin: "15px", padding: "10px", border: "2px solid #0000002b" }}> */}
            {
          Object.keys(constantTextFields).map((field, idx) => {
            const { left, top, title } = constantTextFields[idx]
            return (

              <Box
                key={idx}
                id={idx}
                left={left}
                top={top}
                value={constantTextFields}
                hideSourceOnDrag={hideSourceOnDrag}
              >

                <div id="paragraphTag">
                  <label 
                   onClick={() => onFieldSelect(idx , constantTextFields[idx])}
                  style = {{...constantTextFields[idx].style ,width: "100%", height: "100%" }}>{constantTextFields[idx].value}</label>
                </div>
              </Box>

            )

          })
        }


            {
              Object.keys(fields).map((field, idx) => {
                const { left, top, title } = fields[idx]
                console.log(fields[idx].value)
                return (
                  (qrIndex == idx) ?
                    (


                      // <Box
                      //   key={idx}
                      //   id={idx}
                      //   left={left}
                      //   top={top}
                      //   value={fields}
                      //   hideSourceOnDrag={hideSourceOnDrag}
                      //   isImage={true}
                      // >

                      //   <Row>
                      //     <Col md="5">
                      //       <div style={{ textAlign: 'center' }}><img width="inherit" height={qrHeight} src={qrExample} /></div>
                      //     </Col>
                      //     <Col md="1" >
                      //       <span style={{ background: "grey", padding: "1px 3px", color: "white" }} onClick={() => handleRemove(idx)}>
                      //         x
                      //    </span>
                      //     </Col>
                      //   </Row>
                      // </Box>
                      null

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
                        {/* <Row> */}
                        {/* <Col md="10"> */}
                        {/* <Editor
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
                          /> */}
                        {/* <input
                              style={{ fontWeight : "bold" , fontDecoration: "underline" }}>
                               {/* onClick = {() => onFieldSelect(idx)}  
                               {/* placeholder = {fields[idx].value}  
                               {/* value = {"hasan"} 
                              {/* onChange={e => handleChange(idx, e)}  
                            </input> */}
                        {/* <p>{fields[idx].value}</p> */}
                        <input
                          onClick={() => onFieldSelect(idx , fields[idx])}
                          style={{ ...fields[idx].style, background: "transparent", width: "100%", height: "100%" }}
                          placeholder={fields[idx].value}
                          value={fields[idx].htmlStringCode}
                          onChange={e => handleChange(idx, e)}
                        />
                        {/* </Col> */}
                        {/* <Col md="1" style={{ alignSelf: 'flex-end' }}>
                          {/* <span onClick={() => handleRemove(idx)}>
                            X
</span> 
                        </Col> */}
                        {/* </Row> */}
                      </Box>

                    )
                );
              })
            }
            {/* </div> */}
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
