import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { ActivityIndicator } from 'react-native-web'
import { useClassroom } from '../../../context/Classroom_context'
import {Form} from 'react-bootstrap';

//redux imports 
import { connect, Connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../../redux/actions/index'

const Create_classroom = (props) => {
    useEffect(()=>{
      console.log
      props.fetchUser()
    },[])

    const {create_classroom}=useClassroom()
    const [classname,set_classname]=useState()
    const [subject,set_subject]=useState()
    const [loading,set_loading]=useState(false)

    const submit_button=(e)=>{
      e.preventDefault()
      create_classroom(classname,subject)
    }
  return (
    <View style={styles.Main_input}>
      <View style={styles.login_form }>.
      <View style={styles.inputContainer}>
        <Form onSubmit={submit_button}>
        <TextField  style={styles.input} id="standard-basic" onChange={(e)=>{set_classname(e.target.value)}} label="Subject Name" variant="standard" required />
        <TextField  style={styles.input} id="standard-basic" onChange={(e)=>{set_subject(e.target.value)}} label="Class Name " variant="standard" required />
      
      <TouchableOpacity>
            <Button type='submit' disabled={loading} style={styles.create_class}  variant='contained'>{loading?<ActivityIndicator size="small" />:"Crate"}</Button>
        </TouchableOpacity>
        </Form>
      </View>     
      </View>
    </View>
  )
}

const mapDispatchProps = (dispatch)=>bindActionCreators({fetchUser},dispatch)

export default connect(null,mapDispatchProps)(Create_classroom)

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