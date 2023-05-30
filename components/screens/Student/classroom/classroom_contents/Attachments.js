import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Image} from 'react-bootstrap'
import { Button } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Attachments = (props) => {
  console.log(props)
  const Attachment= props.route.params.attachment
  const edit_post = props.route.params.edit
  return (
    <>
    <View style={{width:'100%',height:'100%'}}>
      <Image src={Attachment}/> 
    </View> 
    {edit_post=='true' && <View style={{ position: 'fixed', bottom: '60px', right: '16px' }}>
        <TouchableOpacity>
          <View style={{backgroundColor:'white',borderRadius:'100%',padding:10}}>
            <MaterialCommunityIcons name="pencil" color={'#2196f3'} size={35}/>
          </View>
        </TouchableOpacity>
        </View>}
    </>
  )
}

export default Attachments

const styles = StyleSheet.create({})               