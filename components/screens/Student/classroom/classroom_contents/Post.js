import { Animated, Dimensions, FlatList, ScrollViewComponent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, TextField, Typography } from '@mui/material'
import {auth, db, storage} from '../../../../../firebase'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import {useClassroom} from '../../../../context/Classroom_context'
import Post_header from './classroom_components/post_header'
import { ScrollView, StatusBar } from 'react-native-web'

//imports of the speed dial and backdrop 
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';

//import of Dialog and dialog actions 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// image and document picker
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker'
import { Button } from 'react-native-elements'




const Post = (props) => {
    const scrollY= new Animated.Value(0)
    const diffclamp = Animated.diffClamp(scrollY,0,65)
    const translateY =  diffclamp.interpolate({
        inputRange:[0,65],
        outputRange:[0,-65]
    })    
    const classcode = props.route.params.classcode
    const class_name = props.route.params.class_name
    const class_created_by = props.route.params.calss_created_by
    const class_subject = props.route.params.class_subject
    
    const [posts,setposts]=useState([])
    //attachments variables 
    const [post,setpost]=useState('')
    const {loading}=useClassroom()
    const {create_post,}=useClassroom()
    const [image,set_image]= useState('')
    const [pdf,set_pdf]= useState('')
    const [button_loading,set_button_loading]=useState(false)
    const [open, setOpen] = useState(false); 
    
    //handle dialog button 
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        set_image('')
        set_pdf('')
        setOpen(false);
    }; 
    const handleSubmit = async()=>{
       if(post.length!=0){
           set_button_loading(true)
           await create_post(post,classcode,image,pdf)
           set_button_loading(false)
           setOpen(false)
           set_image('')
           set_pdf('')
       }
       else {
        window.alert("Please write something for the post")
       }
    }    
   
   
    const pdf_document_Picker= async () =>{
        console.log("pdf document picker is clicked")
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf"
        })
        console.log(result)
        if(!result.cancelled){
            set_pdf(result.uri)
        }
    }
    const image_document_Picker = async ()=>{
        console.log("Image document picker is clicked")
            let result =  await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                quality:1,                
            })
        console.log(result)
        if(!result.cancelled){
        set_image(result.uri)
        }
    }

    
    const get_class_post= (classcode)=>{
        const ref = collection(db,"Classrooms",`${classcode}`,'posts')
        const q=query(ref,orderBy("Created_at",'desc'))
        onSnapshot(q,(querrySnap)=>{
           
            const post_collection = querrySnap.docs.map((docSnap)=>{
                const data = docSnap.data()
                if(data){
                    if(data.Created_at){
                        const id = docSnap.id 
                        const server_created_at=docSnap.data().Created_at
                        const created_at_date = new Date(server_created_at.toDate())
                        const created_at = new Date(server_created_at.toMillis());
                        return {id,created_at,created_at_date,...data}
                    }
                }
            })
        setposts(post_collection)
        })
    }
    useEffect(()=>{
        get_class_post(classcode)
    },[])
    const [ backdrop_open, set_backdrop_Open] = useState(false);
    const backdrop_handleOpen = () => set_backdrop_Open(true);
    const backdrop_handleClose =()=> set_backdrop_Open(false);
 
    const backdrop_handleClose_join = () => {
        handleClickOpen()
        set_backdrop_Open(false)
    } ;

   
    return (
<>
<View style={[{backgroundColor: '#fff',},StyleSheet.absoluteFillObject]}></View>
<View style={Dimensions.get('screen').width<500?styles.Post_Container:desktop_style.Post_Container}>
   {Dimensions.get('screen').width>500 && <View style={{flex:1,justifyContent:"flex-start",alignItems:'flex-end',paddingTop:StatusBar.currentHeighr || 65,marginRight:180}}>
        <Card sx={styles.post_card_upcomings}>
            <CardHeader
                 title={<Text style={{fontSize:18}}>{'Class Code'}</Text>}
            />
            <CardContent>
                <Text>{classcode}</Text>
            </CardContent>
        </Card>
        <Card sx={styles.post_card_upcomings}>
            <CardHeader style={{fontSize:12}}
                title={<Text style={{fontSize:18}}>{'Upcomings..'}</Text>}
            />
            <CardContent>
                <Text>{'No Pending work :) '}</Text>
            </CardContent>
        </Card>
   
    </View>} 
  
    <FlatList
        data={posts}
        style={Dimensions.get('screen').width <500?styles.post_flatlist:desktop_style.post_flatlist}
        numColumns={1}
        horizontal={false}
        contentContainerStyle={{
            padding:20,
            paddingTop:StatusBar.currentHeighr || 65,
        }}    
        renderItem={({item})=>{
        if(item!=undefined){
            return(
                <View>
                <Card sx={styles.post_card}>
                    <CardHeader 
                        avatar = {<Avatar src={item.profile}/>}
                        action = {item.uid == auth.currentUser.uid && item.image && 
                            <TouchableOpacity onPress={()=>{props.navigation.push('Edit_post',{
                                post_id : item.Post_code,
                                post_data :item.post_data,
                                attachment:item.attachment,
                                attachment_type:'image'})}}>                        
                            <MaterialCommunityIcons name="pencil" color={'gray'} size={26}/>
                            </TouchableOpacity>}
                        title={item.created_by}
                        subheader={<Text>{item.created_at.toLocaleTimeString()}</Text>}/>
                {item.attachment && item.image && <View >
                <TouchableOpacity onPress={()=>{props.navigation.push("Attachments",{
                    attachment:item.attachment,
                    edit:false,})}}>
                 <CardMedia
                    component="img"
                    height="194"
                    image={item.attachment}
                    alt="Paella dish"
                    />
                </TouchableOpacity>
                </View>} 

                    <CardContent>
                        <Typography variant="body2">
                        {item.post_data}
                        </Typography>
                    </CardContent>
                <CardActions>
                
                
                {item.attachment && item.pdf && <View>
                <TouchableOpacity onPress={()=>{props.navigation.push("PDF Attachments",{
                    attachment:item.attachment,
                    edit:false,})}}>
                <View style={styles.main_container_attachments_pdf}>
                    <View style={styles.container_attachments_pdf}>
                        <MaterialCommunityIcons name= 'file-pdf-box'color={'#A9A9A9'} size={25}/>
                        <Text style={{marginLeft:'10px',marginRight:'10px',color:'#36454F'}}>Attachment</Text>
                    </View>
                </View>
                </TouchableOpacity>
                </View>}
                </CardActions>        
            </Card>
        </View>)}
        else {
            return(<View><Text>Please wait</Text></View>)
            }
        }
    }/>
</View>
<View style={{width:'100%',position:'absolute',top:0,}}>
    <Post_header class_name={{class_name}}/>
</View>
<Backdrop open={backdrop_open} />
    <SpeedDial
    ariaLabel="create and join class "
    sx={{ position: 'fixed', bottom: '60px', right: '16px' }}
    icon={<SpeedDialIcon />}
    onClose={backdrop_handleClose}
    onOpen={backdrop_handleOpen}
    open={backdrop_open}>
           <SpeedDialAction
            key={'Join'}
            icon={ <MaterialCommunityIcons name="pencil-box" color={'gray'} size={26}/>}
            tooltipTitle={'Post'}
            tooltipOpen
            onClick={backdrop_handleClose_join}
          />
      </SpeedDial>
      <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Post</DialogTitle>
                 <DialogContent>
                    <DialogContentText component={'span'}>
                        The content is visible to all the students and the teachers in this class. 
                    {image && <View style={{marginTop:'10px',marginBottom:'8px'}}>
                        <View style={styles.selected_image_container}>
                            <View style={styles.selected_image}>
                            <MaterialCommunityIcons name='image-size-select-actual' size={25} />
                                    <Text style={{marginLeft:'5px'}}>Image file is selected</Text>
                            <TouchableOpacity onPress={()=>{set_image('')}}>
                                <View style={{borderRadius:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#D3D3D3',width:'18px',height:'18px', right:'-10px'}}>
                                    <Text style={{color:'gray'}}>X</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>} 
                    {pdf && <View style={{marginTop:'10px',marginBottom:'8px'}}>
                        <View style={styles.selected_image_container}>
                            <View style={styles.selected_image}>
                                <MaterialCommunityIcons name='file-pdf-box' size={25} />
                                <Text style={{marginLeft:'5px'}}>PDF file is selected</Text>
                                <TouchableOpacity onPress={()=>{set_pdf('')}}>
                                    <View style={{borderRadius:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#D3D3D3',width:'18px',height:'18px', right:'-10px'}}>
                                        <MaterialCommunityIcons color={'gray'} name='close' size={15}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}
                </DialogContentText>
                        <TextField
                            autoFocus
                            style={{marginBottom:'50px'}}
                            margin="dense"
                            id="name"
                            label="Write Something here "
                            type="text"
                            onChange={(e)=>{setpost(e.target.value)}}
                            fullWidth
                            required
                            variant="standard"
                        />
                        
                        <View style={styles.attachments}>
                            <View style={styles.pdf}>
                            <TouchableOpacity onPress={pdf_document_Picker}>
                                <MaterialCommunityIcons  name="file-pdf-box" color={'gray'} size={26}/>
                            </TouchableOpacity>
                            </View>
                            <View style={styles.image}>
                            <TouchableOpacity onPress={image_document_Picker}>
                                <MaterialCommunityIcons  name="file-image-plus" color={'gray'} size={26}/>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </DialogContent>
                        <DialogActions>
                            <Button  onPress={handleClose} type="clear"   title='Cancel'/>
                            <Button  onPress={handleSubmit} type="clear" loading={loading || button_loading} title='Submit'/>
                        </DialogActions>
                    </Dialog>
    </>
  )
}

export default Post

const styles = StyleSheet.create({
    post_flatlist:{
        display:'flex',
        flex:1,
    },
    post_card :{
        width:'100%', 
        marginTop:'5px',
        marginBottom:'5px', 
        borderRadius:'1rem', 
        borderColor:'#E4DCCF',

        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,  
    },
    main_container_attachments_image:{
        width:'100%',
        height:'40px',
        borderRadius:'1rem', 
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,  
    },
    container_attachments_image:{
        display:'felx',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
        margin:8,

    },
    main_container_attachments_pdf:{
        width:'100%',
        height:'40px',
        borderRadius:'1rem', 
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3, 
    },
     container_attachments_pdf:{
        display:'felx',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
        margin:8,

    },
    post_container:{
        width:'80%',
        height:65,
        backgroundColor:'#fff',
        borderRadius:'1.5rem',
        shadowOffset: {width: -2, height: 4},  
        shadowColor: '#171717',  
        shadowOpacity: 0.2,  
        shadowRadius: 3,  
    },
    input:{
        color:'#36454F',
        paddingHorizontal:20,
        paddingVertical:20,
        fontSize:'16px',
        fontWeight:'470',
        width:'100%',
    },
    attachments:{
        position:'absolute',
        bottom:80,
        display:'flex',
        flexDirection:'row',
        gap:'50px'
    },
    user_post_container :{
        backgroundColor:'#fff',
        borderRadius:'20px',
        marginTop:'8px',
        marginBottom:'8px',
    },
    selected_image:{
        display:'flex',
        flexDirection:'row',
         marginLeft:'5px',
         marginRight:'5px',
        justifyContent:'center',
        alignItems:'center'
     },  
     Post_Container:{
        flex:1
     },
     post_card_upcomings:{
        width:240,
        marginBottom:5,
        marginLeft:10,
        borderWidth:2,
        borderColor:'#E4DCCF',
     }
})

const desktop_style = StyleSheet.create({
    Post_Container:{
        flex:1,
        flexDirection:"row",
        justifyContent:'space-evenly',
        
    },
    post_flatlist:{
       flex:1,
       marginRight:300,
       marginLeft:-150,
    }

})
