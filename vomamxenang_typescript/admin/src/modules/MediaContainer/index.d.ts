import { PostItem } from 'views/pages/modules/Modules'

export type MEDIA_ITEM = {
  selectedItem: string
  toggleModalSelect: boolean
  updatedList: boolean
  selectItem: (index: number, fileSrc: string) => void
  setShowModalSelect: (x: boolean) => void
}