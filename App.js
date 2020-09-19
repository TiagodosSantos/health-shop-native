import React, { Fragment, useState, useEffect } from 'react';
import Feed from "./src/Views/Feed/Feed"
import Login from "./src/Views/Login/Login"
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from './src/store';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Spinner } from 'native-base';

const store = configureStore();
const persistor = persistStore(store);

const navigator = createStackNavigator({
  Login :{ screen: Login },
  Feed : { screen: Feed}
})

const AppContainer = createAppContainer(navigator)

const App = () => {

  const [loading, setLoading] = useState(true);

  const loadAsync = async (callback) => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    callback(false);
  }

  useEffect(() => {
    loadAsync(setLoading);
  }, []);
  
  return (
    loading ? <AppLoading /> : 
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <AppContainer/>
       </PersistGate>
    </Provider>
  )
};
export default App;
