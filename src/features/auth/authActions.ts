import { createAsyncThunk } from '@reduxjs/toolkit'
import type { loginUserShemaForm, ServiceResponse, signUpUserShemaForm } from '@/Models/User'
import type z from 'zod'
import { axiosInstance } from '@/Request/axiosInstance'
import { API_PATH } from '@/Request/API_PATH'
import { toast } from 'sonner'
import { toastSuccessStyle, toastDestructiveStyle } from '@/lib/ToastStyles'
import axios from 'axios'


export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData: z.infer<typeof signUpUserShemaForm>, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
      const res = await axios.post<ServiceResponse>(
        API_PATH.signup,
        formData,
        config
      )
      if (res.data.success == true) {
        toast.success("Kayıt Başarılı! Giriş Yapabilirsiniz.", { style: toastSuccessStyle })
      }else{
        toast.success(res.data.message || "kayıt olurken hata alındı ", { style:  toastDestructiveStyle})
        return rejectWithValue(res.data.message)
      }
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userLogin = createAsyncThunk(
  'auth/login',
  async (formData: z.infer<typeof loginUserShemaForm>, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axiosInstance.post( // burada gelen verinin tipini kontrol et sonra set işlemine bak 
        API_PATH.login,
        formData,
        config
      )
      // store user's token in local storage
      console.log("glen data", data)
      if (!data.success) {
        toast.error(data.message, { style: toastDestructiveStyle })
        return rejectWithValue(data.message)
      }
     
      toast.success("Giriş Başarılı", { style: toastSuccessStyle })


      return data.data
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        toast.success("Giriş basarısız", { style: toastDestructiveStyle })

        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const getCurrentUser = createAsyncThunk(
  'auth/getcurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("userToken");
      if(!token)
        return rejectWithValue("token yok")
      const res = await axios.post(
        API_PATH.getCurrentUser,
        {}, // body boş
        {
          params: { token },
        }

      );
      if (res.data.success) {
        return res.data
      }
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.clear()
}
)