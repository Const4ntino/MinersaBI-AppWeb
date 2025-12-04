import { NavLink } from "react-router";

export default function Landing() {
  return (
    <div>
      <NavLink to="login" className="text-blue-100">
        Login
      </NavLink>
      <h1 className="text-3xl font-bold">Minersa</h1>
    </div>
  )
}
