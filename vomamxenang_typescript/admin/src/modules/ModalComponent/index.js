import React, { Component } from 'react'
import ModalCommon from 'components/ModalCommon'

class ModalComponent extends Component {
	constructor (props) {
		super(props)

		this.state = {
			show: props.show
		}
	}

	render = () => {
		const { children, className, closeText, heading, show, onClick } = this.props

		return (
			<ModalCommon className={className} closeText={closeText} heading={heading} show={show} toggleModal={onClick}>
				{children}
			</ModalCommon>
		)
	}
}

export default ModalComponent
