import { Outlet } from "react-router"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (

    <>
      <main className="flex flex-col gap-5 items-center justify-center min-h-screen dark:bg-gray-900 relative">
        <Outlet />
        <ToastContainer />
      </main>
    </>
  )
}

export default App