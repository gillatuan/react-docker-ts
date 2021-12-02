import Configs from 'config'
import { StringPropertyObject } from './types'

export const DATE_TIME_FULL_FORMAT = 'yyyy-MM-dd HH:mm:ss'
export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm'
export const DATE_MONTH_SHORT_FORMAT = 'yyyy-MM-dd'
export const DATE_FORMAT = 'dd MMM yyyy'
export const CATING_DATE_OF_BIRTH_FORMAT = 'dd/MM/yyyy'
export const DEBOUNCE_TIME = 500
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_MAX_LENGTH_INPUT = 100
export const FILE_SIZE_IMG = 2
export const TOAST_DURATION: number = 3000
export const NUMBER_CURRENCY: number = 99999999
export const NUMBER_PERCENT: number = 100

export const SORT_STATUS: number[] = [0, 1, -1]
export const FORGET_PASSWORD_PAGE = `${Configs.LINK.SHAHID_WEB}/ar/widgets/forget-password`
export const SIGNUP_PAGE = `${Configs.LINK.SHAHID_WEB}/ar/widgets/login`
export const MAX_LOGIN_FAILED_TIMES = 5
export const DELAY_TIME: number = 600

type TMAPPING_KEY_LANGUAGE = {
  [key: string]: any
}
export const MAPPING_KEY_LANGUAGE: TMAPPING_KEY_LANGUAGE = {
  en: 'Enlish',
  ar: 'Arabic',
  jp: 'Japan',
}

export const LANG_DEF: string = 'en'
export const LIST_MAX_ROWS = [25, 50, 100]

export const SORT = 'sort'
export const SORT_BY_ASC = 'asc'
export const SORT_BY_DESC = 'desc'
export const EDIT = 'Edit'
export const DELETE = 'Delete'
export const ACTIVATE = 'Activate'
export const APPROVE = 'Approve'
export const REJECT = 'Reject'
export const DEACTIVATE = 'Deactivate'
export const SCHEDULE = 'Schedule'

export const TESTING_TIMEOUT = 500

export const CATALOGS_FIELD_PROPERTY = {
  MAX_LENGTH: 100,
}

export const CASTING_TEXT_FIELD_PROPERTY = {
  MAX_LENGTH: 100,
}

export const LICENSORS_TEXT_FIELD_PROPERTY = {
  ADDRESS_MAX_LENGTH: 1000,
}

export const TEXT_AREA_PROPERTY = {
  MAX_LENGTH: 1000,
}

export const TEXT_AREA = 'textarea'

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 25,
  DEFAULT_CURRENT_PAGE: 1,
  NUMBER_OF_NAVIGATION_SHOW: 5,
  LOWER_BOUND: 2,
  UPPER_BOUND: 2,
  BEGIN_TO_PAGING: 3,
}

export const LANGUAGE_CODE_MAPPING_TRANSLATE_CODE: StringPropertyObject = {
  ar: 'ARABIC',
  en: 'ENGLISH',
}

export const ENTITY_STATUS = {
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate',
  DRAFT: 'draft',
  DELETE: 'delete',
  UPDATED: 'updated',
  REJECT: 'rejected',
  APPROVAL_PENDING: 'pending approval',
}

export const ENTITY_STATUS_FROM_SERVER = {
  ACTIVATE: 'activated',
  DRAFT: 'draft',
  DELETE: 'deleted',
  DEACTIVATE: 'inactive',
  UPDATED: 'updated',
  REJECT: 'rejected',
  APPROVAL_PENDING: 'pending approval',
}

export const CLASS_NAME = {
  READONLY: 'read-only',
  DISABLED: 'disabled',
}

export const AUTHORIZATION = "Authorization";
export const USER_ROLE = "user_role";

