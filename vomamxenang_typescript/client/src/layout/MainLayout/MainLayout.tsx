import React, { FC } from 'react'

import Headers from 'layout/MainLayout/Headers/Headers'

const MainLayout: FC = ({ children }) => {
  return (
    <div className="main-layout-wrapper">
      <Headers />
      <div className="main">
        <div className="container">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
