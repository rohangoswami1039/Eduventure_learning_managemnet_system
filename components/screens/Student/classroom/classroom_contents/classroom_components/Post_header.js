import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'


const Post_header = (props) => {
    const class_header = props.class_name.class_name
    const navigation = useNavigation()
    
 return (
   <>
   <View style={styles.post_container}>
    <View style={{display:'flex',flexDirection:'row',}}>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row' }}>
                        <MaterialCommunityIcons onPress={()=>{navigation.navigate("Home")}} name='arrow-left' size={25} />
                        <TouchableOpacity>
                            <View style={styles.class_header_view}>
                                <Text style={styles.class_header_text}>{class_header}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
    </View>
    </View>
   </>
  )
}

export default Post_header

const styles = StyleSheet.create({
    post_container:{
        width:'100%',
        height:55,
        backgroundColor:'#fff',
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3,  
    },
    back_icon:{
        padding:15,
    },
    class_header_view:{
       padding:15,
    },
    class_header_text:{
        fontSize:'19px',
        fontWeight:'570',
    },
     
})