import { CButton, CButtonGroup } from '@coreui/react'

import './style.css'

const ButtonGroupComponent = (props) => {
  const { className, error, actionLabel, onCancel, onCreate } = props

  return (
    <CButtonGroup className="btn-group-def">
      <CButton
        block
        className={className}
        color="success"
        disabled={(error && true) || false}
				id="create"
				size="sm"
        onClick={onCreate}
      >
        {actionLabel}
      </CButton>
      <CButton
        block
        className={className}
        color="danger"
        disabled={(error && true) || false}
        id="cancel"
				size="sm"
        onClick={onCancel}
      >
        Huỷ
      </CButton>
    </CButtonGroup>
  )
}

export default ButtonGroupComponent
