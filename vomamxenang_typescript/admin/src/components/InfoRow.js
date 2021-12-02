import { Image } from "react-bootstrap"
import * as SETTING from "config/setting.json"
import { CCol, CFormGroup, CFormText, CInvalidFeedback, CLabel } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilNewspaper } from '@coreui/icons'

const InfoRow = (props) => {
  const renderItemInfo = (item, index) => {
    return (
      <div key={index} className="media-item" style={{ display: "inline-block", position: "relative" }}>
        <Image alt={item.fileSrc} src={SETTING.BASE_URL + "/images/uploads/" + item.fileSrc} rounded style={{ width: 180 }} />
        <CIcon content={cilPencil} size="2xl" onClick={props.toggleModal} />
      </div>
    )
  }

  return (
    <div className="form-group">
      <CFormGroup row>
        <CLabel col md="12" htmlFor={props.id}>{props.label}</CLabel>
        <CCol xs="12" md="9">
          {props.selectedPosts.length === 0 && <CIcon content={cilNewspaper} size="2xl" onClick={props.toggleModal} />}
          {props.selectedPosts.length > 0 && props.selectedPosts.map((item, index) => renderItemInfo(item, index))}
        </CCol>

        {props.info && <CFormText className="help-block">{props.info}</CFormText>}
        {props.error && <CInvalidFeedback>{props.error}</CInvalidFeedback>}
      </CFormGroup>
    </div>
  )
}

export default InfoRow
