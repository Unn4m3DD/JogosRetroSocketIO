import React from "react";
import { View, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import socket from './../../Services/socket-io'
const GamePad = function () {
  return <View style={styles.container}>
    {["◀", "▲", "▼", "▶"].map((item, index) =>
      <TouchableOpacity key={item} style={styles.button}
        onPress={() => {
          if (item === "◀") socket.emit("left")
          if (item === "▲") socket.emit("up")
          if (item === "▼") socket.emit("down")
          if (item === "▶") socket.emit("right")
        }}>
        <Text style={styles.text}>
          {item}
        </Text>
      </TouchableOpacity>
    )}
  </View>

}
const styles = StyleSheet.create({
  button: { flex: 1 },
  text: {
    fontSize: 60
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
})

export default GamePad