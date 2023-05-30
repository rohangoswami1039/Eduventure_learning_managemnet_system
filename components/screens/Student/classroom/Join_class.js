import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { ActivityIndicator } from 'react-native-web'
import { useClassroom } from '../../../context/Classroom_context'
import {Form} from 'react-bootstrap';

const Join_class = () => {
  const {join_classroom}=useClassroom()
  const [classcode,set_classcode]=useState()
  const [loading,set_loading]=useState(false)

  const submit_button=(e)=>{
    e.preventDefault()
    join_classroom(classcode)
    
  }
  return (
    <View style={styles.Main_input}>
      <View style={styles.login_form }>.
      <View style={styles.inputContainer}>
        <Form onSubmit={submit_button}>
        <TextField  style={styles.input} id="standard-basic" onChange={(e)=>{set_classcode(e.target.value)}} label="Subject Code" variant="standard" required />      
      <TouchableOpacity>
            <Button type='submit' disabled={loading} style={styles.create_class}  variant='contained'>{loading?<ActivityIndicator size="small" />:"Join"}</Button>
      </TouchableOpacity>
        </Form>
      </View>     
      </View>
    </View>
  )
}

export default Join_class

const styles = StyleSheet.create({
  Main_input:{
    flex:1,
    minHeight:'100vh',
    },
  input:{
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:15,
    marginTop:20,
    width:'100%',
  },
  inputContainer:{
    width:'80%'
  },
  login_form:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    width:'100%',
    maxWidth:"480px",
    borderRadius:'25px'
  },
  create_class:{   
      marginTop:20,
      marginBottom:5,         
    }
})