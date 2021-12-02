import { ObjField } from 'constants/types'

interface LoginSuccess {
  email: string
  token: string
  cookies?: string
  userInfor: UserInformation
  sessionId?: string
}

interface LoginFormValues {
  email: string
  password: string
  code?: string
  captcha?: string
}

interface OtherProps {
  message?: string
  login: (values: LoginFormValues) => Promise<void>
  setCaptchaToken: (token: string) => void
}

interface LoginFormProps {
  failedTimes: number
}

interface RESPONSE_ERROR {
  [x: string]: string
}

type FormFields = {
  formFields: ObjField
}

export { LoginSuccess, LoginFormValues, OtherProps, LoginFormProps, FormFields, RESPONSE_ERROR }
