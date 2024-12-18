import { Navigate, Outlet } from "react-router-dom"
import { getUser } from "@/lib/network/authServices"

export default function RequireAuth() {
  const user = getUser()
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
