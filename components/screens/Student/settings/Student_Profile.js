import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../../../../firebase'
import { Avatar, Badge, Button } from '@mui/material'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from 'firebase/auth'
import { TouchableOpacity } from 'react-native'
import { styled } from '@mui/material/styles';




const Student_Profile = (props) => {
  async function Sign_out(){
    await signOut(auth).then((e)=>{
    }).catch((e)=>{
      console.log(e)
    })
  }

  
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 52,
    height: 52,
    backgroundColor:'#2196f3'
  }));
  
  return (
    <>
    <View>
      <View style={styles.avatar_image}>     
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <TouchableOpacity onPress={()=>{props.navigation.push("change_profile")}}>
          <SmallAvatar>
              <MaterialCommunityIcons name="pencil" color={'white'} size={26}/>
          </SmallAvatar>
          </TouchableOpacity>
        }
      >
        <Avatar src={auth.currentUser.photoURL} sx={{width:140,height:140}} />
      </Badge>
      </View>

      <View>
        <View style={{flexDirection:'column'}}>
        <View style={styles.display_name}>
          <MaterialCommunityIcons name="account" style={{margin:10,}} color={'gray'} size={26}/>  
          <Text style={styles.display_textholder}>Name:</Text>
            <Text style={styles.display_text}>
              {auth.currentUser.displayName}</Text>          
        </View>
        <View >
            <Text style={{marginLeft:65,marginRight:60}}>This is not your username or pin. This name will be display to your eduventure contacts.</Text>
          </View>
        </View>

         <View style={styles.display_name}>
          <MaterialCommunityIcons name='email' style={{margin:10,}}  color={'gray'} size={26}/>
         <Text style={styles.display_textholder}>Email:</Text>
          <Text style={styles.display_text}>
             {auth.currentUser.email}</Text>
         </View>

      <View style={styles.signout_button}>
        <TouchableOpacity  onPress={Sign_out}>
          <Button variant='contained'>Sign Out</Button>
        </TouchableOpacity>
      </View>
      </View>
    </View>
    </>
  )
}

export default Student_Profile

const styles = StyleSheet.create({
  avatar_image:{
    margin:'25px',
    alignItems:'center',
    justifyContent:'center',
  },
  display_text:{
    color:'black',
    margin:10,
    fontSize:19,
  },
  display_textholder:{
    color:'black',
    margin:10,
    fontSize:19,
    fontWeight:'bold'
  },
  display_name:{
    flexDirection:"row",
    marginLeft:10,
    marginRight:10
  },
  signout_button:{
    margin:55,
  }

})