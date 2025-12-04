import App from './App.tsx'
import { createBrowserRouter } from "react-router"
import Landing from './pages/Landing/Landing.tsx'
import Login from './pages/Auth/Login.tsx'
import Bi from './pages/Bi/Bi.tsx'

export const router = createBrowserRouter([
    // ruta índice (no necesita un path)
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Landing },
            { path: "login", Component: Login, },
            { path: "bi", Component: Bi}
        ]
    },
])