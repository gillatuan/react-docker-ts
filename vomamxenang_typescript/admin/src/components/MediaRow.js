import { Image } from "react-bootstrap"
import { CCol, CFormGroup, CFormText, CInvalidFeedback, CLabel } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudUpload, cilPencil } from '@coreui/icons'

const MediaRow = ({ error, disabled, id, info, label, fileSrc, toggleModal }) => {
  return (
    <CFormGroup row>
      <CLabel col md="12" htmlFor={id}>{label}</CLabel>
      <CCol xs="12" md="9">
        
        {!fileSrc && <CIcon content={cilCloudUpload} size="2xl" onClick={toggleModal} />}
        {fileSrc && (
          <div className="media-item" style={{ display: "inline-block", position: "relative" }}>
            <Image alt={fileSrc} src={fileSrc} rounded style={{ width: 180 }} />
            <CIcon content={cilPencil} size="2xl" onClick={toggleModal} />
          </div>
        )}
      </CCol>

      {info && <CFormText className="help-block">{info}</CFormText>}
      {error && <CInvalidFeedback>{error}</CInvalidFeedback>}
    </CFormGroup>
  )
}

export default MediaRow
