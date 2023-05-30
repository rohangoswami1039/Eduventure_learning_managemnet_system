import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Button, Platform, PanResponder } from 'react-native';
import { database } from '../../../../../../firebase';
import { onValue, ref, set } from 'firebase/database';

const WhiteBoard = (props) => {
  const class_code=props.class_code
  const class_created_by=props.class_created_by
  const class_name=props.class_name
  const class_subject=props.class_subject



  const sketchRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color,set_color]=useState('#000000')
  const [paths, setPaths] = useState([]);
  const isWeb = Platform.OS === 'web';
  const prevPath = useRef(null)
  const databaseRef = useRef(null);

  const handleTouchMove = (event) => {
    if (!drawing) return;
    const { pageX, pageY } = event.nativeEvent.touches[0];
    const startPoint = prevPath.current || { x: pageX, y: pageY };
    const newPaths = interpolatePath(startPoint, { x: pageX, y: pageY });
    const updatedPaths = [...paths, ...newPaths];
    setPaths(updatedPaths);
    prevPath.current = { x: pageX, y: pageY };

    // Update the paths in the Firebase database
    set(ref(database, 'classroom/'+class_code), updatedPaths);
  };
  
  
  
  const interpolatePath = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const segments = Math.ceil(distance / 1); // Increase or decrease the segment length as desired
    const t = 1 / segments;
    const stepX = dx * t;
    const stepY = dy * t;
    const curve = [{ ...start }];
  
    for (let i = 1; i < segments; i++) {
      const cx = start.x + i * stepX;
      const cy = start.y + i * stepY;
      curve.push({
        x: cx,
        y: cy,
        color: color,
        thickness: 3,
        cp1x: cx - stepY,
        cp1y: cy + stepX,
        cp2x: cx + stepY,
        cp2y: cy - stepX,
      });
    }
  
    curve.push({
      ...end,
      color: color,
      thickness: 3,
    });
  
    return curve;
  };

  const handleTouchEnd = () => {
    prevPath.current=null
    setDrawing(false);
  };

  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setDrawing(true);
    },
    onPanResponderMove: (event) => {
      handleTouchMove(event,prevPath.current);
    },
    onPanResponderRelease: () => {
      handleTouchEnd();
    },
  });

  const handleClear = () => {
    setPaths([]);
    set(ref(database, 'classroom/'+class_code), []);
  };

  useEffect(() => {
    databaseRef.current = ref(database, 'classroom/'+class_code);
    onValue(databaseRef.current, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPaths(data);
      }
    });
    return () => {
      if (databaseRef.current) {
        databaseRef.current.off();
      }
    };
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer} {...(isWeb ? panResponder.panHandlers : {})}>
        <View style={styles.canvas} ref={sketchRef}>
          <View style={styles.drawingContainer}>
            {paths.map((path, index) => (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: path.x,
                  top: path.y,
                  backgroundColor: path.color,
                  width: path.thickness,
                  height: path.thickness,
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={handleClear} />
      </View>
    </View>
  );
};

export default WhiteBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
 
},
canvasContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
},
canvas: {
    flex: 1,
},
buttonContainer: {
    marginVertical: 10,
},
}); 