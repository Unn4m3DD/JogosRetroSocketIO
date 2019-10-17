import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native"
import socket from "./../../Services/socket-io"
import { connect } from 'react-redux';
const GameBoard = function ({ selectedPlayer }) {
  const [gameboard, setGameboard] = useState([[]])

  useEffect(() => {
    socket.removeAllListeners()
    socket.on(`update${selectedPlayer}`, ({ board }) => {
      setGameboard(board)
    })
  }, [selectedPlayer])
  return <View style={styles.container}>
    <View style={styles.board}>
      {gameboard.map((column, index) =>
        <View key={index} style={styles.column}>
          {column.map((cell, index2) =>
            <View key={index + "" + index2}
              style={[styles.cell, {
                backgroundColor:
                  cell == 1 ? "#1b4" :
                    cell == 3 ? "#284" :
                      cell == 2 ? "#a22" :
                        "#ddd"
              }]}>

            </View>)}
        </View>
      )}
    </View>
  </View>
}
const styles = StyleSheet.create({
  cell: {
    width: 12,
    height: 12,
    margin: 2
  },
  board: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  container: {
    flex: 4,
    alignItems: "center",
  },
  row: {
    flexDirection: "column"
  }
})
const mapStateToProps = store => ({
  selectedPlayer: store.selectedPlayer
});
export default connect(mapStateToProps)(GameBoard);