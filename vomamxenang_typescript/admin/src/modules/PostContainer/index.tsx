import { useState } from 'react'

import ButtonField from 'components/common/ButtonField'

import ModalComponent from 'modules/ModalComponent'
import SelectInfoComponent from 'modules/SelectInfoComponent'
import PostForm from 'modules/PostForm'
import { POST_ITEM } from 'modules/PostContainer/index.d'

import { PostItem } from 'views/pages/modules/Modules'

const PostContainer = (props: POST_ITEM) => {
  const [showModalForm, setShowModalForm] = useState(false)

  const onCreate = (post: PostItem) => {
    debugger
  }

  const headingModalSelectPost = () => {
    return (
      <>
        <span>Select Post 123</span>
        <ButtonField
          className=""
          disabled={false}
          error=""
          id="select-post"
          label="Add Post"
          style={{ marginLeft: 10 }}
          onClick={() => setShowModalForm(!showModalForm)}
        />
      </>
    )
  }

  return (
    <>
    <ModalComponent
        closeText="Close"
        heading={headingModalSelectPost()}
        show={props.toggleModalSelect}
        onClick={props.setShowModalSelect}
      >
        <SelectInfoComponent
          selectedItems={props.selectedItems}
          updatedList={props.updatedList}
          selectItems={props.selectItems}
        />
      </ModalComponent>
      <ModalComponent
        className="post-form-modal"
        closeText="Close"
        heading="Form Post"
        show={showModalForm}
        onClick={() => setShowModalForm(!showModalForm)}
      >
        <PostForm
          onCreate={(dataPost: PostItem) => onCreate(dataPost)}
        />
      </ModalComponent>
    </>
  )
}
export default PostContainer