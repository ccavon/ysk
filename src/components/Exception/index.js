import React from 'react'

export default function Exception (WrappedComponent) {
  return class ExceptionHOCComponent extends React.PureComponent {
    componentDidCatch(error, info) {
      console.log(error)
    }
    render () {
      return <WrappedComponent />
    }
  }
}