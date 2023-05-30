import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-web'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'

const Profile = () => {
    async function Sign_out(){
        await signOut(auth).then((e)=>{
          console.log("Sign out ")
        }).catch((e)=>{
          console.log(e)
        })
      }
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={Sign_out}>
        <Button variant='contained'>Sign Out</Button>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})