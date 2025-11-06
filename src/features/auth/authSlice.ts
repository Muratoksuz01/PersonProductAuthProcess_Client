import { createSlice } from '@reduxjs/toolkit'
import { registerUser ,userLogin ,getCurrentUser,logout} from "./authActions"

interface UserInfo {
  id: string; // or number, based on your API
  name: string;
  surname: string;
  number: string;
  profileImg: string;
  isAdmin: boolean;
  // Add any other properties from your user object
}
interface AuthState {
  loading: boolean;
  userInfo: UserInfo | null; // This tells TypeScript it's either a UserInfo object OR null
  userToken: string | null;
  error: string | null;
  success: boolean;
}
const initialState: AuthState = {
    loading: false,
    userInfo: null, // ✅ Correct: The initial VALUE is null, but the TYPE is UserInfo | null
    userToken: null,
    error: null, // It's better to initialize string errors as null for easier checks
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
            })
            .addCase(registerUser.rejected, (state, { payload  }) => {
                state.loading = false
            })

            .addCase(userLogin.pending, state => {
                state.loading = true
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {                
                state.loading = false
                state.success = true
                state.userInfo = payload.user
                state.userToken = payload.token
                
            })
            .addCase(userLogin.rejected, (state, { payload  }) => {
                state.loading = false
            })
            .addCase(getCurrentUser.pending, state => {
                state.loading = true
            })
            .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
                state.userInfo= payload.data.user
                state.userToken=payload.data.token
            })
            .addCase(getCurrentUser.rejected, (state, { payload  }) => {
                state.loading = false
                state.userInfo=null
                state.userToken=null
            })
            .addCase(logout.fulfilled,(state)=>{
                state.loading = false
                state.userInfo=null
                state.userToken=null
            })
            /**
             *{
    "success": true,
    "message": null,
    "data": {
        "user": {
            "id": 10,
            "name": "murat",
            "surname": "öksüz",
            "number": "5555555555",
            "profileImg": "https://localhost:7000/uploads/NO_USER.png",
            "isAdmin": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTU1NTU1NTU1IiwianRpIjoiN2QzYWY5OWMtOTI5Mi00MzkzLWJkZjEtMTBlNGMzNzhiMGE4IiwiZXhwIjoxNzYyMzQ1NzkzfQ.cFPmu6bA95qWKrEQ_uqbMvkpqBQ4-ZLwIbQYrAb0hRE"
    }
}
             */
    }
})
export default authSlice.reducer