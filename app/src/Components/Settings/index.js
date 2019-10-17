import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native"
import { ScrollView, TouchableOpacity, TextInput } from "react-native-gesture-handler";
import api from "../../Services/api";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socket from "../../Services/socket-io";
import Dialog from "react-native-dialog";
const Settings = function ({ SelectPlayer }) {
  const [players, setPlayers] = useState([])
  const [name, setName] = useState("")
  const [dialogVisible, setDialogVisible] = useState(false)
  const [startGameVisible, setStartGameVisible] = useState(true)
  useEffect(() => {
    const loadPlayer = async () => {
      const res = (await api.get("/availablePlayers")).data
      if (res !== undefined)
        setPlayers(res)
    }
    loadPlayer()
  }, [])

  socket.on("playerUpdate", (avPlayers) => {
    setPlayers(avPlayers)
  })
  return <View style={{ flex: 1 }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {startGameVisible && <TouchableOpacity key={-2}
        style={[styles.button, { backgroundColor: "#26c" }]}
        onPress={() => { setDialogVisible(true) }}>
        <Text>{"Start Game"}</Text>
      </TouchableOpacity>}
      <TouchableOpacity key={-1}
        style={[styles.button, { backgroundColor: "#26c" }]}
        onPress={() => { SelectPlayer(-1) }}>
        <Text>{"ME"}</Text>
      </TouchableOpacity>
      {players.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={styles.button}
          onPress={() => { SelectPlayer(p.id) }}>

          <Text>{p.name}</Text>
        </TouchableOpacity>))}
    </ScrollView>

    <Dialog.Container visible={dialogVisible}>
      <Dialog.Title>Insert Your Name</Dialog.Title>
      <TextInput style={{ backgroundColor: "#f4f4f4" }} onChangeText={setName} value={name}></TextInput>
      <Dialog.Button label="Cancel" onPress={() => { setDialogVisible(false) }} />
      <Dialog.Button label="Start" onPress={() => {
        socket.emit("startGame", {
          name,
          width: 10,
          height: 15,
          delay: 500,
        })
        setDialogVisible(false)
        setStartGameVisible(false)
      }} />
    </Dialog.Container>
  </View>

}
const styles = StyleSheet.create({
  button: {
    padding: 15,
    margin: 5,
    backgroundColor: "#ccc",
    borderRadius: 5
  }
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ SelectPlayer: (selectedPlayer) => ({ type: "SelectPlayer", selectedPlayer }) }, dispatch);
const mapStateToProps = store => ({
  selectedPlayer: store.selectedPlayer
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);