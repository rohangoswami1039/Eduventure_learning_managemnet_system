import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-web';


//import lottie
import Lottie from "react-lottie";
import email from '../../assets/email-confirm.json'

//imports material ui 
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';

//firebase imports
import { useAuth } from '../context/Auth_context';
import { auth } from '../../firebase';


const email_verify = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: email,
      };
      const {Error,send_email_verification_link,Email_verify_signout,datauploaded}=useAuth();
      const [error,setError]=useState('')
      const [loading,setloading]=useState(false)


      function handleSubmit(e){
        e.preventDefault()
        try {
          setError('')
          setloading(true)
          send_email_verification_link()
        }catch{
           setError('Failed to sent the email')
        }
      }
      function handleSign_out(e){
        e.preventDefault()
        try {
          setError('')
          setloading(true)
          Email_verify_signout()
        }catch{
           setError('Failed to sign out')
        }
      }
  return (
    <View style={styles.MainContainer}>
    <View style={styles.Container}>
      <Text style={styles.Heading}>Please Verify Your Email </Text>
      <Text> {error && <Alert severity="error">{error}</Alert>}</Text>
      <Text> {Error && <Alert severity="error">{Error}</Alert>} </Text>  
      <Lottie 
            options={defaultOptions}
            height={150}
            width={150}
            />
          <Text><Text style={{fontWeight: 'bold' ,color:'black'}}>Name:</Text> {auth.currentUser.displayName}</Text>
          <Text style={{color:'green'}}><Text style={{fontWeight: 'bold' ,color:'black'}}>Email:</Text> {auth.currentUser.email}</Text>
        <TouchableOpacity style={styles.Email_verify} onPress={handleSubmit}>
            <Button disabled={loading || !datauploaded} variant='contained'>Send Email Verification link </Button>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Sign_out_email} onPress={handleSign_out}>
            <Button>Sign Out</Button>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default email_verify

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
  Heading:{
    fontSize:'25px',
    margin:'20px',
    color:'black',
  },
  Email_verify:{
    marginTop:"20px"
  },
  Sign_out_email:{
    marginTop:"180px",
  },
})