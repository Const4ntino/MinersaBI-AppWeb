import App from './App.tsx'
import { createBrowserRouter } from "react-router"
import Login from './pages/Auth/Login.tsx'
import Bi from './pages/Bi/Bi.tsx'

export const router = createBrowserRouter([
    // ruta índice (no necesita un path)
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Login },
            { path: "bi", Component: Bi}
        ]
    },
])