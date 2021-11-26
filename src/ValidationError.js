import React from 'react'

export default function ValidationError(props) {
  if (!props.message) return null;
    return <div>{props.message}</div>
}

