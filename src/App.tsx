import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import DashboardLayout from './Pages/DashboardLayout';
import Dashboard from "@/Pages/DashBoard";
import Person from "@/Pages/Person";
import DetailProduct from './Pages/DetailProduct';
import PersonDetail from './Pages/PersonDetail';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './app/store';
import NoAuth from './Pages/NoAuth';
import { getCurrentUser } from './features/auth/authActions';

function App() {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    console.log("app.tsx useeffect calişti")
    dispatch(getCurrentUser())
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to={auth.userInfo ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={auth.userInfo ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={auth.userInfo ? <Navigate to="/dashboard" /> : <SignUp />} />

        <Route
          path="/dashboard/*"
          element={auth.userInfo ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="product/:id" element={<DetailProduct />} />
          {auth.userInfo?.isAdmin &&
            <>
              <Route path="person" element={<Person />} />
              <Route path="person/:id" element={<PersonDetail />} />
            </>
          }
        </Route>
        <Route path="/*"  element={<NoAuth />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
