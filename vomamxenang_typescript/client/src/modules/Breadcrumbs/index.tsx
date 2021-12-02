import React from 'react'

const Breadcrumbs = () => {
  return (
    <ul className="breadcrumb">
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">Pages</a>
      </li>
      <li className="active">Create new account</li>
    </ul>
  )
}

export default Breadcrumbs