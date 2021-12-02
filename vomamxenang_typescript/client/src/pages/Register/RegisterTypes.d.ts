import { ObjField } from "constants/types";

interface RegisterFormValues {
  email: string
  firstname: string
  lastname: string
  password: string
  confirmPassword?: string
}

interface OtherProps {
  errors?: any
  touched?: any
  handleSubmit: (values: RegisterFormValues) => Promise<void>
}

export {
  OtherProps,
  RegisterFormValues,
}