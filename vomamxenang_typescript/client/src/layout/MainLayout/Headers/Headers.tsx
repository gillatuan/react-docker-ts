import React, { FC, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Menu from 'layout/MainLayout/Menu/Menu'

const Headers: FC = () => {
  return (
    <Fragment>
      <div className="pre-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 additional-shop-info">
              <ul className="list-unstyled list-inline">
                <li>
                  <i className="fa fa-phone" />
                  <span>+1 456 6717</span>
                </li>
                <li>
                  <i className="fa fa-envelope-o"></i>
                  <span>info@keenthemes.com</span>
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-sm-6 additional-nav">
              <ul className="list-unstyled list-inline pull-right">
                <li>
                  <Link to="/login" title="Login" />
                </li>
                <li>
                  <Link to="/register" title="Registration" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container">
          <a className="site-logo" href="/">
            <img
              src="assets/corporate/img/logos/logo-corp-red.png"
              alt="Metronic FrontEnd"
            />
          </a>

          <a href="#" className="mobi-toggler">
            <i className="fa fa-bars"></i>
          </a>

          <Menu />
        </div>
      </div>
    </Fragment>
  )
}

export default Headers
