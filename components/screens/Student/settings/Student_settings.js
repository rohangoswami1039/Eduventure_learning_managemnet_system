import { StyleSheet, Text, TouchableOpacity, View, ViewComponent } from 'react-native'
import React from 'react'
import { Avatar} from '@mui/material'
import { auth } from '../../../../firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'





const Student_settings = ({navigation}) => {

  return (
    <>
    <TouchableOpacity onPress={()=>{navigation.push("Student_Profile")}}>
    <View style={styles.Profile_section}>
        <Avatar src={auth.currentUser.photoURL} sx={{width:80,height:80}} />
        <View style={{justifyContent:'center',alignItems:'flex-start',flexDirection:'column'}}>
        <Text style={{fontSize:25, marginLeft:20}}>{auth.currentUser.displayName}</Text>
        <Text style={{fontSize:15, marginLeft:20}}>{auth.currentUser.email}</Text>
        </View>
    </View>
    </TouchableOpacity>
    <View style={styles.profile_divider}></View>

    <View style={styles.Settings}>
    <TouchableOpacity > 
      <View style={{flexDirection:'row',marginTop:10,}}>
        <View style={{justifyContent:'center',marginRight:15}}>
        <MaterialCommunityIcons name="key-chain-variant" color={'gray'} size={26}/>
      </View>

      <View style={styles.Settings_component}>
        <Text style={{fontSize:20,}}>Account</Text>
        <Text style={{fontSize:12,width:'280px',marginBottom:5}}>Privacy, security, change number, update password</Text>
      </View>
      </View>
    </TouchableOpacity>

      <TouchableOpacity> 
      <View style={{flexDirection:'row',marginTop:10,}}>
        <View style={{justifyContent:'center',marginRight:15}}>
        <MaterialCommunityIcons name="lock" color={'gray'} size={26}/>
      </View>

      <View style={styles.Settings_component}>
        <Text style={{fontSize:20,}}>Privacy</Text>
        <Text style={{fontSize:12,width:'280px',marginBottom:5}}>Block contact, classroom settings</Text>
      </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity > 
      <View style={{flexDirection:'row',marginTop:10,}}>
        <View style={{justifyContent:'center',marginRight:15}}>
        <MaterialCommunityIcons name="bell" color={'gray'} size={26}/>
      </View>

      <View style={styles.Settings_component}>
        <Text style={{fontSize:20,}}>Notifications</Text>
        <Text style={{fontSize:12,width:'280px',marginBottom:5}}>Message, Group, chats</Text>
      </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity> 
      <View style={{flexDirection:'row',marginTop:10,}}>
        <View style={{justifyContent:'center',marginRight:15}}>
        <MaterialCommunityIcons name="help-circle" color={'gray'} size={26}/>
      </View>

      <View style={styles.Settings_component}>
        <Text style={{fontSize:20,}}>Help</Text>
        <Text style={{fontSize:12,width:'280px',marginBottom:5}}>Help Center, Contact us, Privacy policy</Text>
      </View>
      </View>
    </TouchableOpacity>


    </View>
     </>
  ) 
}

export default Student_settings

const styles = StyleSheet.create({
  Profile_section:{
    flexDirection:'row',
    marginLeft:25,
    marginTop:25,
  },
  profile_divider:{
    width:'100%',
    marginTop:10,
    height:'1px',
    backgroundColor:'gray'
  },
  Settings:{
    margin:15,
    marginTop:15,
    height:'100%'
  },
  Settings_component:{
    justifyContent:'center',
    alignContent:'flex-start',
    marginTop:'10px',
    height:'60px',
  }
})