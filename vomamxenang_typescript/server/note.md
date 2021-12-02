## Layout
  - file:///F:/Hochanh/Theme-Template/100-template-list-master/48%20Metronic-Frontend/theme/page-about.html
  
## start pm2
  - pm2 start npm --watch -- run prod_only_server -- (prod_only_server is script)


# heroku build
  - using PORT config by Heroku default
    + heroku plugins:install heroku-builds
    + heroku builds:cancel
    + heroku restart

  - heroku logs --tail