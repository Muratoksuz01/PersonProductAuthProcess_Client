import React from "react"
import SideBar from "@/components/SideBar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideBar />

      {/* İçerik alanı */}
      <main className="flex-1 p-4  transition-all">
        <Outlet />
      </main>
    </div>
  )
}
