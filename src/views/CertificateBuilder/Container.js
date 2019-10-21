import React, { useState , useEffect } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
import { useDispatch, useSelector } from "react-redux";



const styles = {
  width: "100%",
  height: "100%",
  border: '1px solid black',
  position: 'relative',
}
const Container = ({ hideSourceOnDrag }) => {
  // const [boxes, setBoxes] = useState({
  //   a: { top: 20, left: 920, title: 'Drag me around' },
  //   b: { top: 60, left: 920, title: 'Drag me too' },
  // })
  const dispatch = useDispatch()
  const image =  useSelector(state => state.dashboard_reducer.image)
  const [fields, setFields] = useState([]);
  const [boxTop , setTop] = useState(0)
  const [boxLeft , setLeft] = useState(0)
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
    console.log("Fields in Move Box",fields)
    console.log("left ==> " , left , "top ==> ", top)
    console.log("imageWidth => ",document.getElementById("DnDImage").clientWidth);
    console.log("imageHeight=> ",document.getElementById("DnDImage").clientHeight);
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    console.log("Fields ==> ",fields)

    setFields(
      update(fields, {
        [id]: {
          $merge: { left, top },
        },
      }),
    )
    console.log("Fields after update",fields)
     let tempField = JSON.parse(JSON.stringify(fields))
    console.log("tempFields ==> ",tempField)
    console.log("Fields ==> ",fields)
    //  tempFields[id].left = left
    //  tempFields[id].top = top
    let tops = null
    let lefts = null
     for(let i = 0 ; i< tempField.length ;i++ ){
      console.log("In for loop")
      console.log(tempField)
      console.log(i)
      console.log(tempField[i])
      if(imageHeight > top && imageWidth > left){
      tops = convertPxToPercentage(imageHeight,top)
      lefts = convertPxToPercentage(imageWidth,left)
      tempField[id].left = lefts
      tempField[id].top = tops
    }
  }
    console.log("tempFields ==> ",tempField)
     
    dispatch({type : 'CLASSIFICATION_FIELDS',payload: tempField})

     console.log(tops , lefts)
  } 

  useEffect( () => {
    console.log("container =>" , document.getElementById("DnDContainer").clientWidth);
    console.log("imageWidth => ",document.getElementById("DnDImage").clientWidth);
    let left = document.getElementById("DnDImage").clientWidth;
    console.log(typeof(left))
    // setTop(prev => prev+4)
    setTop(4)
    setLeft(left)
    // const values = [...fields];
    // let imageWidth = document.getElementById("DnDImage").clientWidth
    // for(let i = 0 ; i< values.length , i++){
    //   values
    return () => {
      console.log(fields)
      // let check = false
      // for(let i=0 ; i<= fields.length ; i++){
      //   if(fields[i].value == null){
      //     alert("You cant pass the empty value else you can close the fields")
      //     return
      //   }
      //   else {
      //     check = true
      //   }
      // }
      // if(check){
      // console.log(fields)
      // }
    }
    // }
  },[])

 function convertPxToPercentage(image , box){
   let percentage = (box/image) * 100
   return percentage
 }
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    console.log("values in Handle CHange",values)
    setFields(values);

    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(fields))
    console.log("tempFields ==> ",tempFields)
    console.log("Fields ==> ",fields)
    console.log(tempFields.length)
    for(let i = 0 ; i< tempFields.length ;i++ ){
      console.log("In for loop")
      console.log(tempFields)
      console.log(i)
      console.log(tempFields[i])
      let top = tempFields[i].top
      let left = tempFields[i].left
      if(imageHeight > top && imageWidth > left){
       let tops = convertPxToPercentage(imageHeight,top)
       let lefts = convertPxToPercentage(imageWidth,left)
       tempFields[i].left = lefts
       tempFields[i].top = tops
    }
  }
    
    console.log("tempFields ==> ",tempFields)
     
    dispatch({type : 'CLASSIFICATION_FIELDS',payload: tempFields})


  }

  function handleAdd() {
    const values = [...fields];
    console.log("boxTop==>" , boxTop , "boxLeft==>" , boxLeft)
    values.push({ top: boxTop, left: boxLeft,value: null });
    console.log(values)
    setFields( values);

  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  return (
    
    <div id = "DnDContainer" ref={drop} style={styles}>
       
      {Object.keys(fields).map((field, idx) => {
      const { left, top, title } = fields[idx]
      console.log(fields[idx].value)
        return (
          <div key={`${field}-${idx}`}>
          {console.log(field,idx)}
            
             <Box
            key={idx}
            id={idx}
            left={left}
            top={top}
            value={fields}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            <input
              type="text"
              placeholder="Enter text"
              value={fields[idx].value}
              onChange={e => handleChange(idx, e)}
            />
            <button type="button" onClick={() => handleRemove(idx)}>
              X
            </button>
            </Box>
          </div>
        );
      })}
      <img id = "DnDImage" src = {URL.createObjectURL(image)} width= "75%" />
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
