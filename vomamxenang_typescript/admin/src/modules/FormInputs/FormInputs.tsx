import {
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CTextarea,
} from '@coreui/react'

const FormInputs = (props: any) => {
  return props.ncols.map((col: any, i: number) => {
    const propriety = props.proprieties[i]

    return (
      <CInputGroup key={i} className={col}>
        <CInputGroupPrepend>
          <CInputGroupText>{propriety.inputGroupText}</CInputGroupText>
        </CInputGroupPrepend>
        {propriety.type === 'text' && (
          <CInput
            autoComplete={propriety.autoComplete}
            name={propriety.name}
            placeholder={propriety.placeholder}
            type={propriety.type}
            value={propriety.value}
            onChange={propriety.onChange}
          />
        )}
        {propriety.type === 'textarea' && (
          <CTextarea
            name={propriety.name}
            placeholder={propriety.placeholder}
            rows={propriety.rows}
            value={propriety.value}
            onChange={propriety.onChange}
          />
        )}
      </CInputGroup>
    )
  })
}

export { FormInputs }
