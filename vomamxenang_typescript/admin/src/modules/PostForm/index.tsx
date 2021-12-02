import { FormEvent, useEffect, useState } from 'react'
import { FormGroup } from 'react-bootstrap'
import { CForm, CInputCheckbox, CFormGroup, CLabel } from '@coreui/react'

import TextAreaEditorComponent from 'modules/TextAreaEditorComponent'
import SelectMediaComponent from 'modules/SelectMediaComponent'
import ButtonGroupComponent from 'modules/ButtonGroupComponent'

import MediaContainer from 'modules/MediaContainer'
import { FormInputs } from 'modules/FormInputs/FormInputs'

import * as Utils from 'utils/Utils'
import { PostItem } from 'views/pages/modules/Modules'

const defItem: PostItem = {
  alias: '',
  description: '',
  fileSrc: '',
  info: '',
  seo_description: '',
  seo_keywords: '',
  seo_title: '',
  title: '',
}
const PostForm = (props: any) => {
  const [post, setPost] = useState(defItem)
  const [toggleSEO, setToggleSEO] = useState(false)
  const [messageErr, setMessageErr] = useState('')
  const [showModalMedia, setShowModalMedia] = useState(false)
  const [updatedList, setUpdatedList] = useState(false)

  useEffect(() => {
    // toggle Gallery modal
    if (showModalMedia) {
      setUpdatedList(showModalMedia)
    }

    return () => {
      setUpdatedList(false)
    }
  }, [showModalMedia])

  const handleToggleSEO = (e: FormEvent<HTMLInputElement>) => {
    setToggleSEO(e.currentTarget.checked)
  }

  const handleGetValue = (name: string, val: string) => {
    let alias = post.alias
    if (name === 'title') {
      alias = Utils.slugify(val)
    }

    const data = {
      ...post,
      alias,
      [name]: val,
    }
    setPost(data)
  }

  const selectMedia = (index: number, fileSrc: string) => {
    if (post.fileSrc === fileSrc) {
      fileSrc = ''
      post.fileSrc = fileSrc
    }

    const data = {
      ...post,
      fileSrc,
    }

    setPost(data)
  }

  const handleSubmit = (dataPost: PostItem) => {
    let err = ''
    if (!dataPost.title || !dataPost.info) {
      err = 'Title or Info are mantory'
      setMessageErr(err)

      return
    }

    props.onCreate(dataPost)
  }

  let titleCard = (props.itemId && 'Chỉnh sửa bài Post ' + post.title) || 'Tạo mới'
  let titleBtn = (props.itemId && 'Cập nhật bài Post' + post.title) || 'Tạo mới'
  const clsToggleSeo = (toggleSEO && 'active') || 'hide'

  return (
    <CForm>
      <h1>Post Form</h1>
      <p className="text-muted">{titleCard}</p>
      {messageErr && <p className="error">{messageErr}</p>}
      <FormInputs
        ncols={['mb-3', 'mb-3']}
        proprieties={[
          {
            bsClass: 'form-control',
            disabled: false,
            inputGroupText: 'T',
            label: 'title',
            name: 'title',
            placeholder: 'Title',
            type: 'text',
            value: post.title,
            onChange: (e: FormEvent<HTMLInputElement>) => handleGetValue(e.currentTarget.name, e.currentTarget.value),
          },
          {
            bsClass: 'form-control',
            disabled: true,
            inputGroupText: 'A',
            label: 'alias',
            name: 'alias',
            placeholder: 'Alias',
            type: 'text',
            value: post.alias,
            onChange: (e: FormEvent<HTMLInputElement>) => handleGetValue(e.currentTarget.name, e.currentTarget.value),
          },
        ]}
      />

      <CFormGroup variant="custom-checkbox" inline className="mb-3">
        <CInputCheckbox
          custom
          id="toggle_seo"
          name="toggle_seo"
          // value={toggleSEO}
          onChange={(e: FormEvent<HTMLInputElement>) => handleToggleSEO(e)}
        />
        <CLabel variant="custom-checkbox" htmlFor="toggle_seo">
          Toggle SEO
        </CLabel>
      </CFormGroup>

      <FormInputs
        ncols={[
          `mb-3 ${clsToggleSeo}`,
          `mb-3 ${clsToggleSeo}`,
          `mb-3 ${clsToggleSeo}`,
        ]}
        proprieties={[
          {
            bsClass: 'form-control',
            disabled: false,
            inputGroupText: 'SEO',
            label: 'Seo Title',
            name: 'seo_title',
            placeholder: 'Seo Title',
            type: 'text',
            value: post.seo_title,
            onChange: (e: FormEvent<HTMLInputElement>) => handleGetValue(e.currentTarget.name, e.currentTarget.value),
          },
          {
            bsClass: 'form-control',
            disabled: false,
            inputGroupText: 'SEO',
            label: 'Seo Keywords',
            name: 'seo_keywords',
            placeholder: 'Seo Keywords',
            type: 'text',
            value: post.seo_keywords,
            onChange: (e: FormEvent<HTMLInputElement>) => handleGetValue(e.currentTarget.name, e.currentTarget.value),
          },
          {
            bsClass: 'form-control',
            componentClass: 'textarea',
            disabled: false,
            inputGroupText: 'SEO',
            label: 'Seo Description',
            name: 'seo_description',
            placeholder: 'Seo Description',
            rows: 4,
            type: 'textarea',
            value: post.seo_description,
            onChange: (e: FormEvent<HTMLInputElement>) => handleGetValue(e.currentTarget.name, e.currentTarget.value),
          },
        ]}
      />

      <SelectMediaComponent
        label="Select Media"
        fileSrc={post.fileSrc}
        toggleModal={() => setShowModalMedia(!showModalMedia)}
      />
      
      <MediaContainer 
        selectedItem={post.fileSrc}
        toggleModalSelect={showModalMedia}
        updatedList={updatedList}
        selectItem={(index: number, fileSrc: string) => selectMedia(index, fileSrc)}
        setShowModalSelect={() => setShowModalMedia(!showModalMedia)}
      />

      <FormInputs
        ncols={['mb-12 mb-3']}
        proprieties={[
          {
            bsClass: 'form-control',
            disabled: false,
            inputGroupText: 'I',
            label: 'info',
            name: 'info',
            placeholder: 'Info',
            type: 'textarea',
            value: post.info,
            onChange: (e: FormEvent<HTMLInputElement>) => handleGetValue(e.currentTarget.name, e.currentTarget.value),
          },
        ]}
      />

      <FormGroup controlId="formControlsTextareaDescription">
        <TextAreaEditorComponent
          id="description"
          name="description"
          placeholder="Description"
          value={post.description}
          onChange={(name: string, val: string) => handleGetValue(name, val)}
        />
      </FormGroup>

      <ButtonGroupComponent
        error={(messageErr && true) || false}
        actionLabel={titleBtn}
        closeModal
        onCancel={() => props.closeModal}
        onCreate={() => handleSubmit(post)}
      />
    </CForm>
  )
}

export default PostForm
