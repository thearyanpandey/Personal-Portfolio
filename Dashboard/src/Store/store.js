import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotPasswordReducer from "./slices/forgotPasswordResetSlice";
import projectSliceReducer from './slices/projectSlice'
import skillSliceReducer from './slices/skillSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    project: projectSliceReducer,
    skill: skillSliceReducer,
  },
});