import * as React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";
import Store from "./App/Store/configureStore";
import { Provider } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import Navigator from "./App/Navigator";

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const App = () => {
  let persistor = persistStore(Store);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
