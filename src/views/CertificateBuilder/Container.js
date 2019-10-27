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

import {

  FormSelect,
  FormCheckbox,
  Row,
  Col,
} from "shards-react";

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
  console.log("Checkbox: ", name, checked);

  return (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );
};

const styles = {
  width: "100%",
  height: "100%",
  border: '1px solid black',
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
  const [fontSizes, setFontSize] = useState([]);
  const [activeFontSize, setActiveFontSize] = useState(6)
  const [activeFontDecoration, setActiveFontDecoration] = useState(6)
  const [editorState,setEditorState] = useState([])
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
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
      let lefts = convertPxToPercentage(imageWidth, tempField[i].left)
      tempField[i].left = lefts
      tempField[i].top = tops
    }

    let tops = convertPxToPercentage(imageHeight, top +60)
    let lefts = convertPxToPercentage(imageWidth, left)
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
    values[i].value = editorStateValue.getCurrentContent().getPlainText()
    values[i].htmlStringCode = draftToHtml(convertToRaw(editorStateValue.getCurrentContent()));
    setFields(values);
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    for (let i = 0; i < tempFields.length; i++) {
      let tops = convertPxToPercentage(imageHeight, tempFields[i].top + 60)
      let lefts = convertPxToPercentage(imageWidth, tempFields[i].left)
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
    console.log("fields before ==> ", fields)
    console.log("values before ==> ", values)
    values.splice(i, 1);
    console.log("values after splice ==> ", values)
    setFields(values);
    console.log("values after set ==> ", values)
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    console.log("tempFields after parse==> ", tempFields)
    console.log("values after parse ==> ", values)

    for (let i = 0; i < tempFields.length; i++) {
      let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
      let lefts = convertPxToPercentage(imageWidth, tempFields[i].left)
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
    <div id="DnDContainer" ref={drop} style={styles}>
      {console.log(fontSizes)}
      {console.log(activeFontSize)}
      {console.log(activeFontDecoration)}
      {Object.keys(fields).map((field, idx) => {
        const { left, top, title } = fields[idx]
        console.log(fields[idx].value)
        return (
          <div key={`${field}-${idx}`}>
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
  // toolbarOnFocus
  toolbar={{
    options: ['inline','fontSize', 'fontFamily',],
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
    // textAlign: {
    //   inDropdown: true,
    //   className: undefined,
    //   component: undefined,
    //   dropdownClassName: undefined,
    //   options: ['left', 'center', 'right', 'justify'],
    // },
  }}
  editorState={editorState[idx]}
  onEditorStateChange={e => handleChange( idx,e)}

/> 
</Col>
  <Col md = "2">
<button   onClick={() => handleRemove(idx)}>
    X
</button>
</Col>

</Row>
            </Box>
          </div>
        );
      })}
      <img id="DnDImage" src={URL.createObjectURL(image)} width="75%" />
      <button type="button" onClick={() => handleAdd()}>
        Add fields
      </button>
     
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
  )
}
export default Container
