import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations"

const initialState = {
  user: {
    name: "",
    email: "",
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
}

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.user = payload
        state.isLoggedIn = true
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, { payload }) => {
          state.user = payload.user
          state.isLoggedIn = true
          state.token = payload.token
        }
      )
  },
  selectors: {
    selectUser: state => state.user,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsLoading: state => state.isLoading,
    selectToken: state => state.token,
  },
})

export const authReducer = slice.reducer
export const {
  selectUser,
  selectIsLoggedIn,
  selectIsLoading,
  selectToken,
} = slice.selectors