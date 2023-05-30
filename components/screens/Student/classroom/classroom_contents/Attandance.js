import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Attandance = (props) => {
    const classcode = props.route.params.classcode
    const class_name = props.route.params.classname
    const class_created_by = props.route.params.created_by
    const class_subject = props.route.params.subject
  return (
    <View>
      <Text>Attandance</Text>
    </View>
  )
}

export default Attandance

const styles = StyleSheet.create({})