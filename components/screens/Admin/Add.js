import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Form } from 'react-bootstrap'
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native-web'
import { useAdmin } from '../../context/admin_context'
import Chip from '@mui/material/Chip';

import Switch from '@mui/material/Switch';

const Add = () => {
  const [name,setname]=useState('')
  const [email,setEmail]=useState('')
  const {register_user,loading}=useAdmin()
  const [user_uid,setuser_uid]=useState('')
  const [branch,setbranch]=useState('')
  const [user_type,setuser_type]=useState('')
  const [user_type_select,set_user_type_select]=useState(true)
  const [branch_select,setbranch_select]=useState(true)

  
  const handleChange = (event: SelectChangeEvent) => {
    set_user_type_select(false)
    setuser_type(event.target.value )
  };
  const handleChange_branch = (event: SelectChangeEvent)=>{
    setbranch_select(false)
    setbranch(event.target.value )
  }
  
  
  function handleSubmit(e){
    e.preventDefault()
    try {
      register_user(email,name,user_type,user_uid,branch)
    }
    catch {
      console.log("Error in uploading the user data ")
      setEmail('')
      setPassword('')
      setuser_uid('')
      window.alert("Error in uploading the user's data ")
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.login}>
    <View style={styles.inputContainer}>
      <Form onSubmit={handleSubmit}>
        <TextField  style={styles.input} label="Name" variant="standard" onChange={(e)=>{setname(e.target.value)}} required/>
        <TextField  style={styles.input} label="Email" variant="standard" onChange={(e)=>{setEmail(e.target.value)}} required/>
        <View style={styles.select_user}>
        <FormControl style={{width:'125px',}}>
                    <InputLabel id="demo-simple-select-label">User</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user_type}
                    label="User"
                    onChange={handleChange}
                    >
                    <MenuItem value={"Teacher"}>Teacher</MenuItem>
                    <MenuItem value={"Student"}>Student</MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>

                    </Select>
          </FormControl>
          { user_type=="Student" && 
            <FormControl style={{width:'125px',}}>
            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            label="User"
            onChange={handleChange_branch}
            >
            <MenuItem value={"Mechanical Engineering"}>M.E</MenuItem>
            <MenuItem value={"Computer Science Engineering"}>C.S.E</MenuItem>
            <MenuItem value={"Civil Engineering"}>C.E</MenuItem>
            <MenuItem value={"Electronics and Comunication Engineering "}>E.C.E</MenuItem>
            </Select>
            </FormControl>
          }
          { user_type=="Teacher" && 
            <FormControl style={{width:'125px',}}>
            <InputLabel id="demo-simple-select-label">Branch</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            label="User"
            onChange={handleChange_branch}
            >
            <MenuItem value={"Mechanical Engineering"}>M.E</MenuItem>
            <MenuItem value={"Computer Science Engineering"}>C.S.E</MenuItem>
            <MenuItem value={"Civil Engineering"}>C.E</MenuItem>
            <MenuItem value={"Electronics and Comunication Engineering "}>E.C.E</MenuItem>
            </Select>
            </FormControl>
          }
          </View>
         
          {user_type=="Teacher" && <TextField style={styles.input} id="standard-basic" onChange={(e)=>{setuser_uid(e.target.value)}} type="text" label="Enter the Teacher Id" variant="standard" required  />}
          {user_type=="Student" && <TextField style={styles.input} id="standard-basic" onChange={(e)=>{setuser_uid(e.target.value)}} type="text" label="Enter the Student Id" variant="standard" required  />}      
          {user_type=="Admin" && <TextField style={styles.input} id="standard-basic" onChange={(e)=>{setuser_uid(e.target.value)}} type="text" label="Enter the Student Id OR Teacher's Id" variant="standard" required  />}      

          <TouchableOpacity style={styles.submitButton}> 
            <Button  style={styles.register_button} type='submit'  disabled={user_type_select && branch_select } variant="contained" >Register</Button>
          </TouchableOpacity>
          </Form>
        </View>     
    </View>
   
    </KeyboardAvoidingView>
  )
}

export default Add

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    minHeight:'100vh',
   
  },
  login:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    width:'100%',
    maxWidth:"100%",
    borderRadius:'25px',
    height:'100%',
  },
  inputContainer:{
    width:'80%'
  },
  input:{
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:15,
    marginTop:20,
    width:'100%',
  },
  buttonContainer:{
    width:'70%',
    marginTop:25,
  },
  button:{
    width:'100%'
  },
  register_button:{
    marginTop:10,
    marginBottom:45,
  },
  select_user:{
    display:'flex',
    flexDirection:'row',
    gap:'30px',
    
    marginTop:20,
  },
})