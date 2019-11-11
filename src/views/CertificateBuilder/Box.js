import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { Resizable } from "re-resizable";
import {
  FormSelect,
} from "shards-react";
const style = {
  position: 'absolute',
  // border: '1px dashed gray',
  backgroundColor: 'transparent',
  width: "100%",
  padding: '',
  cursor: 'move',
}
const Qrstyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "transparent"
};
const Box = ({ id, left, top, value, hideSourceOnDrag, children }) => {
  // console.log({ id, left, top,value, hideSourceOnDrag, children })
  console.log(value[id].value)
  let val = value[id].value;
  const [qrWidth, setqrWidth] = useState(400)
  const [qrHeight, setqrHeight] = useState(100)
  const [{ isDragging }, drag] = useDrag({

    item: { id, left, top, type: ItemTypes.BOX, val },

    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }
  return (
      <Resizable
           style={{...Qrstyle , left,top}}
          //  defaultSize={{
          //    width: 400,
          //    height: 100,
             
          //  }}
          //     style={Qrstyle}
              size={{ width: qrWidth, height: qrHeight }}
              onResizeStop={(e, direction, ref, d) => {
                  if((qrWidth + d.width) > 300){
                  setqrWidth(qrWidth + d.width)
                  }
                  else{
                    setqrWidth(300)
                  }
                  // setqrHeight(qrHeight + d.height)
              
              }}
            >  
    <div ref={drag} style={style}>
      {children}
    </div>
    </Resizable>
  )
}
export default Box
