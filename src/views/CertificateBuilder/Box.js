import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { Resizable } from "re-resizable";
import { Resizable as QRResizeable } from 'react-resizable';

import {
  FormSelect,
} from "shards-react";
import { sizeHeight } from '@material-ui/system';
const style = {
  position: 'absolute',
  backgroundColor: 'transparent',
  width: "inherit",
  cursor: 'move',
}
const qrStyle = {
  position: 'absolute',
  backgroundColor: 'transparent',
  cursor: 'move',
}
const boxResizeStyle = {
  display: "flex",
  position: 'absolute',
  alignItems: "center",
  justifyContent: "center",
  // border: "solid 1px #ddd",
  background: "transparent"
};
const Box = ({ id, left, top, value, hideSourceOnDrag, children, isImage }) => {
  // console.log({ id, left, top,value, hideSourceOnDrag, children })
  console.log(value[id].value)
  let val = value[id].value;
  let fieldType = value[id].type
  const [boxResizeWidth, setboxResizeWidth] = useState(225)
  const [boxResizeHeight, setboxResizeHeight] = useState(25)
  const [width, setQrWidth] = useState(100)
  const [height, setQrHeight] = useState(100)
  const classificationDynamicFieldsPx = useSelector(state => state.dashboard_reducer.classificationCombineFields)
  const classificationDynamicFieldsPercentage = useSelector(state => state.dashboard_reducer.classificationFields)
  // const classificationTextFieldPx =  useSelector(state => state.dashboard_reducer.certificateTextFieldsPX)
  const constantImages = useSelector(state => state.dashboard_reducer.imagesOnCertificate)
  const constantImagesPercentage = useSelector(state => state.dashboard_reducer.imagesOnCertificateInPercentage)
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX, val, fieldType },

    collect: monitor => ({

      isDragging: monitor.isDragging(),
    }),
  })
  function onResize(event, { element, size, handle }) {
    // this.setState({width: size.width, height: size.height});
    console.log(size.width)
    console.log(size.height)
    let obj = {}
    console.log("fieldType ===>", fieldType)
    if (fieldType == "Dynamic Fields") {
      let tempFields = JSON.parse(JSON.stringify(classificationDynamicFieldsPx))
      for (let i = 0; i < tempFields.length; i++) {

        if (tempFields[i].value == true) {

          if(size.height >= 100 ){
            console.log("Innnnnnnnnnnnnnnn")

          tempFields[i].height = size.height
          tempFields[i].width = size.width
          obj.width = size.width
          obj.height =  size.height
    
          }
          else{
            console.log("outttttttttttt")
            obj.width = 100
            obj.height =  100
            tempFields[i].height = 100
            tempFields[i].width = 100
          }
        }
      }
      console.log(tempFields)
      dispatch({ type: 'CLASSIFICATION_COMBINE_FIELDS', payload: tempFields })

      let tempFieldsPercentage = JSON.parse(JSON.stringify(classificationDynamicFieldsPercentage))
      for (let i = 0; i < tempFields.length; i++) {

        if (tempFieldsPercentage[i].value == true) {


          if(size.height >= 100 ){
            console.log("Innnnnnnnnnnnnnnn")
            tempFieldsPercentage[i].height = size.height
            tempFieldsPercentage[i].width = size.width
            }
            else{
            console.log("outttttttttttt")

          tempFieldsPercentage[i].height = 100
          tempFieldsPercentage[i].width = 100
        }
      }
      }
      dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFieldsPercentage })

      console.log(val)
      dispatch({ type: 'QR_WIDTH', payload: obj })
      setQrWidth(obj.width)
      setQrHeight(obj.height)
    }
    else if (fieldType == "IMAGE") {
      console.log(constantImages)
      // let tempFields = JSON.parse(JSON.stringify(constantImages))
      let tempFields = [...constantImages]
      console.log(tempFields)
      for (let i = 0; i < tempFields.length; i++) {

      

          tempFields[i].height = size.height
          tempFields[i].width = size.width
        
      }
      console.log(tempFields)
      dispatch({ type: 'IMAGE_ON_CERTIFICATE', payload: tempFields })

      let tempFieldsPercentage = JSON.parse(JSON.stringify(constantImagesPercentage))
      // let tempFieldsPercentage = [...constantImagesPercentage]
     console.log("tempFieldsPercentage[id]" , tempFieldsPercentage[id])
      
        tempFieldsPercentage[id].height = size.height
        tempFieldsPercentage[id].width = size.width
      dispatch({ type: 'IMAGES_ON_CERTIFICATE_IN_PERCENTAGE', payload: tempFieldsPercentage })

      console.log(val)
      dispatch({ type: 'QR_WIDTH', payload: obj })
      setQrWidth(size.width)
      setQrHeight(size.height)
      console.log(value)
      // let tempFields = JSON.parse(JSON.stringify(value))
      // console.log(tempFields[id])
      // tempFields[id].height = size.height
      // tempFields[id].width = size.width

      // console.log(tempFields)

      // dispatch({ type: 'IMAGES_ON_CERTIFICATE_IN_PERCENTAGE', payload: tempFields })
    }

  };
  useEffect(() => {
    if (classificationDynamicFieldsPx.length !== 0) {
      for (let i = 0; i < classificationDynamicFieldsPx.length; i++) {
        if (classificationDynamicFieldsPx[i].value == true) {
          setQrWidth(classificationDynamicFieldsPx[i].height)
          setQrHeight(classificationDynamicFieldsPx[i].height)

        }
      }
    }
  }, [])
  if (isDragging && hideSourceOnDrag) {
    let style = { ...style }
    style.position = "absolute"
    return <div ref={drag} style={{ style }} />
  }
  if (isImage) {
    return (

      <div className="layoutRoot" style={{ qrStyle }} >
        <QRResizeable
          lockAspectRatio={(value[id].type == "IMAGE") ? (false) : (true)}
          className="box"
          height={height}
          width={width}
          onResize={onResize}
          resizeHandles={(value[id].type == "IMAGE") ? (['sw', 'se', 'nw', 'ne', 'n', 's', 'e', 'w']) : (['sw', 'se', 'nw', 'ne'])}>
          <div style={{ ...style, width: width + 'px', height: height + 'px', left, top }} >
            <div ref={drag}>
              {children}
            </div>
          </div>
        </QRResizeable>
      </div>
    )
  }
  return (
    <Resizable
      style={{ ...boxResizeStyle, left, top }}
      size={{ width: boxResizeWidth, height: boxResizeHeight }}
      onResizeStop={(e, direction, ref, d) => {
        if ((boxResizeWidth + d.width) < 100) {
          setboxResizeWidth(100)
        }
        else {
          setboxResizeWidth(boxResizeWidth + d.width)
        }
        console.log(boxResizeWidth + d.width)
        console.log("boxResizeWidth", boxResizeWidth)
        console.log("d.width", d.width)
        console.log("boxResizeHeight", boxResizeHeight)
        console.log("d.height", d.height)
        // console.log("height",document.getElementById("text").clientHeight)

        // setboxResizeHeight(boxResizeHeight + d.height)

      }}
    >
      <div id="text" ref={drag} style={style}>
        {console.log(isDragging)}

        {children}
      </div>
    </Resizable>
  )
}
export default Box
