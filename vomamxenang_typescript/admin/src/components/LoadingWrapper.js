import React, { Component } from "react"

export function loadWrapper(WrappedComponent) {
  return class LoadingWrapper extends Component {
    componentDidMount = () => {}

    componentWillReceiveProps = (nextProps, prevProps) => {}

    render() {
      const { children } = this.props

      return <WrappedComponent {...this.props}>{children}</WrappedComponent>
    }
  }
}
