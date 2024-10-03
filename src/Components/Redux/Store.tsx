import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginReducer from "./Login/LoginReducer";
import HotelReducer from "./Hotel/HotelReducer";
import fetchSavedHotelListReducer from "./Hotel/HotelLocalReducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    hotelReducer: HotelReducer,
    savedHotelReducer: fetchSavedHotelListReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
