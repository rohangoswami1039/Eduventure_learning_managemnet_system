import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useClassroom } from '../../../../context/Classroom_context'
import { Button } from 'react-native-elements'
import { Image } from 'react-bootstrap'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Edit_post = (props) => {
    const post_code = props.route.params.post_id 
    const attachment = props.route.params.attachment
    const post_data = props.route.params.post_data

    console.log("Edit post post code >>>",post_code)
    console.log("Edit post post attachment >>> ",attachment)
    console.log("Edit post post data >>> ",post_data)
    
    const {delete_post} = useClassroom()
    const [delete_open,set_delete_open]=useState(false)
    const [delete_loading,set_delete_loading]=useState(false)

    //handle deleted post button 
    const delete_the_post= async (post_id) => {
        set_delete_loading(true)
        delete_post(post_id)
        set_delete_open(false)
    }
    const deletehandleClickOpen = () => {
        set_delete_open(true);
    };
    const deletehandleClose = () => {
        set_delete_open(false);
    };
    return (
        <Card sx={styles.post_card}>
        <CardHeader/>
         <CardContent>
          <Text>Content: </Text><Text>{post_data}</Text>
        </CardContent>
            {attachment !='nill' && <View style={{padding:10,justifyContent:'center',alignItems:'center',}}>
               <View style={{borderRadius:'1rem', shadowOffset: {width: -2, height: 4},shadowColor: '#171717',shadowOpacity: 0.2,shadowRadius: 3,  }}>
                    <TouchableOpacity onPress={()=>{props.navigation.push("Attachments",{
                            attachment:attachment,
                            edit:'true',
                        })}}>
                    <View style={{flexDirection:'row',padding:20}}>
                        <MaterialCommunityIcons name='image-size-select-actual' size={25}  color={'gray'} />
                        <Text style={{marginLeft:15}}>Attachment Image</Text>
                    </View>
                    </TouchableOpacity>

               </View>
            </View> }
        <CardActions>
            <TouchableOpacity>
                <Button type='clear' title='Delete the Announcement' onPress={deletehandleClickOpen}/>
                <Dialog
                    open={delete_open}
                    onClose={deletehandleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to delete this Post?"}
                        </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            After deleting this post you can't recover this. Are you sure want to delete this ?
                        </DialogContentText>
                    </DialogContent>
                        
                    <DialogActions>
                        <Button onPress={deletehandleClose} type="clear" title='Disagree'/>
                        <Button onPress={()=>{delete_the_post(post_code)}}  buttonStyle={{ backgroundColor: 'red' }} titleStyle={{color: 'white',marginHorizontal: 20,}} title='Delete'/>
                    </DialogActions>
                </Dialog>
            </TouchableOpacity>
        </CardActions>        
</Card>
  )
}

export default Edit_post

const styles = StyleSheet.create({})
/*

    


                         

*/