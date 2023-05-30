import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//imports for the screens 
import Attendance from './classroom_contents/Attendance'
import Post from './classroom_contents/Post'
import Assignment from './classroom_contents/Assignment'
import Online_classroom from './classroom_contents/online_classroom/Online_classroom'

const Teacher_Classroom_page = (props) => {

    const Tab = createMaterialBottomTabNavigator();

    const class_code = props.route.params.code
    const class_name = props.route.params.classname
    const class_created_by = props.route.params.created_by
    const class_subject = props.route.params.subject
   

  return (
    <>
    <Tab.Navigator initialRouteName='Post' barStyle={{backgroundColor:'#e0f7fa'}}  activeColor='#1e88e5' inactiveColor='#757575'>
        <Tab.Screen name="Assignment" component={Assignment} initialParams={{classcode:class_code,class_name:class_name,class_created_by:class_created_by,class_subject:class_subject}}
        options={{
            tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="clipboard-text" color={color} size={26}/>
                ),
        }}
        />

        <Tab.Screen name="Post" component={Post} initialParams={{classcode:class_code,class_name:class_name,class_created_by:class_created_by,class_subject:class_subject}}
        options={{
            tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="pencil-box-multiple" color={color} size={26}/>
                ),
        }}
        />
        <Tab.Screen name="Attendance" component={Attendance} initialParams={{classcode:class_code,class_name:class_name,class_created_by:class_created_by,class_subject:class_subject}}
        options={{
            tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="account-multiple-check" color={color} size={26}/>
                ),
        }}
        />
        <Tab.Screen name="Live class" component={Online_classroom} initialParams={{classcode:class_code,class_name:class_name,class_created_by:class_created_by,class_subject:class_subject}}
        options={{
            tabBarIcon:({color,size})=>(
                <MaterialCommunityIcons name="video" color={color} size={26}/>
                ),
        }}
        />
        
    </Tab.Navigator>
   </>
  )
}

export default Teacher_Classroom_page

const styles = StyleSheet.create({})