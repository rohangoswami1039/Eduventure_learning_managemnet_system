import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

//import screens 
import Add from './Add'
import Profile from './Profile'
import Dashboard  from './Dashboard'

// Material Community Icons 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const home = () => {
  const Tab=createMaterialBottomTabNavigator();
  
  return (
    <>
    <Tab.Navigator initialRouteName='Dashboard' barStyle={{backgroundColor:'#FAF9F6'}} labeled={false} activeColor='black' inactiveColor='gray'>
            <Tab.Screen name="Dashboard" component={Dashboard} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
            }}/>
           
            <Tab.Screen name="Add" component={Add} 
             options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="account-multiple-plus" color={color} size={26}/>
                    ),
            }}/>

            <Tab.Screen name="Profile" component={Profile} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
            }}/>    
      </Tab.Navigator>
    <View>
  </View>
</>
)}

export default home

const styles = StyleSheet.create({})