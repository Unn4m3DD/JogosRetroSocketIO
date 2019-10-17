/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';

import GameBoard from "./Components/GameBoard/index.js";
import GamePad from "./Components/GamePad/index.js";
import Settings from "./Components/Settings/index.js";
import { Store } from './Services/store.js';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Provider store={Store} >
          <GameBoard style={styles.gameboard} />
          <Settings style={styles.settings} />
          <GamePad style={styles.gamepad} />
        </Provider>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  gameboard: {
    flex: 4,
  },
  settings: {
    flex: 1
  },
  gamepad: {
    flex: 1
  },
});
export default App