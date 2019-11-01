import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import FontPicker from "font-picker-react";
import {
  FormSelect,
} from "shards-react";
const style = {
  position: 'absolute',
  // border: '1px dashed gray',
  backgroundColor: 'transparent',
  padding: '',
  cursor: 'move',
}
const Box = ({ id, left, top, value, hideSourceOnDrag, children }) => {
  // console.log({ id, left, top,value, hideSourceOnDrag, children })
  console.log(value[id].value)
  let val = value[id].value;
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
    <div ref={drag} style={{ ...style, left, top }}>
      {children}
    </div>
  )
}
export default Box
