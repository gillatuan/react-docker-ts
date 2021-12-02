import React, { Component } from "react"
import { Button, Modal } from "react-bootstrap"

class ModalCommon extends Component {
  render = () => {
    const { className, children, closeText, heading, show, toggleModal } = this.props

    return (
      <Modal className={className} show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal}>{closeText}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalCommon
