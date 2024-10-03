import React, { useEffect } from "react";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../Components/Redux/Store";
import { useSelector } from "react-redux";
import RegistrationStackNavigator from "./stackNavigatorOnboarding/RouterOnboarding";
import { fetchLoginStatus } from "../Components/Redux/Login/LoginReducer";
import StackNavigatorAfterOnboarding from "./stackNavigatorAfterOnboarding/StackNavigatorAfterOnboarding";

const MainNavigator = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.login.loginUserType);
  useEffect(() => {
    dispatch(fetchLoginStatus());
  }, [dispatch]);
  if (user === null) {
    return <RegistrationStackNavigator />;
  } else {
    if (user === "User" || user === "Admin") {
      return <StackNavigatorAfterOnboarding />;
    }
  }
};

export default MainNavigator;
