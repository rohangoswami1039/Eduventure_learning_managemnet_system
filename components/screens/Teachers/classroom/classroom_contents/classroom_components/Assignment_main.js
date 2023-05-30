import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Assignment_main = (props) => {
    console.log(props)
    const Assignment_title =props.route.params.Assignment_title_
    const Assignment_desc =props.route.params.Assignment_description_
    const Assignment_created_at =props.route.params.created_at_

  return (
    <View>
      <Text>{Assignment_title}</Text>
      <Text>{Assignment_desc}</Text>
      <Text>{Assignment_created_at}</Text>
    </View>
  )
}

export default Assignment_main

const styles = StyleSheet.create({})