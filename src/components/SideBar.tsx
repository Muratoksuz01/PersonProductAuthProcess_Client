import { Home, LogOut, Users } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { logout } from "@/features/auth/authActions";
import { API_PATH } from "@/Request/API_PATH";

export default function SideBar() {
  const dispatch = useDispatch<AppDispatch>()
  const counter = useSelector((state: RootState) => state.auth) //   burada user gelen beriler var



  return (
    <div className="h-full bg-white border-r shadow-sm  flex-col items-center p-4 fixed w-56 hidden md:flex">
      {/* Üst kısım */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src={API_PATH.getImage(counter.userInfo?.profileImg || "")}
          alt="User"
          className="w-16 h-16 rounded-full object-cover"
        />
        <span className="font-semibold text-gray-800">
          {counter.userInfo && `${counter.userInfo.name} ${counter.userInfo.surname}`}
        </span>
        <p>{counter.userInfo?.isAdmin ? "yetkili" : "misafir"}</p>
      </div>

      {/* Menü */}
      <div className="flex flex-col flex-1 justify-center space-y-2 w-full">
        <NavLink to="/dashboard" className="w-full">
          <Button className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-100">
            <Home size={18} />
            Anasayfa
          </Button>
        </NavLink>

        {counter.userInfo?.isAdmin && (
          <NavLink to="/dashboard/person" className="w-full">
            <Button className="w-full justify-start gap-2 text-gray-700 hover:bg-gray-100">
              <Users size={18} />
              Kişiler
            </Button>
          </NavLink>
        )}
      </div>

      {/* Logout */}
      <Button
        className="w-full justify-start gap-2 mt-auto"
        onClick={() => {
          dispatch(logout())
        }}
      >
        <LogOut size={18} /> Çıkış Yap
      </Button>
    </div>

  );
}
