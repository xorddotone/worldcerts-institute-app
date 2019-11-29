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
const Container = ({ hideSourceOnDrag, setArrayFields, setActiveStyle, qrHeight, qrIndex, fields, editorState, setEditorState,selectedImages,setSelectedImages, setQrIndex, setConstantText, constantText, constantTextFields, setConstantTextFields, convertPxToPercentage }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 920, title: 'Drag me around' },
    b: { top: 60, left: 920, title: 'Drag me too' },
  })
  const dispatch = useDispatch()
  const image = useSelector(state => state.dashboard_reducer.image)
  const [selectField, setSelectFields] = useState();
  const [inputState, setInputState] = useState()
  const [editClassificationState, setEditClassificationState] = useState(useSelector(state => state.dashboard_reducer.editClassificationState))
  const imageRef = React.useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      console.log(item)
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      console.log(item)
      moveBox(item.id, left, top, item.fieldType)
      return undefined
    },
  })
  const moveBox = (id, left, top, fieldType) => {
    console.log(id, left, top)
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth

    console.log("imageHeight ==>", imageHeight)
    console.log("imageWidth ==>", imageWidth)
    // console.log("fieldTYpe ", fieldType)
    if (fieldType == "Dynamic Fields") {
      setArrayFields(
        update(fields, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
      console.log("Move fields in px =====>", fields)
      let tempFields = JSON.parse(JSON.stringify(fields))
      tempFields[id].left = left
      tempFields[id].top = top
      dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: tempFields })
      let tempField = JSON.parse(JSON.stringify(tempFields))
      //  let tempField = tempFields
      console.log(tempField)
      console.log("tempField.value ********>>", tempField[id].value)
      for (let i = 0; i < tempField.length; i++) {
        if (tempField[i].value !== true) {
          let tops = convertPxToPercentage(imageHeight, tempField[i].top)
          let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 250)
          tempField[i].left = lefts
          tempField[i].top = tops
        }
        else {
          let tops = convertPxToPercentage(imageHeight, tempField[i].top)
          let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 115)
          tempField[i].left = lefts
          tempField[i].top = tops
        }
      }
      dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempField })
    }
    else if (fieldType == "ConstantField") {
      setConstantTextFields(
        update(constantTextFields, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
      console.log("Move constantTextFields in px =====>", constantTextFields)
      let tempFields = JSON.parse(JSON.stringify(constantTextFields))
      tempFields[id].left = left
      tempFields[id].top = top
      dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PX', payload: tempFields })
      let tempField = JSON.parse(JSON.stringify(tempFields))
      console.log(tempField)
      console.log("tempField.value ********>>", tempField[id].value)
      for (let i = 0; i < tempField.length - 1; i++) {
        if (tempField[i].value !== true) {
          let tops = convertPxToPercentage(imageHeight, tempField[i].top)
          let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 250)
          tempField[i].left = lefts
          tempField[i].top = tops
        }
        else {
          let tops = convertPxToPercentage(imageHeight, tempField[i].top)
          let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 100)
          tempField[i].left = lefts
          tempField[i].top = tops
        }
        console.log("tempField.value ********>>", tempField[id].value)

      }
      if (tempField[id].value == true) {
        let tops = convertPxToPercentage(imageHeight, top)
        let lefts = convertPxToPercentage(imageWidth, left + 115)
        console.log("tops", tops)
        console.log("lefts", lefts)
        tempField[id].left = lefts
        tempField[id].top = tops
        console.log("tops", tops)
        console.log("lefts", lefts)
        console.log("tempFields ==> ", tempField)
      }
      else {
        let tops = convertPxToPercentage(imageHeight, top)
        let lefts = convertPxToPercentage(imageWidth, left + 250)


        tempField[id].left = lefts
        tempField[id].top = tops
        console.log("tempFields ==> ", tempField)
      }


      dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PERCENTAGE', payload: tempField })

    }
    else if (fieldType == "IMAGE") {
      setSelectedImages(
        update(selectedImages, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
      console.log("Move selectedImage in px =====>", selectedImages)
      let tempFields = JSON.parse(JSON.stringify(selectedImages))
      tempFields[id].left = left
      tempFields[id].top = top
      dispatch({ type: 'IMAGE_ON_CERTIFICATE', payload: tempFields })
      let tempField = JSON.parse(JSON.stringify(tempFields))
      console.log(tempField)
      console.log("tempField.value ********>>", tempField[id].value)
      for (let i = 0; i < tempField.length - 1; i++) {

        let tops = convertPxToPercentage(imageHeight, tempField[i].top)
        let lefts = convertPxToPercentage(imageWidth, tempField[i].left + 100)
        tempField[i].left = lefts
        tempField[i].top = tops

      }
    dispatch({ type: "IMAGES_ON_CERTIFICATE_IN_PERCENTAGE", payload: tempField })


      let tops = convertPxToPercentage(imageHeight, top)
      let lefts = convertPxToPercentage(imageWidth, left + 115)
      console.log("tops", tops)
      console.log("lefts", lefts)
      tempField[id].left = lefts
      tempField[id].top = tops
      console.log("tops", tops)
      console.log("lefts", lefts)
      console.log("tempFields ==> ", tempField)
      dispatch({ type: 'IMAGES_ON_CERTIFICATE_IN_PERCENTAGE', payload: tempField })

    }

  }

  function onConstantFieldChange(ev) {
    console.log(ev.target.value)
    setConstantText(ev.target.value)
  }

  function handleChange(i, editorStateValue) {

    const values = [...fields];
    values[i].editorValue = editorStateValue.target.value
    dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: values })
    values[i].editorValue = editorStateValue.target.value
    values[i].htmlStringCode = editorStateValue.target.value
    console.log(editorState)
    const tempEditorState = [...editorState]
    tempEditorState[i] = editorStateValue.target.value
    setEditorState(tempEditorState)
    setArrayFields(values);
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
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

  function addConstantTextHandler(constantText) {
    const tempConstantFields = [...constantTextFields]
    tempConstantFields.push({ top: 200, left: -500, htmlStringCode: constantText, value: constantText, style: { fontFamily: "Arial", fontSize: 14, color: "black" }, bold: false, italic: false, underline: false, type: "ConstantField" })
    console.log(tempConstantFields)
    dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PX', payload: tempConstantFields })
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(tempConstantFields))
    for (let i = 0; i < tempFields.length; i++) {

      let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
      let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
      tempFields[i].left = lefts
      tempFields[i].top = tops
    }
    console.log("tempFields ==> ", tempFields)

    dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PERCENTAGE', payload: tempFields })
    setConstantTextFields(tempConstantFields)
    setConstantText("")

  }

  function handleRemove(i) {
    console.log("fields before ==> ", constantTextFields)
    console.log("IDDDD", i)
    const values = [...constantTextFields];
    const tempEditorstate = [...editorState]
    console.log("fields before ==> ", constantTextFields)
    console.log("values before ==> ", values)
    tempEditorstate.splice(i, 1)
    values.splice(i, 1);
    console.log("values after splice ==> ", values)
    setEditorState(tempEditorstate)
    setConstantTextFields(values);
    console.log(values)
    console.log("values after set ==> ", values)
    dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PX', payload: values })

    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(values))
    for (let i = 0; i < tempFields.length; i++) {

      let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
      let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 250)
      tempFields[i].left = lefts
      tempFields[i].top = tops
    }
    console.log("tempFields =====================================================> ", tempFields)

    dispatch({ type: 'CERTIFICATE_TEXT_FIELDS_PERCENTAGE', payload: tempFields })
    // setConstantTextFields(value)



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
      if (width > 500 & height > 500) {
        console.log("IN IFFFF")
        dispatch({ type: 'UPLOADED_IMAGE', payload: file[0] })
        setEditClassificationState(false)
      }
      else {
        console.log("IN Elsee")
        alert("Certificate width and height must be greater than 500px")
        // that.setState({
        //   alertShow: true,
        //   theme: "danger",
        //   alertMessage: "Certificate width and height must be greater than 1000px"
        // })    
        }
    }
  }

  const onAddImageClick = () => {
    console.log('ref ==>', imageRef)
    imageRef.current.click()
  }

  const onImageChange = () => {
    console.log("selectedImages",selectedImages)
    const localImages = [...selectedImages]
    console.log("localImage" , localImages)
    const obj = {
      file: imageRef.current.files[0],
      url: URL.createObjectURL(imageRef.current.files[0]),
      top: 100,
      left: -500,
      type: "IMAGE"
    }
    localImages.push(obj)
    console.log('images ==>', localImages)
    imageRef.current.value = ""
    setSelectedImages(localImages)
    console.log(localImages)
    dispatch({ type: "IMAGE_ON_CERTIFICATE", payload: localImages })

    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(localImages))
    for(let i = 0; i < tempFields.length; i++) {

      let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
      let lefts = convertPxToPercentage(imageWidth, tempFields[i].left + 100)
      tempFields[i].left = lefts
      tempFields[i].top = tops
    }
    console.log("tempFields ==> ", tempFields)
    dispatch({ type: "IMAGES_ON_CERTIFICATE_IN_PERCENTAGE", payload: tempFields })

  }


  function onFieldSelect(id, field) {
    console.log(fields[id])
    setActiveStyle(id, field.type)


  }
  return (
    <Card >
      <div id="DnDContainer" ref={drop} style={styles}>
        {console.log(image)}
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
              <div style={{ textAlign: 'center', display: "inline-flex" }}>
                <Row>
                  <Col md="12">
                    <InputGroup className="mb-10">
                      <FormInput
                        placeholder="Add Text"
                        value={constantText}
                        onChange={onConstantFieldChange}
                      />
                      <button type="append" className="worldcerts-button" onClick={() => addConstantTextHandler(constantText)} >Add Text</button>
                    </InputGroup>
                  </Col>
                </Row>

              </div>
              <div style={{ textAlign: 'center' }}>
                <input type="file" ref={imageRef} accept={['.png', '.jpg', '.jpeg']} onChange={() => onImageChange()} style={{ visibility: "hidden", height: 0, width: 0 }} />
                <button style={{ marginTop: "15px", width: "100%" }} onClick={() => onAddImageClick()} className="worldcerts-button" >Add Image</button>
              </div>
            </div>
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
                      <Row>
                        <Col md="9">
                          <label
                            onClick={() => onFieldSelect(idx, constantTextFields[idx])}
                            style={{ ...constantTextFields[idx].style, width: "100%", height: "100%" }}>{constantTextFields[idx].value}
                          </label>
                        </Col>
                        <Col md="3" style={{ alignSelf: "center" }} >
                          <span style={{ background: "grey", padding: "1px 3px", color: "white" }} onClick={() => handleRemove(idx)}>
                            x
                         </span>
                        </Col>
                      </Row>
                    </div>
                  </Box>

                )

              })
            }
            {console.log(selectedImages)}
            {
              Object.keys(selectedImages).map((fields, idx) => {
                const { left, top, title } = selectedImages[idx]
                return (

                  <Box
                    key={idx}
                    id={idx}
                    left={left}
                    top={top}
                    value={selectedImages}
                    hideSourceOnDrag={hideSourceOnDrag}
                    isImage={true}
                  >
                    <div style={{ top: selectedImages[idx].top, left: selectedImages[idx].left, textAlign: 'center', }}>
                      <img src={selectedImages[idx].url} height="100%" width="100%" />
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


                      <Box
                        key={idx}
                        id={idx}
                        left={left}
                        top={top}
                        value={fields}
                        hideSourceOnDrag={hideSourceOnDrag}
                        isImage={true}
                      >


                        <div style={{ top: fields[idx].top, left: fields[idx].left, textAlign: 'center', }}><img style={{ width: "100%", height: "100%" }} src={qrExample} /></div>
                        {/* <Col md="1" >
                            <span style={{ background: "grey", padding: "1px 3px", color: "white" }} onClick={() => handleRemove(idx)}>
                              x
                         </span>
                          </Col> */}
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
                        <input
                          onClick={() => onFieldSelect(idx, fields[idx])}
                          style={{ ...fields[idx].style, background: "transparent", width: "100%", height: "100%" }}
                          placeholder={fields[idx].value}
                          value={fields[idx].htmlStringCode}
                          onChange={e => handleChange(idx, e)}
                        />

                      </Box>

                    )
                );
              })
            }
          </Col>
        </Row>
      </div>
    </Card>
  )
}
export default Container
