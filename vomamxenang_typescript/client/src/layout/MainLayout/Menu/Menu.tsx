import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className="header-navigation pull-right font-transform-inherit">
      <ul>
        <li className="dropdown">
          <a
            className="dropdown-toggle"
            data-toggle="dropdown"
            data-target="#"
            href=""
          >
            Home
          </a>

          <ul className="dropdown-menu">
            <li className="active">
              <a href="/">Home Default</a>
            </li>
            <li>
              <a href="index-header-fix.html">Home with Header Fixed</a>
            </li>
            <li>
              <a href="index-without-topbar.html">Home without Top Bar</a>
            </li>
          </ul>
        </li>

        <li className="dropdown">
          <a
            className="dropdown-toggle"
            data-toggle="dropdown"
            data-target="#"
            href=""
          >
            Pages
          </a>

          <ul className="dropdown-menu">
            <li>
              <a href="page-about.html">About Us</a>
            </li>
            <li>
              <a href="page-services.html">Services</a>
            </li>
            <li>
              <a href="page-prices.html">Prices</a>
            </li>
            <li>
              <a href="page-faq.html">FAQ</a>
            </li>
            <li>
              <a href="page-gallery.html">Gallery</a>
            </li>
            <li>
              <a href="page-search-result.html">Search Result</a>
            </li>
            <li>
              <a href="page-404.html">404</a>
            </li>
            <li>
              <a href="page-500.html">500</a>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a href="page-forgotton-password.html">Forget Password</a>
            </li>
            <li>
              <a href="/register">Signup Page</a>
            </li>
            <li>
              <a href="page-careers.html">Careers</a>
            </li>
            <li>
              <a href="page-site-map.html">Site Map</a>
            </li>
            <li>
              <a href="page-contacts.html">Contact</a>
            </li>
            <li>
              <Link to={"/admin/modules/edit/1"}>Modules</Link>
              {/* <a href="/admin/modules/">Contact</a> */}
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <a
            className="dropdown-toggle"
            data-toggle="dropdown"
            data-target="#"
            href=""
          >
            Multilevel
          </a>

          <ul className="dropdown-menu">
            <li className="dropdown-submenu">
              <a href="/">
                Multi level <i className="fa fa-angle-right"></i>
              </a>
              <ul className="dropdown-menu" role="menu">
                <li>
                  <a href="/">Second Level Link</a>
                </li>
                <li>
                  <a href="/">Second Level Link</a>
                </li>
                <li className="dropdown-submenu">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-target="#"
                    href=""
                  >
                    Second Level Link
                    <i className="fa fa-angle-right"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="/">Third Level Link</a>
                    </li>
                    <li>
                      <a href="/">Third Level Link</a>
                    </li>
                    <li>
                      <a href="/">Third Level Link</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <a
            className="dropdown-toggle"
            data-toggle="dropdown"
            data-target="#"
            href=""
          >
            Portfolio
          </a>

          <ul className="dropdown-menu">
            <li>
              <a href="portfolio-4.html">Portfolio 4</a>
            </li>
            <li>
              <a href="portfolio-3.html">Portfolio 3</a>
            </li>
            <li>
              <a href="portfolio-2.html">Portfolio 2</a>
            </li>
            <li>
              <a href="portfolio-item.html">Portfolio Item</a>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <a
            className="dropdown-toggle"
            data-toggle="dropdown"
            data-target="#"
            href=""
          >
            Blog
          </a>

          <ul className="dropdown-menu">
            <li>
              <a href="blog.html">Blog Page</a>
            </li>
            <li>
              <a href="blog-item.html">Blog Item</a>
            </li>
          </ul>
        </li>

        <li className="dropdown dropdown-megamenu">
          <a
            className="dropdown-toggle"
            data-toggle="dropdown"
            data-target="#"
            href=""
          >
            Mega Menu
          </a>
          <ul className="dropdown-menu">
            <li>
              <div className="header-navigation-content">
                <div className="row">
                  <div className="col-md-4 header-navigation-col">
                    <h4>Footwear</h4>
                    <ul>
                      <li>
                        <a href="/">Astro Trainers</a>
                      </li>
                      <li>
                        <a href="/">Basketball Shoes</a>
                      </li>
                      <li>
                        <a href="/">Boots</a>
                      </li>
                      <li>
                        <a href="/">Canvas Shoes</a>
                      </li>
                      <li>
                        <a href="/">Football Boots</a>
                      </li>
                      <li>
                        <a href="/">Golf Shoes</a>
                      </li>
                      <li>
                        <a href="/">Hi Tops</a>
                      </li>
                      <li>
                        <a href="/">Indoor Trainers</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 header-navigation-col">
                    <h4>Clothing</h4>
                    <ul>
                      <li>
                        <a href="/">Base Layer</a>
                      </li>
                      <li>
                        <a href="/">Character</a>
                      </li>
                      <li>
                        <a href="/">Chinos</a>
                      </li>
                      <li>
                        <a href="/">Combats</a>
                      </li>
                      <li>
                        <a href="/">Cricket Clothing</a>
                      </li>
                      <li>
                        <a href="/">Fleeces</a>
                      </li>
                      <li>
                        <a href="/">Gilets</a>
                      </li>
                      <li>
                        <a href="/">Golf Tops</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 header-navigation-col">
                    <h4>Accessories</h4>
                    <ul>
                      <li>
                        <a href="/">Belts</a>
                      </li>
                      <li>
                        <a href="/">Caps</a>
                      </li>
                      <li>
                        <a href="/">Gloves</a>
                      </li>
                    </ul>

                    <h4>Clearance</h4>
                    <ul>
                      <li>
                        <a href="/">Jackets</a>
                      </li>
                      <li>
                        <a href="/">Bottoms</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes&amp;utm_source=download&amp;utm_medium=banner&amp;utm_campaign=metronic_frontend_freebie"
            target="_blank"
          >
            Admin theme
          </a>
        </li>

        <li className="menu-search">
          <span className="sep"></span>
          <i className="fa fa-search search-btn"></i>
          <div className="search-box">
            <form action="#">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
                <span className="input-group-btn">
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </span>
              </div>
            </form>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Menu
