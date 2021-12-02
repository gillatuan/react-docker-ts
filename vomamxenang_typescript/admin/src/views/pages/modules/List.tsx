import { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
} from "@coreui/react"

import Modules from "services/apis/Modules"
import { PAGINATION } from "constants/index"
import AuthContext from "context/AuthContext"

const getBadge = (status: string) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['title', 'info', 'fileSrc', 'status', 'edit', 'delete']

const List = () => {
    const { setErrorMsg } = useContext(AuthContext)
    const history = useHistory()

    const [items, setItems] = useState([])
    const [, setPageCount] = useState(1)
    const [pageSelected, ] = useState(0)
    const [needToRerender, setNeedToRerender] = useState(false)

    useEffect(() => {
        return () => {
            setNeedToRerender(false)
        }
    }, [needToRerender])

    useEffect(() => {
        fetchItems()
    }, [pageSelected])

    const fetchItems = async () => {
        const itemService = new Modules()
        const url = `/api/modules/list`
        const dataPost = {
          limit: PAGINATION.DEFAULT_PAGE_SIZE,
          page: PAGINATION.DEFAULT_CURRENT_PAGE,
        }
        const resp = await itemService.getItems(url, dataPost)

        if (resp.items) {
            // set to state
            setItems(resp.items)
            setPageCount(Math.ceil(resp.total_count / resp.limit))

            return
        }
        if (resp.response) {
          setErrorMsg(resp.response.data.msg)
        }
    }

    const toggleStatus = async (id: string, status: number) => {
        let setStatus = 1
        if (status === 1) {
            setStatus = 2
        }

        const url = "/api/media/update-status"
        const itemService = new Modules()
        const resp = await itemService.updateStatus(url, { id, status: setStatus })

        // set to state
        setItems(resp.items.items)
        setNeedToRerender(true)
    }

    const editItem = (id: number) => {
        history.push(`/api/modules/edit-${id}`, { post_id: id })
    }

    const deleteItem = async (id: number) => {
        const url = "/api/media/update-status"
        const itemService = new Modules()
        const resp = await itemService.updateStatus(url, { id, deleted: 1 })

        // set to state
        setItems(resp.items.items)
        setNeedToRerender(true)
    }

    return (
        <div className="content">
            <CCol xs="12" lg="10">
                <CCard>
                    <CCardHeader>
                        <span>Danh sách Modules</span>
                        <Link to="/admin/modules/new">Tạo mới Modules</Link>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={items}
                            fields={fields}
                            striped
                            itemsPerPage={10}
                            pagination
                            scopedSlots={{
                                status: (item: any) => (
                                  <td>
                                      <CBadge
                                        color={getBadge(item.status)}
                                        onClick={() => toggleStatus(item._id, item.status)}
                                      >
                                        {item.status}
                                      </CBadge>
                                  </td>
                                ),
                                edit: (item: any) => {
                                  <td>
                                    <span onClick={() => editItem(item._id)}>
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </td>
                                },
                                delete: (item: any) => {
                                  <td>
                                    <span onClick={() => deleteItem(item._id)}>
                                      <i className="fa fa-pencil" />
                                    </span>
                                  </td>
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </div>
    )
}

export default List
