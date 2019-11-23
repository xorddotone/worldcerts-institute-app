import React, { useState, useCallback } from 'react'
import Container from './Container'
import Toolbar from "./Toolbar"

export default function DragAroundNaive() {
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
  const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
    hideSourceOnDrag,
  ])
  return (
    <div style={{ width: "100%" }}>
      <Toolbar />
      <Container hideSourceOnDrag={true} />
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
