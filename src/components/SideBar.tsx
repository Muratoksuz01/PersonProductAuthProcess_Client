import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu, LogOut, Home, Settings, MessageCircle } from "lucide-react"

export default function SideBar() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { name: "Ana Sayfa", icon: <Home size={18} /> },
    { name: "Mesajlar", icon: <MessageCircle size={18} /> },
    { name: "Ayarlar", icon: <Settings size={18} /> },
  ]

  return (
    <div className="flex">
      {/* Menü butonu (mobil) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3 left-3 z-50"
      >
        <Menu />
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-56 bg-white border-r shadow-sm flex flex-col justify-between p-4 z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Üst kısım - kullanıcı */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            alt="User"
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-800">Murat Y.</span>
        </div>

        {/* Menü */}
        <nav className="flex flex-col mt-6 space-y-2">
          {menuItems.map((item, i) => (
            <Button
              key={i}
              variant="ghost"
              className="justify-start gap-2 text-gray-700 hover:bg-gray-100"
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </nav>

        {/* Alt kısım - logout */}
        <div>
          <Button
            variant="destructive"
            className="w-full justify-start gap-2"
          >
            <LogOut size={18} /> Çıkış Yap
          </Button>
        </div>
      </aside>

      {/* İçerik Alanı */}
     
    </div>
  )
}
