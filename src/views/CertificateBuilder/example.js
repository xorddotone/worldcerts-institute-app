import React, { useState, useCallback ,useEffect} from 'react'
import Container from './Container'
import Toolbar from "./Toolbar"
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw } from 'draft-js';

export default function DragAroundNaive() {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const [activeID , setActiveID] = useState({})
  const [fields,setFields] = useState([])
  const classificationFields = useSelector(state => state.dashboard_reducer.classificationCombineFields)
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
  const qrVisibility = useSelector(state => state.dashboard_reducer.qrVisibility)
  const [editorState, setEditorState] = useState([])
  const [qrHeight, setQrHeight] = useState(80)
  const [qrIndex, setQrIndex] = useState()
  const [activeObject , setActiveObject] = useState()

  // const [dropDownFields , setDropDownFields] = useState([])

  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    hideSourceOnDrag,
  ])

  const setActiveStyle = (id) => {
    setActiveID(id)
    setActiveObject(fields[id])
  }

  const setEditorStates = (data) => {
      setEditorState(data)
  }
  const setQrIndexes = (data) => {
    setQrIndex(data)
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
        fields.push({ top: top, left: 0, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue ,style : {} })
        // dropDownFields.push({value : classificationFields[i].value , id : i })
        tempEditorState.push(EditorState.createEmpty())
        setEditorState(tempEditorState)
      }
      else if (classificationFields[i].value !== true) {
        console.log("IN elseeeee")
        fields.push({ top: classificationFields[i].top, left: classificationFields[i].left, htmlStringCode: classificationFields[i].htmlStringCode, value: classificationFields[i].value, editorValue: classificationFields[i].editorValue , style : classificationFields[i].style })
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
      <Toolbar 
      activeID={activeID}
      activeObject = {activeObject}

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
