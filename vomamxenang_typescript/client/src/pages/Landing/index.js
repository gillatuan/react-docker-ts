import Breadcrumbs from 'modules/Breadcrumbs'
import React, { Fragment } from 'react'

const Landing = () => {
  return (
    <Fragment>
      <Breadcrumbs />
      <div className="row margin-bottom-40">
        <div className="col-md-12 col-sm-12">
          <h1>About Us</h1>
          <div className="content-page">
            <div className="row margin-bottom-30">
              <div className="col-md-7">
                <h2 className="no-top-space">Vero eos et accusamus</h2>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi.
                </p>
                <p>
                  Idest laborum et dolorum fuga. Et harum quidem rerum et quas
                  molestias excepturi sint occaecati facilis est et expedita
                  distinctio lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Ut non libero consectetur adipiscing elit magna. Sed et
                  quam lacus.
                </p>
                <div className="row front-lists-v1">
                  <div className="col-md-6">
                    <ul className="list-unstyled margin-bottom-20">
                      <li>
                        <i className="fa fa-check"></i> Officia deserunt molliti
                      </li>
                      <li>
                        <i className="fa fa-check"></i> Consectetur adipiscing{' '}
                      </li>
                      <li>
                        <i className="fa fa-check"></i> Deserunt fpicia
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li>
                        <i className="fa fa-check"></i> Officia deserunt molliti
                      </li>
                      <li>
                        <i className="fa fa-check"></i> Consectetur adipiscing{' '}
                      </li>
                      <li>
                        <i className="fa fa-check"></i> Deserunt fpicia
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-5 front-carousel">
                <div id="myCarousel" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="item active">
                      <img src="assets/pages/img/pics/img2-medium.jpg" alt="" />
                      <div className="carousel-caption">
                        <p>Excepturi sint occaecati cupiditate non provident</p>
                      </div>
                    </div>
                    <div className="item">
                      <img src="assets/pages/img/pics/img1-medium.jpg" alt="" />
                      <div className="carousel-caption">
                        <p>Ducimus qui blanditiis praesentium voluptatum</p>
                      </div>
                    </div>
                    <div className="item">
                      <img src="assets/pages/img/pics/img2-medium.jpg" alt="" />
                      <div className="carousel-caption">
                        <p>Ut non libero consectetur adipiscing elit magna</p>
                      </div>
                    </div>
                  </div>
                  <a
                    className="carousel-control left"
                    href="#myCarousel"
                    data-slide="prev"
                  >
                    <i className="fa fa-angle-left"></i>
                  </a>
                  <a
                    className="carousel-control right"
                    href="#myCarousel"
                    data-slide="next"
                  >
                    <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="row margin-bottom-40">
              <div className="col-md-7 testimonials-v1">
                <h2>Clients Testimonials</h2>
                <div id="myCarousel1" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="active item">
                      <blockquote>
                        <p>
                          Denim you probably haven't heard of. Lorem ipsum dolor
                          met consectetur adipisicing sit amet, consectetur
                          adipisicing elit, of them jean shorts sed magna
                          aliqua. Lorem ipsum dolor met consectetur adipisicing
                          sit amet do eiusmod dolore.
                        </p>
                      </blockquote>
                      <div className="carousel-info">
                        <img
                          className="pull-left"
                          src="assets/pages/img/people/img1-small.jpg"
                          alt=""
                        />
                        <div className="pull-left">
                          <span className="testimonials-name">Lina Mars</span>
                          <span className="testimonials-post">
                            Commercial Director
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <blockquote>
                        <p>
                          Raw denim you Mustache cliche tempor, williamsburg
                          carles vegan helvetica probably haven't heard of them
                          jean shorts austin. Nesciunt tofu stumptown aliqua,
                          retro synth master cleanse. Mustache cliche tempor,
                          williamsburg carles vegan helvetica.
                        </p>
                      </blockquote>
                      <div className="carousel-info">
                        <img
                          className="pull-left"
                          src="assets/pages/img/people/img5-small.jpg"
                          alt=""
                        />
                        <div className="pull-left">
                          <span className="testimonials-name">Kate Ford</span>
                          <span className="testimonials-post">
                            Commercial Director
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <blockquote>
                        <p>
                          Reprehenderit butcher stache cliche tempor,
                          williamsburg carles vegan helvetica.retro keffiyeh
                          dreamcatcher synth. Cosby sweater eu banh mi, qui
                          irure terry richardson ex squid Aliquip placeat salvia
                          cillum iphone.
                        </p>
                      </blockquote>
                      <div className="carousel-info">
                        <img
                          className="pull-left"
                          src="assets/pages/img/people/img2-small.jpg"
                          alt=""
                        />
                        <div className="pull-left">
                          <span className="testimonials-name">Jake Witson</span>
                          <span className="testimonials-post">
                            Commercial Director
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    className="left-btn"
                    href="#myCarousel1"
                    data-slide="prev"
                  ></a>
                  <a
                    className="right-btn"
                    href="#myCarousel1"
                    data-slide="next"
                  ></a>
                </div>
              </div>

              <div className="col-md-5 front-skills">
                <h2 className="block">Our Skills</h2>
                <span>UI Design 90%</span>
                <div className="progress">
                  <div
                    role="progressbar"
                    className="progress-bar"
                    style={{ width: '90%' }}
                  ></div>
                </div>
                <span>Wordpress CMS 60%</span>
                <div className="progress">
                  <div
                    role="progressbar"
                    className="progress-bar"
                    style={{ width: '60%' }}
                  ></div>
                </div>
                <span>HTML/CSS &amp; JavaScirp 75%</span>
                <div className="progress">
                  <div
                    role="progressbar"
                    className="progress-bar"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="row front-team">
              <ul className="list-unstyled">
                <li className="col-md-3">
                  <div className="thumbnail">
                    <img alt="" src="assets/pages/img/people/img1-large.jpg" />
                    <h3>
                      <strong>Lina Doe</strong>
                      <small>Chief Executive Officer / CEO</small>
                    </h3>
                    <p>
                      Donec id elit non mi porta gravida at eget metus. Fusce
                      dapibus, justo sit amet risus etiam porta sem...
                    </p>
                    <ul className="social-icons social-icons-color">
                      <li>
                        <a
                          className="facebook"
                          data-original-title="Facebook"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="twitter"
                          data-original-title="Twitter"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="googleplus"
                          data-original-title="Goole Plus"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="linkedin"
                          data-original-title="Linkedin"
                          href="javascript:;"
                        ></a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="col-md-3">
                  <div className="thumbnail">
                    <img alt="" src="assets/pages/img/people/img4-large.jpg" />
                    <h3>
                      <strong>Carles Puyol</strong>
                      <small>Chief Executive Officer / CEO</small>
                    </h3>
                    <p>
                      Donec id elit non mi porta gravida at eget metus. Fusce
                      dapibus, justo sit amet risus etiam porta sem...
                    </p>
                    <ul className="social-icons social-icons-color">
                      <li>
                        <a
                          className="facebook"
                          data-original-title="Facebook"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="twitter"
                          data-original-title="Twitter"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="googleplus"
                          data-original-title="Goole Plus"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="linkedin"
                          data-original-title="Linkedin"
                          href="javascript:;"
                        ></a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="col-md-3">
                  <div className="thumbnail">
                    <img alt="" src="assets/pages/img/people/img2-large.jpg" />
                    <h3>
                      <strong>Andres Iniesta</strong>
                      <small>Chief Executive Officer / CEO</small>
                    </h3>
                    <p>
                      Donec id elit non mi porta gravida at eget metus. Fusce
                      dapibus, justo sit amet risus etiam porta sem...
                    </p>
                    <ul className="social-icons social-icons-color">
                      <li>
                        <a
                          className="facebook"
                          data-original-title="Facebook"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="twitter"
                          data-original-title="Twitter"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="googleplus"
                          data-original-title="Goole Plus"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="linkedin"
                          data-original-title="Linkedin"
                          href="javascript:;"
                        ></a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="col-md-3">
                  <div className="thumbnail">
                    <img alt="" src="assets/pages/img/people/img5-large.jpg" />
                    <h3>
                      <strong>Jessica Alba</strong>
                      <small>Chief Executive Officer / CEO</small>
                    </h3>
                    <p>
                      Donec id elit non mi porta gravida at eget metus. Fusce
                      dapibus, justo sit amet risus etiam porta sem...
                    </p>
                    <ul className="social-icons social-icons-color">
                      <li>
                        <a
                          className="facebook"
                          data-original-title="Facebook"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="twitter"
                          data-original-title="Twitter"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="googleplus"
                          data-original-title="Goole Plus"
                          href="javascript:;"
                        ></a>
                      </li>
                      <li>
                        <a
                          className="linkedin"
                          data-original-title="Linkedin"
                          href="javascript:;"
                        ></a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Landing
