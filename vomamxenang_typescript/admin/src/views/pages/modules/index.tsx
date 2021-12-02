import { ModuleProvider } from 'context/ModuleContext'

import List from 'views/pages/modules/List'
import New from 'views/pages/modules/New'

const Modules = (props: any) => {
  const renderComp = () => {
    let id = null
    if (
      props.match.params.action === 'edit' ||
      props.match.params.action === 'delete'
    ) {
      // get id
      id = props.location.pathname.replace(props.match.url + '/', '')
    }

    let content = {}
    switch (props.match.params.action) {
      case 'list':
        content = <List {...props} />
        break
      case 'new':
        content = <New {...props} />
        break
      case 'edit':
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
    <ModuleProvider>
      <div className="item-model modules">{renderComp()}</div>
    </ModuleProvider>
  )
}

export default Modules
