import React from 'react'
import { match } from 'react-router-dom'

import ListPage from 'pages/admin/Modules/List'

const Modules = (props: any, id: string) => {
  const renderComp = (location: Location, match: match) => {
    let content = {}

    switch (match.url) {
      case "/admin/modules/list":
        content = <ListPage {...props} />
        break
      case "/admin/modules/new":
        content = 'NewCreate'
        // content = <NewCreate {...this.props} />
        break
      case "/admin/modules/edit":
        content = 'Edit'
        // content = <Edit {...this.props} itemId={id} />
        break

      default:
        content = 'List'
        break
    }

    return content
  }
  return (
    <div className="item-model modules">
      {renderComp(props.location, props.match)}
    </div>
  )
}

export default Modules