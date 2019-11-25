import React, { useState, useCallback, useEffect } from 'react'
import Container from './Container'
import Toolbar from "./Toolbar"
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw } from 'draft-js';

export default function DragAroundNaive() {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const [activeID, setActiveID] = useState({})
  const [fields, setFields] = useState([])
  const classificationFields = useSelector(state => state.dashboard_reducer.classificationCombineFields)
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
  const qrVisibility = useSelector(state => state.dashboard_reducer.qrVisibility)
  const [editorState, setEditorState] = useState([])
  const [qrHeight, setQrHeight] = useState(80)
  const [qrIndex, setQrIndex] = useState()
  const [activeObject, setActiveObject] = useState()
  const [constantText , setConstantText] = useState()
  const [constantTextFields , setConstantTextFields] = useState([])
  
  // const [dropDownFields , setDropDownFields] = useState([])

  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    hideSourceOnDrag,
  ])

  const setActiveStyle = (id,type) => {
    setActiveID(id)
    if(type == "ConstantField"){
      console.log("in constant")

      setActiveObject(constantTextFields[id])

    }
    else if(type == "Dynamic Fields"){
      console.log("in dynamic")
      setActiveObject(fields[id])
    }
  }

  const setConstantFields = (fields) => {
    setConstantTextFields(fields)
  }

  const setEditorStates = (data) => {
    setEditorState(data)
  }
  const setQrIndexes = (data) => {
    setQrIndex(data)
  }
  const setConstantFieldText = (data) => {
    setConstantText(data)
  }

  const applyStyles = (data) => {
    console.log("IN apply")
    console.log('style ==>', data)
    console.log(activeObject)
    console.log(activeObject)
    var temp =[]
    if(activeObject.type === "ConstantField"){
      temp =  [...constantTextFields]
      console.log("IN constant temp")
    }
    else if(activeObject.type === "Dynamic Fields"){
      console.log("fields  =>" , fields)
      temp =  [...fields]
      console.log("IN dynamic temp")

    }
    let keys = Object.keys(data)
    console.log('key ==>', keys)
    console.log("temp[activeID]" , temp[activeID])

    if (keys[0] === "fontWeight" && !temp[activeID].bold) {
      temp[activeID].style = { ...temp[activeID].style, ...data }
      temp[activeID].bold = true;
    }
    else if (keys[0] === "fontWeight" && temp[activeID].bold) {
      delete temp[activeID].style[keys[0]];
      temp[activeID].bold = false;
    }
    else if (keys[0] === "fontStyle" && !temp[activeID].italic) {
      temp[activeID].style = { ...temp[activeID].style, ...data }
      temp[activeID].italic = true;
    }
    else if (keys[0] === "fontStyle" && temp[activeID].italic) {
      delete temp[activeID].style[keys[0]];
      temp[activeID].italic = false;
    }
    else if (keys[0] === "textDecoration" && !temp[activeID].underline) {
      temp[activeID].style = { ...temp[activeID].style, ...data }
      temp[activeID].underline = true;
    }
    else if (keys[0] === "textDecoration" && temp[activeID].underline) {
      delete temp[activeID].style[keys[0]];
      temp[activeID].underline = false;
    }
    else if (keys[0] === "textAlign") {
      const value = Object.values(data)
      console.log(temp[activeID])
      temp[activeID].style = { ...temp[activeID].style, ...data }
      temp[activeID].align = value[0];
    }
    else {
      temp[activeID].style = { ...temp[activeID].style, ...data }
    }
    console.log('active ==>', temp[activeID])
    if(activeObject.type = "ConstantField"){
      setConstantTextFields(temp)

    }
    else if(activeObject.type = "Dynamic Fields"){

      setFields(temp)
    }
  }

  useEffect(() => {
    let left = document.getElementById("DnDImage").clientWidth;
    setTop(4)
    setLeft(left - 20)   
    let top = 210
    console.log(classificationFields)
    console.log(classificationFields.length)
    const tempEditorState = [...editorState]
    for (let i = 0; i < classificationFields.length; i++) {
      if (classificationFields[i].htmlStringCode == "") {
        top = top + 50
        console.log("top ==> ", top)
        fields.push({ top: top, left: 0, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue ,style : {} ,bold : false , italic : false , underline : false , type : "Dynamic Fields" })
        // dropDownFields.push({value : classificationFields[i].value , id : i })
        tempEditorState.push(EditorState.createEmpty())
        setEditorState(tempEditorState)
      }
      else if (classificationFields[i].value !== true) {
        console.log("IN elseeeee")
        fields.push({ top: classificationFields[i].top, left: classificationFields[i].left, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue, style: classificationFields[i].style, bold: classificationFields[i].bold, italic: classificationFields[i].italic, underline: classificationFields[i].underline, align: classificationFields[i].align , type : classificationFields[i].type })
        tempEditorState.push(EditorState.createEmpty())
        setEditorState(tempEditorState)
      }
    }
    console.log((classificationFields.length - 1).value == true)
    if (qrVisibility) {

      if ((classificationFields.length - 1).value == true) {
        console.log("top ============>", top)
        fields.push({ top: (classificationFields.length - 1).top, left: (classificationFields.length - 1).left, value: qrVisibility, height: (classificationFields.length - 1).height })
        console.log("fields ==> ", fields)
        console.log("fields length ==> ", fields.length)
        setQrIndex(fields.length - 1)
      }
      else {
        console.log("top uuuiuiui============>", top)
        fields.push({ top: top + 70, left: -70, value: qrVisibility, height: qrHeight })
        console.log("fields ==> ", fields)
        console.log("fields length ==> ", fields.length)
        setQrIndex(fields.length - 1)
      }

    }
    setFields(fields)
    return () => {
      console.log(fields)
      // dispatch({ type: 'CLASSIFICATION_QR', payload: false })

    }
  }, [])

  return (
    <div style={{ width: "100%" }}>
      {console.log("activeObject" , activeObject)}
      <Toolbar
        activeID={activeID}
        activeObject={activeObject}
        applyStyles={applyStyles}
      />
      <Container  
      hideSourceOnDrag={true} 
      setArrayFields={setFields} 
      setActiveStyle={setActiveStyle}
      setEditorState = {setEditorStates}
      qrHeight = {qrHeight}
      qrIndex = {qrIndex}
      setQrIndex = {setQrIndexes}
      fields = {fields}
      classificationFields = {classificationFields}
      editorState = {editorState}
      setConstantText = {setConstantFieldText}
      constantText  = {constantText}
      setConstantTextFields = {setConstantFields}
      constantTextFields = {constantTextFields}
       />
      {console.log("In the example")}
      {/* <p>
        <label htmlFor="hideSourceOnDrag">
          <input
            id="hideSourceOnDrag"
            type="checkbox"
            checked={hideSourceOnDrag}
            onChange={toggle}
          />
          <small>Hide the source item while dragging</small>
        </label>
      </p> */}
    </div>
  )
}
