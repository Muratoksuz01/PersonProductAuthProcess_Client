import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { loginUserShemaForm, signUpUserShemaForm } from '@/Models/User'
import type z from 'zod'

const backendURL = 'http://127.0.0.1:5000'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData:z.infer<typeof signUpUserShemaForm>, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${backendURL}/api/user/register`,
        formData,
        config
      )
    } catch (error:any) {
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
  async (formData:z.infer<typeof loginUserShemaForm>, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/user/login`,
        formData,
        config
      )
      // store user's token in local storage
      localStorage.setItem('userToken', data.userToken)
      return data
    } catch (error:any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)