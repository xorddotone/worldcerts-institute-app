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
  const classificationTextFieldsPercentage = useSelector(state => state.dashboard_reducer.certificateTextFieldsPercentage)
  const classificationDynamicFieldsPercentage = useSelector(state => state.dashboard_reducer.classificationFields)
  const classificationTextFieldPx =  useSelector(state => state.dashboard_reducer.certificateTextFieldsPX)
  const classificationDynamicFieldsPx = useSelector(state => state.dashboard_reducer.classificationCombineFields)
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
  const qrVisibility = useSelector(state => state.dashboard_reducer.qrVisibility)
  const [editorState, setEditorState] = useState([])
  const [qrHeight, setQrHeight] = useState("inherit")
  const [qrIndex, setQrIndex] = useState()
  const [activeObject, setActiveObject] = useState()
  const [constantText, setConstantText] = useState()
  const [constantTextFields, setConstantTextFields] = useState([])
  const dispatch = useDispatch()

  const qrWidth = useSelector(state => state.dashboard_reducer.qrWidth)

  // const [dropDownFields , setDropDownFields] = useState([])

  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    hideSourceOnDrag,
  ])

  const setActiveStyle = (id, type) => {
    setActiveID(id)
    if (type === "ConstantField") {
      console.log("in constant")

      setActiveObject(constantTextFields[id])

    }
    else if (type === "Dynamic Fields") {
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

  function convertPxToPercentage(image, box) {
    console.log("In percentage")
    console.log("box => ", box)
    console.log("image => ", image)
    let percentage = (box / image) * 100
    console.log("percentage => ", percentage)
    return percentage
  }

  const applyStyles = (data) => {
    console.log("IN apply")
    console.log('style ==>', data)
    console.log(activeObject)
    console.log(activeObject)
    var temp = []
    if (activeObject.type == "ConstantField") {
      temp = [...constantTextFields]
      console.log("IN constant temp")
    }
    else if (activeObject.type == "Dynamic Fields") {
      console.log("fields  =>", fields)
      temp = [...fields]
      console.log("IN dynamic temp")

    }
    let keys = Object.keys(data)
    console.log('key ==>', keys)
    console.log("temp[activeID]", temp[activeID])

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
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(temp))
    if (activeObject.type == "ConstantField") {
      console.log(temp)
      console.log("afterrrrrrrrrr styling ==>", temp)
      dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PX', payload: temp })
      setConstantTextFields(temp)

      for (let i = 0; i < tempFields.length; i++) {

        let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
      console.log("tempFields ==> ", tempFields)

      // Here i will dispatch the temp Fields in percentage
      dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PERCENTAGE', payload: tempFields })
      // setConstantTextFields(tempConstantFields)

    }
    else if (activeObject.type == "Dynamic Fields") {
      console.log("afterrrrrrrrrr styling ==>", temp)
      dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: temp })
      setFields(temp)


      for (let i = 0; i < tempFields.length; i++) {

        if (tempFields[i].value !== true) {
          let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
          let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
          tempFields[i].left = lefts
          tempFields[i].top = tops
        }
        else {
          let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
          let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 115)
          tempFields[i].left = lefts
          tempFields[i].top = tops
        }
      }
      console.log("tempFields ==> ", tempFields)
      dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })
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
        fields.push({ top: top, left: 0, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue, style: { fontFamily: "Arial", fontSize: 14, color: "black" }, bold: false, italic: false, underline: false, type: "Dynamic Fields" })
        // dropDownFields.push({value : classificationFields[i].value , id : i })
        tempEditorState.push(EditorState.createEmpty())
        setEditorState(tempEditorState)
      }
      else if (classificationFields[i].value !== true) {
        console.log("IN elseeeee")
        fields.push({ top: classificationFields[i].top, left: classificationFields[i].left, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue, style: classificationFields[i].style, bold: classificationFields[i].bold, italic: classificationFields[i].italic, underline: classificationFields[i].underline, align: classificationFields[i].align, type: classificationFields[i].type })
        tempEditorState.push(EditorState.createEmpty())
        setEditorState(tempEditorState)
      }
    }
    console.log((classificationFields.length - 1).value == true)
    if (qrVisibility) {
        // console.log("classificationFields[classificationFields.length - 1].value ==> ", classificationFields[classificationFields.length - 1].value)
    if (classificationFields[classificationFields.length - 1]) {
      if (classificationFields[classificationFields.length - 1].value == true){
        console.log("top ============>", top)
        console.log(classificationFields[classificationFields.length-1])
        fields.push({ top: classificationFields[classificationFields.length - 1].top, left: classificationFields[classificationFields.length - 1].left, value: classificationFields[classificationFields.length - 1].value, type: classificationFields[classificationFields.length - 1].type , height: classificationFields[classificationFields.length - 1].height})
        console.log("fields ==> ", fields)
        console.log("fields length ==> ", fields.length)
        setQrIndex(fields.length - 1)
      }
      else {
        console.log("top uuuiuiui============>", top)
        fields.push({ top: top + 50, left: 0, value: qrVisibility, type: "Dynamic Fields" , height : 100 })
        console.log("fields ==> ", fields)
        console.log("fields length ==> ", fields.length)
        setQrIndex(fields.length - 1)
      }
    }
  
  

    }
    setFields(fields)
    for (let i = 0; i < classificationTextFieldPx.length; i++) {
      if (classificationTextFieldPx[i].htmlStringCode == "") {
    
        classificationTextFieldPx.push({ top: classificationTextFieldPx[i].top, left: classificationTextFieldPx[i].left, htmlStringCode: classificationTextFieldPx[i].htmlStringCode, value: classificationTextFieldPx[i].value, style: classificationTextFieldPx[i].style, bold: classificationTextFieldPx[i].bold, italic: classificationTextFieldPx[i].italic, underline: classificationTextFieldPx[i].underline, align: classificationTextFieldPx[i].align, type: classificationTextFieldPx[i].type })
      
      }
    }
    setConstantTextFields(classificationTextFieldPx)
  }, [])


  // useEffect(() => {

  //   console.log("in qr width use effect")
  //   console.log(qrWidth)
  //   let tempFields = JSON.parse(JSON.stringify(classificationDynamicFieldsPercentage))
  //   for (let i = 0; i < tempFields.length; i++) {

  //     if (tempFields[i].value == true) {


  //       tempFields[i].width = qrWidth.width
  //       tempFields[i].height = qrWidth.height
  //     }
  //   }
  //   dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })
  // }, [qrWidth])


  useEffect(() => {
    return () => {
      // console.log("fieldssss" , fields)
      // console.log("constatnnnt text" , constantTextFields)
      // console.log(classificationDynamicFieldsPercentage)
      // console.log(classificationTextFieldsPercentage)
      console.log("in qr width use effect", qrWidth)
      let combineFieldsPercentage = [...classificationDynamicFieldsPercentage, ...classificationTextFieldsPercentage]
      console.log(fields)
      console.log(constantTextFields)
      console.log(classificationDynamicFieldsPx)
      console.log(classificationTextFieldPx)
      let combineFieldsPx = [...classificationDynamicFieldsPx , ...classificationTextFieldPx]
      console.log(combineFieldsPercentage)
      console.log(combineFieldsPx)
      let b = combineFieldsPx.filter(item => item.left >=0 )
    let value = JSON.parse(JSON.stringify(combineFieldsPercentage))
      // let value = [...combineFieldsPercentage]
      console.log(b)
      for(let i = 0 ;i<combineFieldsPercentage.length;i++){
        console.log("in forrrrr")
        console.log(combineFieldsPercentage[i].value)
        console.log(b)
        let exist =  b.some(el => el.value === combineFieldsPercentage[i].value);
        
        console.log(exist)
        if(exist){
          combineFieldsPercentage.splice(i,1)
        // value.pop(combineFieldsPercentage[i])
          
        }
        console.log("values after splice ==> ", value)
      }
      console.log(value)
      console.log(combineFieldsPercentage)
      dispatch({ type: 'CLASSIFICATION_FIELDS_PREVIEW', payload: combineFieldsPercentage })
      // dispatch({ type: 'CLASSIFICATION_QR', payload: false })

    }
  })
  return (
    <div style={{ width: "100%" }}>
      {console.log("activeObject", activeObject)}
      {console.log("fields ==> ", fields)}
      <Toolbar
        activeID={activeID}
        activeObject={activeObject}
        applyStyles={applyStyles}
      />
      <Container
        hideSourceOnDrag={true}
        setArrayFields={setFields}
        setActiveStyle={setActiveStyle}
        setEditorState={setEditorStates}
        qrHeight={qrHeight}
        qrIndex={qrIndex}
        setQrIndex={setQrIndexes}
        fields={fields}
        // classificationFields = {classificationFields}
        editorState={editorState}
        setConstantText={setConstantFieldText}
        constantText={constantText}
        setConstantTextFields={setConstantFields}
        constantTextFields={constantTextFields}
        convertPxToPercentage={convertPxToPercentage}
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
