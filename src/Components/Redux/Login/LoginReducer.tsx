export type UserType = "User" | "Admin" | null;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface LoginInterfaceStyle {
  loginUserType: UserType;
}

const initialState: LoginInterfaceStyle = {
  loginUserType: null,
};

export const fetchLoginStatus = createAsyncThunk<
  UserType,
  void,
  { rejectValue: string }
>("fetchLoginStatus", async (_, thunkAPI) => {
  try {
    const storedTasks = await AsyncStorage.getItem("type");
    if (storedTasks === "Admin") {
      return "Admin";
    } else if (storedTasks === "User") {
      return "User";
    }
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
  }
});

export const saveLoginStatus = createAsyncThunk(
  "saveLoginStatus",
  async (userType: UserType, thunkAPI) => {
    try {
      if (userType === "Admin" || userType === "User") {
        await AsyncStorage.setItem("type", userType);
        return userType;
      }
      return userType;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch hotel list.");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginStatus.pending, (state) => {
        state.loginUserType = null;
      })
      .addCase(fetchLoginStatus.fulfilled, (state, action) => {
        state.loginUserType = action.payload;
      })
      .addCase(fetchLoginStatus.rejected, (state, action) => {
        state.loginUserType = null;
      })
      .addCase(saveLoginStatus.pending, (state) => {
        state.loginUserType = null;
      })
      .addCase(saveLoginStatus.fulfilled, (state, action) => {
        state.loginUserType = action.payload;
      })
      .addCase(saveLoginStatus.rejected, (state) => { state.loginUserType = null })
  },
});

export default loginSlice.reducer;
