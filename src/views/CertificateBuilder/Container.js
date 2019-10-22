import React, { useState, useEffect } from 'react'
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
  const image = useSelector(state => state.dashboard_reducer.image)
  const [fields, setFields] = useState([]);
  const [boxTop, setTop] = useState(0)
  const [boxLeft, setLeft] = useState(0)
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
      let tops = convertPxToPercentage(imageHeight, tempField[i].top)
      let lefts = convertPxToPercentage(imageWidth, tempField[i].left)
      tempField[i].left = lefts
      tempField[i].top = tops
    }

    let tops = convertPxToPercentage(imageHeight, top)
    let lefts = convertPxToPercentage(imageWidth, left)
    tempField[id].left = lefts
    tempField[id].top = tops
    console.log("tempFields ==> ", tempField)

    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempField })

  }

  useEffect(() => {
    let left = document.getElementById("DnDImage").clientWidth;
    console.log(typeof (left))
    setTop(4)
    setLeft(left)
    return () => {
      console.log(fields)
    }
  }, [])

  function convertPxToPercentage(image, box) {
    console.log("In percentage")
    let percentage = (box / image) * 100
    return percentage
  }
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
    let imageHeight = document.getElementById("DnDImage").clientHeight
    let imageWidth = document.getElementById("DnDImage").clientWidth
    let tempFields = JSON.parse(JSON.stringify(fields))
    for (let i = 0; i < tempFields.length; i++) {
      if (imageHeight > tempFields[i].top || imageWidth > tempFields[i].left) {
        let tops = convertPxToPercentage(imageHeight, tempFields[i].top)
        let lefts = convertPxToPercentage(imageWidth, tempFields[i].left)
        tempFields[i].left = lefts
        tempFields[i].top = tops
      }
    }
    console.log("tempFields ==> ", tempFields)
    dispatch({ type: 'CLASSIFICATION_FIELDS', payload: tempFields })
  }

  function handleAdd() {
    const values = [...fields];
    console.log("boxTop==>", boxTop, "boxLeft==>", boxLeft)
    values.push({ top: boxTop, left: boxLeft, value: null });
    console.log(values)
    setFields(values);

  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  return (

    <div id="DnDContainer" ref={drop} style={styles}>

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
