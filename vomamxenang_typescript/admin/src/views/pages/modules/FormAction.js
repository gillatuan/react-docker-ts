import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
} from '@coreui/react'

import { FormInputs } from 'modules/FormInputs/FormInputs'

import TextAreaComponent from 'modules/TextAreaComponent'
import TextAreaEditorComponent from 'modules/TextAreaEditorComponent'
import SelectMediaComponent from 'modules/SelectMediaComponent'
import SelectPostComponent from 'modules/SelectPostComponent'
import ButtonGroupComponent from 'modules/ButtonGroupComponent'

const FormAction = (props) => {
  const [referrer, setReferrer] = useState(false)

  const {
    itemId,
    messageErr,
    modules,
    handleGetValue,
    toggleModalMedia,
    toggleModalPost,
    onCreate,
  } = props

  if (referrer) {
    return <Redirect to="/admin/modules/list" />
  }

  const titleCard = (itemId && 'Chỉnh sửa Module ' + modules.title) || 'Tạo mới'
  const titleBtn = (itemId && 'Cập nhật Module') || 'Tạo mới'

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="12" lg="10" xl="10">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm>
                <h1>Modules</h1>
                <p className="text-muted">{titleCard}</p>
                <FormInputs
                  ncols={['mb-3', 'mb-3']}
                  proprieties={[
                    {
                      disabled: false,
                      inputGroupText: 'T',
                      label: 'title',
                      name: 'title',
                      placeholder: 'Title',
                      type: 'text',
                      value: modules.title,
                      onChange: (e) => handleGetValue(e.target.name, e.target.value),
                    },
                    {
                      disabled: true,
                      inputGroupText: 'A',
                      label: 'alias',
                      name: 'alias',
                      placeholder: 'Alias',
                      type: 'text',
                      value: modules.alias,
                      onChange: (e) => handleGetValue(e.target.name, e.target.value),
                    },
                  ]}
                />

                <TextAreaComponent
                  id="info"
                  label="Info"
                  name="info"
                  placeholder="Info"
                  type="textarea"
                  value={modules.info}
                  onChange={handleGetValue}
                />

                <SelectMediaComponent
                  label="Select Media"
                  fileSrc={modules.fileSrc}
                  toggleModal={toggleModalMedia}
                />

                <SelectPostComponent
                  label="Chọn bài viết"
                  selectedPosts={modules.selectedPosts}
                  toggleModal={toggleModalPost}
                />

                <TextAreaEditorComponent
                  id="description"
                  label="Description"
                  name="description"
                  placeholder="Description"
                  value={modules.description}
                  onChange={(name, value) => handleGetValue(name, value)}
                />

                <ButtonGroupComponent
                  error={(messageErr && true) || false}
                  actionLabel={titleBtn}
                  onCancel={() => setReferrer(false)}
                  onCreate={onCreate}
                />
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default FormAction
