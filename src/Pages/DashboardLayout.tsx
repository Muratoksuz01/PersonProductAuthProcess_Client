import SideBar from "@/components/SideBar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <div className="w-56  h-screen  top-0 hidden md:block">
        <SideBar />
      </div>
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
