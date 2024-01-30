import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { loginThunk, logoutThunk, registerThunk } from "./operations"

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
  },
})

export const authReducer = slice.reducer
export const { selectUser, selectIsLoggedIn, selectIsLoading } = slice.selectors
