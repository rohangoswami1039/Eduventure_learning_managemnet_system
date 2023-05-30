import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Assignment = (props) => {
  const classcode = props.route.params.classcode
  const class_name = props.route.params.class_name
  const class_created_by = props.route.params.calss_created_by
  const class_subject = props.route.params.class_subject
    useEffect(()=>{
        console.log("Assignment class code >>> ",classcode)
    })
  return (
    <View style={styles.Assignment_container}>
      <View style={styles.Assignment_list}>
        <Text>Assignment</Text>
      </View>
    </View>
  )
}

export default Assignment

const styles = StyleSheet.create({})