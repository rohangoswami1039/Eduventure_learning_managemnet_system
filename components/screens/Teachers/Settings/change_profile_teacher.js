import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@mui/material'
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"

import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../../../../firebase';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const change_profile_teacher = (props) => {
    const [image, setImage] = useState(null);
    const [loading,setloading]=useState(false)
  
  
    const [profile_image,set_profile_image]=useState()
    const [local_image,set_local_image]=useState(false)
  
    const check_profile=()=>{
      if(auth.currentUser.photoURL){
        set_profile_image(true)
        console.log("User profile is available and set")
      }else {
        set_profile_image(false)
        console.log("User profile is not available and local image is set")
      }
    }
    useEffect(()=>{
      check_profile()
    },[])
  
  
    //image picker form expo 
    const pickImage = async () => {
      setloading(!loading)
      set_local_image(true)
      set_profile_image(false)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled){
        setImage(result.uri)
        
        console.log(result);
        const task = ref(storage,`${auth.currentUser.uid}/profile/${Math.random().toString(36)}`)
        
        const img = await fetch(result.uri)
        const bytes = await img.blob()
  
        await uploadBytes(task,bytes)
        .then((snapshot)=>{
          console.log("data uploaded")
          getDownloadURL(task).then((downloadURL)=>{
            savePost_data(downloadURL)
            props.navigation.push("Teacher_Profile")
          })
        .catch((error)=>{
            console.log(error)
          })
        })
  
      }
    };
  
    const savePost_data = async (downloadURL)=>{
      const docRef= doc(db,"users",auth.currentUser.uid)
      await updateDoc(docRef,{
        Profile_photo : downloadURL
      }).then(
        updateProfile(auth.currentUser,{
          photoURL:downloadURL
        })
        .then(
          window.alert("Profile photo updated")
        )
        .catch((error)=>{
          console.log(error)
        })
      )
    }
    
    // 
    return (
      <View style={{marginTop:35,justifyContent:'center',alignItems:'center'}}>
       { (profile_image || local_image) ? <Avatar  src={auth.currentUser.photoURL} sx={{height:300,width:300}}/>:<Avatar src={image} sx={{height:300,width:300}} />}    
      <View style={{marginTop:25}}>
      <TouchableOpacity onPress={pickImage} >
        
        <Button  loading={loading} variant='contained'>Choose a Profile Photo</Button>
       </TouchableOpacity>
      </View>
      </View>
    )
  }
  

export default change_profile_teacher