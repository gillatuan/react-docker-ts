import React from "react"

// My pages
const Modules = React.lazy(() => import("./views/pages/modules"))

const myRoutes = [
    // My routes
    { path: "/admin/modules/:action", name: "Modules Page", component: Modules },
]

export default myRoutes
