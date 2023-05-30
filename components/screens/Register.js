//imports from react native and react js 
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native-web'
import { useAuth } from '../context/Auth_context';

//imports from material ui 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//import lottie files 
import Lottie from "react-lottie";
import login from '../../assets/login.json'

//imports from react bootstrap 
import {Form} from 'react-bootstrap';
import { useAdmin } from '../context/admin_context';


const register = (props) => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: login,
  };

  const {createuser,Error,datauploaded}=useAuth();
  const {verify_user_uid}=useAdmin()

  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [name,setname]=useState('');
  const [password_conf,setpassword_conf]=useState('')
  const [user_uid,setuser_uid]=useState('')
  const [branch,setbranch]=useState('')
  const [verify_error,set_verify_error]=useState('')



  const [error,setError]=useState('')
  const [loading,setloading]=useState(false)

  const [user_type,setuser_type]=useState('')
  const [user_type_select,set_user_type_select]=useState(true)
  
  const handleChange = (event: SelectChangeEvent) => { 
    setuser_type(event.target.value )
  };
  const handleChange_branch = (event: SelectChangeEvent)=>{
    setbranch(event.target.value )
  }
  
  async function handleSubmit(e){
    e.preventDefault()
    if(password !==
       password_conf){
        return setError("Password do not match")
       }
    try {
      setError('')
      setloading(true)
      await createuser(email,password,name,user_type,user_uid)
      props.navigation.replace('Home')
      
    }catch{
       setError('Failed to create an account')
    }
  }

  async function verify_uid(){
      if (await verify_user_uid(user_uid,user_type,branch)){
        set_user_type_select(false)
      }
      else {
        set_user_type_select(true)
        set_verify_error("User not verified. Please contact to admin. Refersh the page and try again")
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
      <View style={styles.inputContainer}>
         <Text> {error && <Alert severity="error">{error}</Alert>}</Text>
          <Text> {Error && <Alert severity="error">{Error}</Alert>} </Text>         
      <Form onSubmit={handleSubmit}>
          <TextField  style={styles.input} id="standard-basic" onChange={(e)=>{setname(e.target.value)}} label="Name" variant="standard" required />
          <TextField  style={styles.input} id="standard-basic" onChange={(e)=>{setemail(e.target.value)}} label="Email" variant="standard"  required/>
          <TextField  style={styles.input} id="standard-basic" onChange={(e)=>{setpassword(e.target.value)}} type="password" label="Password" variant="standard" required />
          <TextField  style={styles.input} id="standard-basic" onChange={(e)=>{setpassword_conf(e.target.value)}} type="text" label="Confirm Password" variant="standard" required />          
      <View style={styles.select_user}>
          <FormControl  style={{width:'125px',}} required>
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
                    </Select>
            </FormControl>


          <FormControl style={{width:'125px',}} required>
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
      </View>
      {user_type=="Teacher" && 
      <View>
        <Text> {verify_error && <Alert severity="error">{verify_error}</Alert>}</Text>
        <TextField style={styles.input} id="standard-basic" onChange={(e)=>{setuser_uid(e.target.value)}} type="text" label="Enter the Teacher Id" variant="standard" required />
        <View style={{margin:'40px'}}>
          <TouchableOpacity onPress={verify_uid}>
            <Button variant="contained">Verify</Button>
          </TouchableOpacity>
        </View>
      </View>
      }
      {user_type=="Student" &&
       <View>
        <Text> {verify_error && <Alert severity="error">{error}</Alert>}</Text>
       <TextField style={styles.input} id="standard-basic" onChange={(e)=>{setuser_uid(e.target.value)}} type="text" label="Enter the Student Id" variant="standard" required />
       <View style={{margin:'40px'}}>
         <TouchableOpacity onPress={verify_uid}>
           <Button  variant="contained">Verify</Button>
         </TouchableOpacity>
       </View>
     </View>
      }      
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>{}} style={styles.submitButton}>
          <Button  style={styles.button} variant="contained" disabled={loading || user_type_select} type="submit">sign up</Button>
          </TouchableOpacity > 
            <View style={styles.TextLink_register}>
              <Text> Already have any account ? </Text>
            </View>
          <TouchableOpacity onPress={()=>{props.navigation.push('Login')}} style={styles.submitButton}> 
            <Button style={styles.register_button} variant="outlined" >Login</Button>
          </TouchableOpacity> 
        </View>
        </Form>
      </View>
        
        
    </View>
  </KeyboardAvoidingView>
  )
}

export default register

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
    marginTop:20,
    marginBottom:5,

  },
  button:{
    width:'100%'
  },
  register_button:{
    marginTop:10,
    marginBottom:20,

  },
  TextLink:{
    marginTop:3,
    marginBottom:2,
    alignItems:'center'
  },
  TextLink_register:{
    marginTop:23,
    marginBottom:5,
    alignItems:'center'
  },
  select_user:{
    display:'flex',
    flexDirection:'row',
    gap:'25px',
    marginTop:20,
  },
})