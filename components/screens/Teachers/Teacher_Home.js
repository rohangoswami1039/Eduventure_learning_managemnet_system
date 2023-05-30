import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//imports of the screens 
import Teacher_Classroom from './classroom/Teacher_Classroom'
import Teacher_Dashboard from './Teacher_Dashboard'
import Teacher_profile from './Settings/Teacher_profile'
import Teacher_setings from './Settings/Teacher_setings'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

// Material Community Icons 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Teacher_Home = () => {
  const Tab=createMaterialBottomTabNavigator();
/*
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'
import { TouchableOpacity } from 'react-native-web'
import AsyncStorage from '@react-native-async-storage/async-storage'


  async function Sign_out(){
    await  AsyncStorage.removeItem("user_type")
    console.log("User Type deleted")
    await signOut(auth).then((e)=>{
      console.log("Sign out ")
    }).catch((e)=>{
      console.log(e)
    })
  }
*/
  return (
    <>
        <Tab.Navigator initialRouteName='Teacher_Classroom' barStyle={{backgroundColor:'#e0f7fa'}} labeled={false} activeColor='#1e88e5' inactiveColor='#757575'>
            <Tab.Screen name="Teacher_Classroom" component={Teacher_Classroom} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="book-variant" color={color} size={26}/>
                    ),
            }}/>
           
            <Tab.Screen name="Teacher_Dashboard" component={Teacher_Dashboard} 
             options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
            }}/>

            <Tab.Screen name="Teacher_Profile" component={Teacher_setings} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
            }}/>    
      </Tab.Navigator>
    </>
    
  )
}

export default Teacher_Home

const styles = StyleSheet.create({})