//imports from react native and react js 
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native-web'

//imports from material ui 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

//import lottie files 
import Lottie from "react-lottie";
import sign_in from '../../assets/sigin_in.json'
import { Form } from 'react-bootstrap';
import { useAuth } from '../context/Auth_context';

const login = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sign_in,
  };
  

  const [password,setpassword]=useState('');
  const [email,setemail]=useState('');
  const {login,Error}=useAuth()
  const [loading,setloading]=useState(false)
  const [error,setError]=useState('')


  async function handleSubmit(e){
    e.preventDefault()
    try {
      setError('')
      setloading(true)
      login(email,password)
    }catch{
       setError('Failed to create an account')
    }
  }
  
  return (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    
      <View style={styles.login}>
      <Lottie 
                options={defaultOptions}
                height={150}
                width={150}
            />
       
         <Text> {error && <Alert severity="error">{error}</Alert>}</Text>
          <Text> {Error && <Alert severity="error">{Error}</Alert>} </Text>  
      <View style={styles.inputContainer}>
      <Form onSubmit={handleSubmit}>
        <TextField  style={styles.input} id="standard-basic" label="Email" variant="standard" onChange={(e)=>{setemail(e.target.value)}} required/>
        <TextField  style={styles.input} id="standard-basic" type="password" label="Password" variant="standard" onChange={(e)=>{setpassword(e.target.value)}} required />


      
        
        
        <TouchableOpacity onPress={()=>{props.navigation.push('Forget_pass')}}>
            <View style={styles.TextLink}>
              <Text >Forget Your Password ? </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={styles.submitButton}>
            <Button style={styles.button} variant='contained' disabled={loading} type='submit'>Login</Button>
          </TouchableOpacity>
          </Form>
            <View style={styles.TextLink_register}>
              <Text  >Don't have any account ? </Text>
            </View>
          <TouchableOpacity onPress={()=>{props.navigation.push('Register')}} style={styles.submitButton}> 
            <Button style={styles.register_button} variant="outlined">Register</Button>
          </TouchableOpacity>
        </View>
      </View>

  </KeyboardAvoidingView>
  )
}

export default login

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
    maxWidth:"480px",
    borderRadius:'25px'
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
  TextLink:{
    marginTop:10,
    marginBottom:30,
    alignItems:'center'
  },
  TextLink_register:{
    marginTop:23,
    marginBottom:5,
    alignItems:'center'
  },

})