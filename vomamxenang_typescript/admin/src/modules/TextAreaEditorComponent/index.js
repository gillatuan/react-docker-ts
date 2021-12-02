import TextAreaEditorJodit from 'components/TextAreaEditorJodit'
import './style.css'

const TextAreaEditorComponent = (props) => {
  const state = {
    config: {
      readonly: false,
      height: 300,
      uploader: {
        insertImageAsBase64URI: true,
      },
    },
  }

  return <TextAreaEditorJodit {...props} config={state.config} />
}

export default TextAreaEditorComponent
