import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import FormAction from './FormAction'

import { ModuleItems, PostItem } from 'views/pages/modules/Modules.d'

import * as Utils from 'utils/Utils'

import './style.scss'
import PostContainer from 'modules/PostContainer'
import MediaContainer from 'modules/MediaContainer'

const defItem: ModuleItems = {
  alias: '',
  description: '',
  fileSrc: '',
  info: '',
  selectedPosts: [],
  selectedMedia: [],
  title: '',
}
const New = () => {
  const [modules, setModules] = useState(defItem)
  const [messageErr, setMessageErr] = useState('')
  const [showModalSelectPost, setShowModalSelectPost] = useState(false)
  const [showModalMedia, setShowModalMedia] = useState(false)
  const [updatedList, setUpdatedList] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (showModalMedia) {
      setUpdatedList(showModalMedia)
    }
    if (showModalSelectPost) {
      setUpdatedList(showModalSelectPost)
    }

    return () => {
      setUpdatedList(false)
    }
  }, [showModalMedia, showModalSelectPost])

  const onCreate = () => {
    debugger
    /* if (!messageErr) {
      this.props.addModule({
        ...modules,
      })
    } */
  }

  const onCancel = () => {
    history.push('/admin/modules/list')
  }

  const handleGetValue = (name: string, val: string) => {
    let err = ''
    if (val === '' && (name === 'title' || name === 'alias')) {
      err = `${name} is mantory`
      setMessageErr(err)
    }

    let alias = modules.alias
    if (name === 'title') {
      alias = Utils.slugify(val)
    }

    const data = {
      ...modules,
      alias,
      [name]: val,
    }
    setModules(data)
  }

  const selectMedia = (index: any, fileSrc: string) => {
    if (modules.fileSrc === fileSrc) {
      fileSrc = ''
      modules.selectedMedia = modules.selectedMedia.slice(index, 1)
    }

    const data = {
      ...modules,
      fileSrc,
      selectedMedia: [...modules.selectedMedia, fileSrc],
    }
    setModules(data)
  }

  const selectPosts = (index: any, itemSelected: PostItem) => {
    if (modules.selectedPosts.indexOf(itemSelected) === -1) {
      const items = {
        ...modules,
        selectedPosts: [...modules.selectedPosts, itemSelected],
      }
      setModules(items)
    } else {
      modules.selectedPosts.splice(index, 1)

      setModules(modules)
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <FormAction
        modules={modules}
        messageErr={messageErr}
        handleGetValue={(name: string, value: string) =>
          handleGetValue(name, value)
        }
        onCancel={() => onCancel()}
        onCreate={() => onCreate()}
        toggleModalMedia={() => setShowModalMedia(!showModalMedia)}
        toggleModalPost={() => setShowModalSelectPost(!showModalSelectPost)}
      />

      <PostContainer
        selectedItems={modules.selectedPosts}
        toggleModalSelect={showModalSelectPost}
        updatedList={updatedList}
        selectItems={(index: number, item: PostItem) => selectPosts(index, item)}
        setShowModalSelect={() => setShowModalSelectPost(!showModalSelectPost)}
      />

      <MediaContainer 
        selectedItem={modules.fileSrc}
        toggleModalSelect={showModalMedia}
        updatedList={updatedList}
        selectItem={(index: number, fileSrc: string) => selectMedia(index, fileSrc)}
        setShowModalSelect={() => setShowModalMedia(!showModalMedia)}
      />
    </div>
  )
}

export default New
