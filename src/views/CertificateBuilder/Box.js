import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { Resizable } from "re-resizable";
import {Resizable as QRResizeable}  from 'react-resizable';

import {
  FormSelect,
} from "shards-react";
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
  position : 'absolute',
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "transparent"
};
const Box = ({ id, left, top, value, hideSourceOnDrag, children, isImage }) => {
  // console.log({ id, left, top,value, hideSourceOnDrag, children })
  console.log(value[id].value)
  let val = value[id].value;
  let fieldType = value[id].type
  const [boxResizeWidth, setboxResizeWidth] = useState(100)
  const [boxResizeHeight, setboxResizeHeight] = useState(25)
  const [width , setQrWidth] = useState(100)
  const [height , setQrHeight] = useState(100)
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.BOX, val , fieldType },
    
    collect: monitor => ({
      
      isDragging: monitor.isDragging(),
    }),
  })
  function onResize(event, {element, size, handle}){
    // this.setState({width: size.width, height: size.height});
    console.log(size.width)
    console.log(size.height)
    let obj = {
      width : size.width,
      height : size.height

    }
    dispatch({ type: 'QR_WIDTH', payload: obj  })
    setQrWidth(size.width)
    setQrHeight(size.height)
  };
  if (isDragging && hideSourceOnDrag) {
    let style = {...style}
    style.position = "absolute"
    return <div ref={drag} style = {{style}}/>
  }
  if(isImage) {
    return (

  <div className="layoutRoot"style= {{qrStyle}} >
  <QRResizeable   
    lockAspectRatio={true} 
    className="box" 
    height={height} 
    width={width} 
    onResize={onResize} 
    resizeHandles={['sw', 'se', 'nw', 'ne']}>
                <div  style={{ ...style , width: width + 'px', height: height + 'px' ,  left,top}} >
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
           style={{...boxResizeStyle , left,top}}
              size={{ width: boxResizeWidth, height: boxResizeHeight }}
              onResizeStop={(e, direction, ref, d) => {
                if((boxResizeWidth + d.width) < 100){
                  setboxResizeWidth(100)
                }
                else{
                  setboxResizeWidth(boxResizeWidth + d.width)
                  }
                  console.log(boxResizeWidth + d.width)
                  console.log("boxResizeWidth", boxResizeWidth)
                  console.log("d.width", d.width)
                  console.log("boxResizeHeight" , boxResizeHeight)
                  console.log("d.height",d.height)
                  // console.log("height",document.getElementById("text").clientHeight)

                  // setboxResizeHeight(boxResizeHeight + d.height)
              
              }}
            >  
    <div id = "text" ref={drag} style={style}>
    {console.log(isDragging)}

      {children}
    </div>
   </Resizable>
  )
}
export default Box
