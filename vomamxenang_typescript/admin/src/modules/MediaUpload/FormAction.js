import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CInput,
  CRow,
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { ButtonGroup, Image } from 'react-bootstrap'
import ButtonField from 'components/common/ButtonField'

import * as SETTING from 'config/setting.json'
import * as Utils from 'utils/Utils.js'
import './media.scss'

const FormAction = (props) => {
  const defState = {
    acceptedFiles: null,
    aspectRatio: 16 / 9,
    dataAdditionalUpload: null,
    disableBtnCrop: true,
    disableBtnCreate: true,
    fileSrc: '',
    filesRejected: null,
    isPortrait: (props.media && props.media.isPortrait) || 2,
    loading: false,
    images: [],
    imageUrls: [],
    message: '',
    myCheckbox: null,
    objCroppedFile: null,
    title: '',
  }
  const [uploadState, setUploadState] = useState(defState)
  const [cropperDropzone, setCropperDropzone] = useState(null)
  const history = useHistory()

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      let filesRejected = rejectedFiles[0]
      let messageErr = []

      if (SETTING.FILE_TYPE_IMAGES.indexOf(filesRejected.type) < 0) {
        messageErr.push(SETTING.FILE_TYPE_ERROR)
      }
      if (filesRejected.size > parseInt(SETTING.FILE_MAX_SIZE)) {
        messageErr.push(SETTING.FILE_SIZE_ERROR)
      }

      setUploadState({
        ...uploadState,
        acceptedFiles: null,
        disableBtnCrop: true,
        filesRejected: rejectedFiles,
        messageErr,
      })
    }
    if (acceptedFiles.length > 0) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadState({
          ...uploadState,
          acceptedFiles: acceptedFiles[0],
          disableBtnCrop: false,
          disableBtnCreate: true,
          fileSrc: reader.result,
        })
      }
      reader.readAsDataURL(acceptedFiles[0])
    }
  }

  const handleCrop = () => {
    // image in dataUrl
      const mediaCropped = cropperDropzone.getCroppedCanvas().toDataURL()
    if (!mediaCropped) {
      return
    }

    let disableBtnCreate = false,
      disableBtnCrop = null,
      objCroppedFile = null,
      messageErr = '',
      showMessage = false

    if (!uploadState.title) {
      disableBtnCreate = true
      messageErr = 'The Media name is not empty'
      showMessage = true
    } else {
      const { isPortrait } = uploadState

      disableBtnCrop = true
      // naming for cropped media
      const nameCroppedMedia = Utils.slugify(uploadState.title)
      objCroppedFile = Utils.base64StringtoFile(mediaCropped, nameCroppedMedia)
      objCroppedFile.base64Str = mediaCropped
      objCroppedFile.mediaName = nameCroppedMedia
      objCroppedFile.title = uploadState.title
      objCroppedFile.isPortrait = isPortrait
      objCroppedFile.seo_title = uploadState.seo_title
      objCroppedFile.seo_keywords = uploadState.seo_keywords
      objCroppedFile.seo_description = uploadState.seo_description
    }

    setUploadState({
      ...uploadState,
      disableBtnCreate,
      disableBtnCrop,
      messageErr,
      objCroppedFile,
      showMessage,
    })
  }

  const handleCancel = () => {
    setUploadState({
      ...uploadState,
      acceptedFiles: null,
      disableBtnCrop: false,
      fileSrc: null,
    }) 

    history.push('/admin/modules/new')
  }

  const changeImage = () => {
    setUploadState({
      ...uploadState,
      acceptedFiles: null,
      disableBtnCrop: true,
      disableBtnCreate: true,
      fileSrc: '',
      objCroppedFile: null,
    })
  }

  const renderUploadMedia = () => {
    const parseTypeImages = JSON.parse(SETTING.FILE_TYPE_IMAGES)
    const typeImagesToString = parseTypeImages.join()
    const maxSize = parseInt(SETTING.FILE_MAX_SIZE)

    const content = (
      <div className="container-dropzone">
        <Dropzone
          accept={typeImagesToString}
          // accept="image/jpeg, image/png"
          maxSize={maxSize}
          className="dropzone"
          // ref={(node) => setUploadState(node)}
          multiple={false}
          // onDropAccepted={(acceptedFiles) => onDropAccepted(acceptedFiles)}
          onDrop={(acceptedFiles, rejectedFiles) =>
            onDrop(acceptedFiles, rejectedFiles)
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    )

    return content
  }

  const renderMedia = () => {
    if (uploadState.objCroppedFile) {
      uploadState.fileSrc = uploadState.objCroppedFile.base64Str
    }

    return (
      <div className="image-cropped" style={{ position: 'relative' }}>
        <Image src={uploadState.fileSrc} rounded />
        <CIcon
          height="52"
          name="cil-x-circle"
          style={{ color: '#d53939', position: 'absolute', right: -10, top: -10 }}
          onClick={() => changeImage()}
        />
      </div>
    )
  }

  const renderCropper = () => {
    return (
      <Cropper
        aspectRatio={(uploadState.isPortrait === 1 && 1) || 16 / 9}
        className="image-cropper"
        guides={false}
        minCropBoxWidth={uploadState.aspectRatio.minWidth}
        src={uploadState.fileSrc}
        style={{ width: '100%', height: 290, marginBottom: 15 }}
        viewMode={1}
        onInitialized={(instance) => setCropperDropzone(instance)}
      />
    )
  }

  const handleChangeText = (e) => {
    const eventName = e.target.name
    const eventValue = e.target.value

    let disableBtnCreate = false
    if (eventValue === '') {
      if (eventName === 'title') {
        setUploadState({
          ...uploadState,
          disableBtnCreate: true,
          messageErr: '',
        })
      }

      return
    }

    if (!uploadState.title) {
      disableBtnCreate = true
    }

    setUploadState({
      ...uploadState,
      disableBtnCreate,
      [eventName]: eventValue,
    })
  }

  const handleChangeCheckbox = () => {
    let aspectRatio = 16 / 9
    let isPortrait = 2
    if (uploadState.myCheckbox && uploadState.myCheckbox.checked) {
      aspectRatio = 1
      isPortrait = 1
    }
    setUploadState({
      ...uploadState,
      aspectRatio,
      isPortrait,
    })
  }

  const { itemId, style, onCreate } = props

  /* if (referrer) {
    return <Redirect to="/api/media/list" />
  } */

  let titleBtn = 'Tạo mới Media'
  let titleCard = 'Tạo mới Media'
  if (itemId) {
    titleCard = `Chỉnh sửa Media ${uploadState.title}`
    titleBtn = `Cập nhật Media`
  }

  return (
    <CRow className="justify-content-center">
      <CCol md="12">
        <CCard>
          <CCardBody>
            <CForm>
              <h1>Media</h1>
              <p className="text-muted">{titleCard}</p>

              <div className="form-field">
                <label className="control-label">Title<span className="required">*</span></label>
                <CInput
                  name="title"
                  placeholder="Title"
                  type="text"
                  onChange={(e) => handleChangeText(e)}
                />
              </div>

              <div className="form-field flex-item">
                <label className="control-label">Is Portrait</label>
                <CInput
                  placeholder="Is Portrait"
                  style={props.style.checkbox}
                  type="checkbox"
                  onChange={(e) => handleChangeCheckbox()}
                />
              </div>

              <div className="form-field">
                <label className="control-label">Upload Image</label>
                {!uploadState.fileSrc && renderUploadMedia()}

                {uploadState.fileSrc &&
                  !uploadState.objCroppedFile &&
                  renderCropper()}

                {uploadState.objCroppedFile && renderMedia()}

                {uploadState.showMessage && (
                  <div className="file-info" style={style.error}>
                    Error Message: {uploadState.messageErr}
                  </div>
                )}
              </div>

              {/* SEO */}
              <div className="form-field">
                <label className="control-label">SEO Title</label>
                <CInput
                  name="seo_title"
                  placeholder="SEO Title"
                  type="text"
                  onChange={(e) => handleChangeText(e)}
                />
              </div>
              <div className="form-field">
                <label className="control-label">SEO Keywords</label>
                <CInput
                  name="seo_keywords"
                  placeholder="SEO Keywords"
                  type="text"
                  onChange={(e) => handleChangeText(e)}
                />
              </div>
              <div className="form-field">
                <label className="control-label">SEO Description</label>
                <CTextarea
                  name="seo_description"
                  placeholder="SEO Description"
                  size="20"
                  type="text"
                  onChange={(e) => handleChangeText(e)}
                />
              </div>
              {/* SEO */}

              <CCardFooter>
                <ButtonGroup className="btn-group-def right">
                  <ButtonField
                    className="create"
                    id="create"
                    disabled={uploadState.disableBtnCreate}
                    label={titleBtn}
                    style={null}
                    onClick={() => onCreate(uploadState.objCroppedFile)}
                  />
                  {uploadState.acceptedFiles && (
                    <ButtonField
                      className="btn-secondary"
                      id="crop"
                      disabled={uploadState.disableBtnCrop}
                      label="crop"
                      style={null}
                      onClick={() => handleCrop()}
                    />
                  )}
                  <ButtonField
                    className="cancel"
                    id="cancel"
                    disabled={false}
                    label="Huỷ"
                    style={null}
                    onClick={() => handleCancel()}
                  />
                </ButtonGroup>
              </CCardFooter>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormAction
