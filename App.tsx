import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/Components/Redux/Store";
import MainNavigator from "./src/router/MainNavigator";

function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

export default App;
