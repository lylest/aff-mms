import React from 'react'
import {Spinner} from '@blueprintjs/core'

function Loading() {
  return (
    <div className="loading-wrapper" >
        <div className="loading-div" style={{marginTop:'20%'}}>
        <Spinner  size={50} intent="primary" />
        </div>
    </div>
  )
}

export default Loading