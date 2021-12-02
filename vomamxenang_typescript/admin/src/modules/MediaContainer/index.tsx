import { useState } from 'react'

import ModalComponent from 'modules/ModalComponent'
import Gallery from 'modules/Gallery'
import MediaUpload from 'modules/MediaUpload'
import ButtonField from 'components/common/ButtonField'
import { MEDIA_ITEM } from 'modules/MediaContainer/index.d'

const MediaContainer = (props: MEDIA_ITEM) => {
  const [showModalForm, setShowModalForm] = useState(false)

  const headingModalMedia = () => {
    return (
      <>
        <span>Select Media</span>
        <ButtonField
          className=""
          disabled={false}
          error=""
          id="select-media"
          label="Add Media"
          style={{ marginLeft: 10 }}
          onClick={() => setShowModalForm(!showModalForm)}
        />
      </>
    )
  }

  return (
    <>
      <ModalComponent
        className="gallery-modal"
        closeText="Close"
        heading={headingModalMedia()}
        show={props.toggleModalSelect}
        onClick={props.setShowModalSelect}
      >
        <Gallery
          selectedItem={props.selectedItem}
          updatedList={props.updatedList}
          onSelectMedia={props.selectItem}
        />
      </ModalComponent>
      <ModalComponent
        closeText="Close"
        heading="Upload Media"
        show={showModalForm}
        onClick={() => setShowModalForm(!showModalForm)}
      >
        <MediaUpload
          toggleModal={() => setShowModalForm(showModalForm)}
        />
      </ModalComponent>
    </>
  )
}
export default MediaContainer