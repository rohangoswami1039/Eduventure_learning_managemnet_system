import React from 'react';
import { View, StyleSheet,} from 'react-native';
import WhiteBoard from './whiteboard';


const Online_classroom = (props) => {
  const class_created_by=props.route.params.class_created_by
  const class_name=props.route.params.class_name 
  const class_subject=props.route.params.class_subject  
  const class_code=props.route.params.classcode


  
  return (
<View style={styles.container}>
  <View style={styles.white_board}>
    <WhiteBoard class_created_by={class_created_by} class_name={class_name} class_code={class_code} class_subject={class_subject}/>    
  </View>
 
</View>
  )
}

export default Online_classroom
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  white_board:{
    flex:2
  },
  box:{
    width:100,
    height:100,
    backgroundColor:'red'
  }
 
});