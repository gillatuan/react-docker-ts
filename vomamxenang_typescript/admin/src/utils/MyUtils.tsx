import { map } from "lodash"

import { ObjField } from "constants/types"

export const convertValidateField = (listFields: ObjField) => {
  let listObjField = {}
  map(listFields, (item, key) => {
    listObjField = {
      ...listObjField,
      [`${key}`]: item.validationRules,
    }
  })

  return listObjField
}