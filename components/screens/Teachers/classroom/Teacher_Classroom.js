import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import { SafeAreaView } from 'react-native-safe-area-context';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


//redux imports 
import { connect} from 'react-redux'
import { bindActionCreators, combineReducers } from 'redux'
import { fetchUser,fetchClassroom } from '../../../redux/actions/index'
import English from '../../../../assets/classroom/English.jpg'

const action = [
  { icon: <MaterialCommunityIcons name="plus-box" color={'gray'} size={26}/>, name: 'Create' },
  { icon: <MaterialCommunityIcons name="pencil-box" color={'gray'} size={26}/>, name: 'Join' },
 
];


const Teacher_Classroom = (props) => {
  var { height, width } = Dimensions.get('screen');
  
  useEffect(()=>{
    props.fetchUser()
    props.fetchClassroom()
  },[])
  const classroom = props.classroom
  const currnetUser = props.currentUser



  //function to create speed dial for Teachers 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose =()=> setOpen(false);
  const numColumns = 3;
  const handleClose_create = () => {
        setOpen(false)
        props.navigation.push("Create_classroom")
        console.log("Create clicked")
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
      <View
        style={{ height: 10, width: '100%',}}
      />
      
    );
  };

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
          <TouchableOpacity onPress={()=>{props.navigation.push('Teacher_Classroom_page',{
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
          key={'Create'}
          icon={ <MaterialCommunityIcons name="pencil-box" color={'gray'} size={26}/>}
          tooltipTitle={'Create'}
          tooltipOpen
          onClick={handleClose_create}
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

export default connect(mapStateToProps,mapDispatchProps)(Teacher_Classroom)

const styles = StyleSheet.create({
  classroom:{
    width:'100%',
    height:'100%',
  },
  joined__list:{
    display: "flex",
    margin:5,
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
  joined__wrapper:{
    
  },
  container:{

  },
  imgwrapper:{

  },
  joined__image:{
  

  },
  joined__content:{

  },
  responsive_container:{
    flex: 1,
    paddingRight: 20,

  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
})