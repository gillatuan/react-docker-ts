import React, {Component} from "react"
import TextAreaFieldGroup from "components/TextAreaFieldGroup"

class TextAreaComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fieldVal: props.value || "",
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.value !== "" && nextProps.value !== this.props.value) {
      this.setState({
        fieldVal: nextProps.value,
      })
    }
  }

  handleChangeText = (e) => {
    let val = e.target.value

    this.setState({
      [ e.target.name ]: val,
      fieldVal: val,
    })

    this.props.onChange([ e.target.name ], val)
  }

  render () {
    const {error, disabled, id, info, label, name, placeholder, rows, type} = this.props

    return (
      <TextAreaFieldGroup
        error={error || null}
        disabled={disabled}
        id={id}
        info={info || null}
        label={label}
        name={name}
        placeholder={placeholder}
        rows={rows || 5}
        type={type}
        value={this.state.fieldVal}
        onChange={(e) => this.handleChangeText(e)}
      />
    )
  }
}

export default TextAreaComponent
