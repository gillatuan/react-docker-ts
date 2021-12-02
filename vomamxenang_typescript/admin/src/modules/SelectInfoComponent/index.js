import { useContext, useEffect, useState } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import classNames from 'classnames'

import AuthContext from 'context/AuthContext'
import { getPosts } from 'redux/actions/postsAction'

import * as SETTING from 'config/setting.json'
import { PAGINATION } from 'constants/index'
import { handleResponse } from 'utils/Utils'

import 'modules/SelectInfoComponent/style.css'

const SelectInfoComponent = (props) => {
  const { setErrorMsg, setLoading } = useContext(AuthContext)

  const [, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [selectedItems, ] = useState(props.selectedItems)

  useEffect(() => {
    if (props.updatedList) {
      fetchList()
    }
  }, [props.updatedList])
  
  const fetchList = async () => {
    const dataPost = {
      limit: PAGINATION.DEFAULT_PAGE_SIZE,
      page: PAGINATION.DEFAULT_CURRENT_PAGE,
    }
    const resp = await getPosts(dataPost)
    handleResponse(resp, setItems, setPageCount, setErrorMsg, setLoading)
  }

  const handlePageClick = async (pageSelected) => {
    const dataPost = {
      limit: PAGINATION.DEFAULT_PAGE_SIZE,
      page: pageSelected + 1,
    }
    const resp = await getPosts(dataPost)
    handleResponse(resp, setItems, setPageCount, setErrorMsg, setLoading)
  }

  const handleSelectInfo = (item) => {
    const { selectedPosts } = props
    let selectedPostsIndex = selectedPosts
    let selectedIndex = null

    let isItemExisted = false
    selectedPosts.map((selectedPost, index) => {
      if (selectedPost._id === item._id) {
        selectedIndex = index
        return (isItemExisted = true)
      }

      return false
    })

    if (!isItemExisted) {
      selectedPostsIndex = [...selectedPostsIndex, item]
    } else {
      selectedPostsIndex.splice(selectedIndex, 1)
    }

    props.selectItems(selectedPostsIndex)
  }

  return (
    <Row className="info-comp show-grid">
      {selectedItems.items &&
        selectedItems.items.map((item, index) => {
          let active = false
          selectedItems.map((selectedPost) => {
            if (selectedPost._id === item._id) {
              return (active = true)
            }

            return false
          })

          return (
            <Col key={index} className="item" sm={6} md={3}>
              <Image
                src={SETTING.BASE_URL + '/images/uploads/' + item.fileSrc}
                alt={item.fileSrc}
                rounded
                style={{ height: 100, width: 100 }}
              />
              <i
                className={classNames({
                  active,
                  'glyphicon glyphicon-ok-circle': true,
                })}
                onClick={() => handleSelectInfo(item)}
              />
              <p>{item.title}</p>
            </Col>
          )
        })}

      <div className="clearfix" />
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={(page) => handlePageClick(page.selected)}
          containerClassName={'pagination pull-right'}
          activeClassName={'active'}
        />
      )}
    </Row>
  )
}

export default SelectInfoComponent
