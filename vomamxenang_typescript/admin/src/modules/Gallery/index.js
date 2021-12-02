import { Fragment, useContext, useEffect, useState } from "react"

import CIcon from '@coreui/icons-react'
import { cilCheckCircle } from '@coreui/icons'

import ReactPaginate from "react-paginate"
import { Row, Col, Image } from "react-bootstrap"
import classNames from "classnames"

import { getListMedia } from "redux/actions/media"

import AuthContext from 'context/AuthContext'

import { PAGINATION } from 'constants/index'
import { handleResponse } from 'utils/Utils'
import "./style.scss"

const Gallery = (props) => {
  const { setErrorMsg, setLoading } = useContext(AuthContext)

  const [items, setItems] = useState(props.mediaList || [])
  const [pageCount, setPageCount] = useState(0)
  const { selectedMedia, onSelectMedia } = props

  useEffect(() => {
    if (props.updatedList) {
      fetchList()
    }
  }, [props.updatedList])
  const fetchList = async () => {
    setLoading(true)
    const dataPost = {
      limit: PAGINATION.DEFAULT_PAGE_SIZE,
      page: PAGINATION.DEFAULT_CURRENT_PAGE,
    }
    const resp = await getListMedia(dataPost)
    handleResponse(resp, setItems, setPageCount, setErrorMsg, setLoading)
  }

  const handlePageClick = async (pageSelected) => {
    const dataPost = {
      limit: PAGINATION.DEFAULT_PAGE_SIZE,
      page: pageSelected + 1,
    }
    const resp = await getListMedia(dataPost)
    handleResponse(resp, setItems, setPageCount, setErrorMsg, setLoading)
  }

  const renderNoItem = () => {
    return <Col sm={12}>No Items</Col>
  }

  const renderListItems = () => {
    return items.map((media, index) => {
      return (
        <Col key={index} sm={6} md={3}>
          <Image src={media.filename} alt={media.filename} rounded />
          <CIcon className={classNames({
              active: media.filename === selectedMedia,
              "media-check-icon": true,
            })} content={cilCheckCircle} size="2xl" onClick={() => onSelectMedia(index, media.filename)} />
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Row className="gallery show-grid">
        {props.heading}
        {items && items.length > 0 && renderListItems()}

        {items && items.length === 0 && renderNoItem()}
      </Row>

      <Row className="paging">
        <Col sm={12}>
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={(page) => handlePageClick(page.selected)}
              containerClassName={"pagination pull-right"}
              activeClassName={"active"}
            />
          )}
          </Col>
      </Row>
    </Fragment>
  )
}

export default Gallery
