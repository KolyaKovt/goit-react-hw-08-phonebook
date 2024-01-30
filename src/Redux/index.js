import { configureStore } from "@reduxjs/toolkit"
import { contactsReducer } from "./contacts/slice"
import { filterReducer } from "./filter/slice"
import { authReducer } from "./auth/slice"

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
    filter: filterReducer,
  },
})
