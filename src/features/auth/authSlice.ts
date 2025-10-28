import { createSlice } from '@reduxjs/toolkit'
import { registerUser ,userLogin } from "./authActions"

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: false,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(registerUser.rejected, (state, { payload  }) => {
                state.loading = false
                state.error = false
            })

            .addCase(userLogin.pending, state => {
                state.loading = true
                state.error = false
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(userLogin.rejected, (state, { payload  }) => {
                state.loading = false
                state.error = false
            })
    }
})
export default authSlice.reducer