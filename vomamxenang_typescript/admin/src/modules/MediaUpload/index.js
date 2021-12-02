import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'

import FormAction from "modules/MediaUpload/FormAction"

import "./media.scss"
import Media from 'services/apis/Media'

const style = {
  error: {
    color: "red",
  },
  checkbox: {
    height: "auto",
    marginLeft: 10,
    width: "auto",
  }
}

const MediaUpload = (props) => {
  const [messageErr, setMessageErr] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (props.showMessage) {
      setShowMessage(props.showMessage)
    }
    if (props.message) {
      setMessageErr(props.message)
    }
    if (props.uploaded) {
      history.push("/api/media/list")
    }
  }, [history, props.showMessage, props.message, props.uploaded])

  const handleUpload = async (objCroppedFile) => {
    // push to save file
    const formData = new FormData()
    formData.append('file', objCroppedFile)
    formData.append('isPortrait', objCroppedFile.isPortrait)
    formData.append('mediaName', objCroppedFile.mediaName)
    formData.append('title', objCroppedFile.title)
    formData.append('seo_title', objCroppedFile.seo_title)
    formData.append('seo_keywords', objCroppedFile.seo_keywords)
    formData.append('seo_description', objCroppedFile.seo_description)
  
    const obj = new Media()
    const url = '/api/media/upload'
    const resp = await obj.uploadItem(url, formData)
    if (resp.filename) {
      props.toggleModal(false)
    }
  }

  return (
    <div className="content">
      <FormAction
        {...props}
        messageErr={messageErr}
        showMessage={showMessage}
        style={style}
        onCreate={(objCroppedFile) => handleUpload(objCroppedFile)}
      />
    </div>
  )
}

export default MediaUpload
