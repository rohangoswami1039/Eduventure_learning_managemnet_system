import React, { useRef, useState } from 'react';
import { Text } from 'react-native';
import { View, StyleSheet, PanResponder } from 'react-native';

const Video_feed = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const panResponderRef = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          setPosition({
            x: gesture.dx,
            y: gesture.dy,
          });
        },
      })
    ).current;
  return (
<View
    style={[styles.box, { transform: [{ translateX: position.x }, { translateY: position.y }] }]}
    {...panResponderRef.panHandlers}
  >
    <Text>Video feed</Text>
  </View>
);
  
}

export default Video_feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
      },
})