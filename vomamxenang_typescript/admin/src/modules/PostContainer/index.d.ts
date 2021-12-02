import { PostItem } from 'views/pages/modules/Modules'

export type POST_ITEM = {
  selectedItems: PostItem[]
  toggleModalSelect: boolean
  updatedList: boolean
  selectItems: (index: number, item: PostItem) => void
  setShowModalSelect: (x: boolean) => void
}