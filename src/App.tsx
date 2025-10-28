import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import DashboardLayout from './Pages/DashboardLayout';
import Dashboard from "@/Pages/DashBoard"

function App() {
  const isAuth = true
  return (
    <>
      <BrowserRouter>
        <Routes>
              <Route path='/' element={<Navigate to="/login" /> } />

          <Route path="/login" element={  <Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
        <Routes >
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

        </Routes>








      </BrowserRouter>
    </>
  )
}


export default App




