import { useRef } from 'react'

import JoditEditor from 'jodit-react'
import 'jodit'
import 'jodit/build/jodit.min.css'

const TextAreaEditorJodit = (props) => {
  const currentRef = useRef(null)

  const onChangeValue = val => {
    const data = currentRef
    
    props.onChange(data.current.name, val)
  }
  return (
    <div className="form-group">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <JoditEditor
        config={props.config}
        name={props.name}
        ref={currentRef}
        value={props.value}
        onChange={onChangeValue}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  )
}

export default TextAreaEditorJodit
