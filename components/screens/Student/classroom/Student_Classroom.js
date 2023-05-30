import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useClassroom } from '../../../context/Classroom_context';

//redux imports 
import { connect} from 'react-redux'
import { bindActionCreators, combineReducers } from 'redux'
import { fetchUser,fetchClassroom } from '../../../redux/actions/index'
import { FlatList, SafeAreaView } from 'react-native-web';

//import classroom images 
import English from '../../../../assets/classroom/English.jpg'
import { Avatar } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

//import classroom images 
import background from '../../../../assets/classroom/005.png'

const Student_Classroom = (props) => {
  const numColumns=3;
  

  const classroom = props.classroom
  const currnetUser = props.currentUser
  const fetch_class_profile=async(uid)=>{
    const docRef = doc(db,'users',uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      var profile_class = docSnap.data().Profile_photo
      console.log(profile_class)
      return profile_class
    }else {
      console.log("no such document found")
    }
  }

  

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose =()=> setOpen(false);
 
  const handleClose_join = () => {
        setOpen(false)
        props.navigation.push('Join_class')
      } ;
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }  
  return data;
};
  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
};
useEffect(()=>{
  props.fetchUser()
  props.fetchClassroom()
},[])


  return (
    <View style={styles.classroom}>
      <FlatList 
        data={formatData(classroom,numColumns)}
        horizontal={false}
        numColumns ={Dimensions.get('screen').width<500 ? 1:3}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem = {({item})=>{
          if(item.empty === true){
            return <View style={[styles.responsive_container,styles.itemInvisible]}></View>
          }
          return(
            <SafeAreaView style={styles.responsive_container}>
          <TouchableOpacity onPress={()=>{props.navigation.push('classroom_page',{
            classname:item.Class_Name,
            subject :item.Subject,
            code :item.id,
            created_by:item.created_by,
          })}}>
            <View style={styles.joined__list}>
              <View style={styles.joined__wrapper}>
                <View style={styles.container}>
                  <View style={styles.imgwrapper}>
                    <Image source={English} style={{width:'100%',height:159}}/>
                    <Text style={{ position:'absolute',top:'10px',color:'#fff',marginLeft:'15px',fontSize:'25px',fontFamily:'Roboto'}}>{item.Class_Name}</Text> 
                    <Text style={{position:'absolute',top:'35px',color:'#fff',fontSize:'14px',margin:15}} >Code : {item.id}</Text>
                    <Text style={{position:'absolute',top:'55px',color:'#fff',fontSize:'14px',marginTop:15,marginLeft:15}}>{item.Subject}</Text>
                    <MaterialCommunityIcons style={{position:'absolute',bottom:'5px',left:'10px'}} name="folder" color={'#fff'} size={26}/>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop:-50,alignItems:'flex-end',marginBottom:10}}>
              <Avatar src={item.class_profile} sx={{width:60,height:60}}/>
            </View>
          </TouchableOpacity>
          </SafeAreaView>
          ) 
        }
      }
      />
      <View style={styles.classroom_profile}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="create and join class "
        sx={{ position: 'fixed', bottom: '60px', right: '16px' }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
           <SpeedDialAction
            key={'Join'}
            icon={ <MaterialCommunityIcons name="pencil-box" color={'gray'} size={26}/>}
            tooltipTitle={'Join'}
            tooltipOpen
            onClick={handleClose_join}
          />
      </SpeedDial>
      </View>
    </View>
  )
}



const mapStateToProps =  (store)=>({
  currentUser: store.userState.currentUser,
  classroom : store.userState.classrooms,
})

const mapDispatchProps = (dispatch)=>bindActionCreators({fetchUser,fetchClassroom},dispatch)

export default connect(mapStateToProps,mapDispatchProps)(Student_Classroom)


const styles = StyleSheet.create({
  classroom:{
    width:'100%',
    height:'100%',
  },
  joined__list:{
    display: "flex",
    margin:10,
    flexDirection:'column',
    height:"18.375 rem",
    marginBottom:"0.5rem",
    marginRight:"1.5rem",
    overflow:'hidden',
    position:'relative',
    textAlign:'left',
    width:'100%',
    backgroundColor:'#fff',
    border:"0.0625rem solid #dadce0",
    borderRadius:'0.5rem',

  },
  responsive_container:{
    flex: 1,
    paddingRight: 20,

  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
})
/**
 * 1. background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
 * 2. background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
 * 3. background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
 * 
 */