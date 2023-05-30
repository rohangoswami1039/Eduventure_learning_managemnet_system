import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'
import { TouchableOpacity } from 'react-native-web'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

//import screens 
import Student_Classroom from './classroom/Student_Classroom'
import Student_Dashboard from './Student_Dashboard'
import Student_Profile from './settings/Student_Profile'
import Student_settings from './settings/Student_settings'


// Material Community Icons 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Student_Home= () => {
  
  const Tab=createMaterialBottomTabNavigator();
 
  async function Sign_out(){
    await signOut(auth).then((e)=>{
      console.log("Sign out ")
    }).catch((e)=>{
      console.log(e)
    })
  }
 
  return (
    <>
      <Tab.Navigator initialRouteName='Student_Classroom' barStyle={{backgroundColor:'#e0f7fa'}} labeled={false} activeColor='#1e88e5' inactiveColor='#757575'>
            <Tab.Screen name="Student_Classroom" component={Student_Classroom} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="book-variant" color={color} size={26}/>
                    ),
            }}/>
           
            <Tab.Screen name="Student_Dashboard" component={Student_Dashboard} 
             options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
            }}/>

            <Tab.Screen name="Student_settings" component={Student_settings} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
            }}/>    
      </Tab.Navigator>
    </>
  )
}

export default Student_Home

const styles = StyleSheet.create({})