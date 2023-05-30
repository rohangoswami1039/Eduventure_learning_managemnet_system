import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TouchableOpacity } from 'react-native-web';

import Lottie from "react-lottie";
import email_ani from '../../assets/forget_pass.json'
import { Alert, TextField } from '@mui/material';
import { useAuth } from '../context/Auth_context';
const forget_pass = (props) => {
  const [email,setemail]=useState('');
  const {Error,forget_password}=useAuth()
  const [error,setError]=useState()
  const [loading,setloading]=useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: email_ani,
  };

  function handleSubmit(email){
    try {
      console.log("button click")
      setError('')
      setloading(true)
      forget_password(email)
    }catch{
       setError('Failed to sent password reset link')
    }
  }

  return (
    <View style={styles.MainContainer}>
      <View style={styles.Container}>
      <Lottie 
          options={defaultOptions}
          height={300}
          width={300}
            />
            <Text> {Error && <Alert severity="error">{Error}</Alert>} </Text>  
            <Text> {error && <Alert severity="error">{error}</Alert>} </Text>  

      <TextField  style={styles.input} id="standard-basic" label="Email" variant="standard" onChange={(e)=>{setemail(e.target.value)}} required/>
      
      <TouchableOpacity onPress={handleSubmit} > 
            <Button style={styles.register_button} disabled={loading} variant="contained">Send Password Reset Link</Button>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{props.navigation.push('Login')}} > 
            <Button style={styles.register_button} >Login</Button>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default forget_pass

const styles = StyleSheet.create({
  MainContainer:{
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
  },
  Container:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    width:'100%',
    height:'100%',
    maxWidth:"480px",
    borderRadius:'25px'
  },
  input:{
    marginTop:'10px',
    marginBottom:'10px'  
  },
  register_button:{
    marginTop:'10px',
    marginBottom:'10px'  
  }

})