import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

const HelmetWrapper = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="keywords" content={props.keywords} />
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.site_name} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:secure_url" content={props.image} />
    </Helmet>
  )
}

export default HelmetWrapper
