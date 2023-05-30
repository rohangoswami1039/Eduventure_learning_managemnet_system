import React, { Component } from 'react'
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import of screens 
import login from './components/screens/Login'
import register from './components/screens/Register'
import forget_pass from './components/screens/Forget_pass'
import home from './components/screens/Admin/Home'
import email_verify from './components/screens/Email_verify'
import Student_Home from './components/screens/Student/Student_Home';
import Teacher_Home from './components/screens/Teachers/Teacher_Home';
import Dashboard from './components/screens/Admin/Dashboard';
import Profile from './components/screens/Admin/Profile';
import Add from './components/screens/Admin/Add';
import Student_Classroom from './components/screens/Student/classroom/Student_Classroom'
import Student_Dashboard from './components/screens/Student/Student_Dashboard';
import Student_Profile from './components/screens/Student/settings/Student_Profile';
import change_profile from './components/screens/Student/settings/change_profile';
import std_Account from './components/screens/Student/settings/account/Account'
import std_notification from './components/screens/Student/settings/notification/notification'
import std_help from './components/screens/Student/settings/help/help'
import std_privacy from './components/screens/Student/settings/privacy/privacy'
import Student_settings from './components/screens/Student/settings/Student_settings'


import { AuthProvider} from './components/context/Auth_context';
import { ActivityIndicator, View } from 'react-native-web';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AdminProvider } from './components/context/admin_context';
import Teacher_profile from './components/screens/Teachers/Settings/Teacher_profile';
import Teacher_setings from './components/screens/Teachers/Settings/Teacher_setings';
import change_profile_teacher from './components/screens/Teachers/Settings/change_profile_teacher';
import Create_classroom from './components/screens/Teachers/classroom/Create_classroom';
import { ClassProvider } from './components/context/Classroom_context';
import Join_class from './components/screens/Student/classroom/Join_class';

//react redux imports 
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux' ;
import rootReducer from './components/redux/reducers'
import thunk from 'redux-thunk';
import classroom_page from './components/screens/Student/classroom/classroom_page';
import Attachments from './components/screens/Student/classroom/classroom_contents/Attachments';
import pdf_Attachment from './components/screens/Student/classroom/classroom_contents/pdf_Attachment';
import Edit_post from './components/screens/Student/classroom/classroom_contents/Edit_post';
import Teacher_Classroom_page from './components/screens/Teachers/classroom/Teacher_Classroom_page';
import { Live_class_provider } from './components/context/Live_class_context';
import Assignment_main from './components/screens/Teachers/classroom/classroom_contents/classroom_components/Assignment_main';
import Teacher_Attachments from './components/screens/Teachers/classroom/classroom_contents/classroom_components/Teacher_Attachments';

const store = createStore(rootReducer,applyMiddleware(thunk))



const Stack = createNativeStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded:false,
      user_set:false,
      luser_type:"",
    }
  }
  componentDidMount(){
    onAuthStateChanged(auth,(user)=>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
          user_set:false,
        })
      }
      else{
        if(user.emailVerified==false){
          this.setState({
            EmailVerified:true ,
          })
        }
        //function to read the data from the user database and save it to local storage
        if (user.emailVerified==true){
          try{
            
            data_read(user)
          } 
          catch {
            console.log("Can't set the User Type")
          }
        }

        this.setState({
          loggedIn:true,
          loaded:true,
        })
        
      }
    })
    const data_read = async (user)=> {
            const uid =user.uid
            const Ref= doc(db,'users',uid)
            const docSnap = await getDoc(Ref)
            if (docSnap.exists()) {
              console.log("doc Snap section ")
              const user_type = docSnap.data().user_type
              console.log(user_type)
            this.setState({
              user_set:true,
              luser_type:user_type,
            })
          } 
          else {
            console.log("No such document!");
          }
         
    }
  }
  render() {
    const {loggedIn, loaded,EmailVerified,user_set,luser_type}=this.state;
    if (!loaded ){
      return(
      <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>)
    }
    
    if(!loggedIn){
      return (
        <AuthProvider>
          <AdminProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen  options={{headerShown: false }} name="Login" component={login} />
                <Stack.Screen options={{headerShown: false }} name="Forget_pass" component={forget_pass}/>
                <Stack.Screen options={{headerShown: false }} name="Register" component={register}/>
              </Stack.Navigator>
            </NavigationContainer>
          </AdminProvider>
        </AuthProvider>
      );
    }
    if(loggedIn && EmailVerified){
      return(
      <AuthProvider>        
        <NavigationContainer>
          <Stack.Navigator  initialRouteName="Email_verify">
            <Stack.Screen options={{headerShown: false }} name="Email_verify" component={email_verify}/>
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      )
      
    }
    if (!loaded || !user_set ){
      return(
      <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>)
    }
    
    if(loggedIn && !EmailVerified && user_set && luser_type=="Admin"){
      return (
        <AdminProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false }} name="Home" component={home}/>
            <Stack.Screen options={{headerShown: false }} name="Dashboard" component={Dashboard}/>
            <Stack.Screen options={{headerShown: false }} name="Profile" component={Profile}/>
            <Stack.Screen options={{headerShown: false }} name="Add" component={Add}/>
          </Stack.Navigator>
        </NavigationContainer>
        </AdminProvider>
      )
    }
    if(loggedIn && !EmailVerified && user_set && luser_type=="Teacher"){
      return (
      <Provider store={store}>
      <AuthProvider>
        <ClassProvider>
          <Live_class_provider>
            <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{headerShown: false }} name="Home" component={Teacher_Home}/>
              <Stack.Screen name="Teacher_Profile" component={Teacher_profile}/>
              <Stack.Screen name="Teacher_setings" component={Teacher_setings}/>
              <Stack.Screen name="change_profile_teacher" component={change_profile_teacher}/>
              <Stack.Screen name="Teacher_Classroom_page" component={Teacher_Classroom_page}  options={{headerShown:false}}/>
              <Stack.Screen name="Assignment" component={Assignment_main}/>
              <Stack.Screen name="Teacher_Attachment" component={Teacher_Attachments}/>
              <Stack.Screen name="Create_classroom" component={Create_classroom}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Live_class_provider>
        </ClassProvider>
      </AuthProvider>
      </Provider>
      )
    }
    if(loggedIn && !EmailVerified && user_set && luser_type=="Student"){
      return (
    <Provider store={store}>
      <AuthProvider>
        <ClassProvider>
          <Live_class_provider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen options={{headerShown: false }} name="Home" component={Student_Home}/>
                <Stack.Screen options={{headerShown: false }} name="Student_Dashboard" component={Student_Dashboard}/>
                <Stack.Screen options={{headerShown: false }} name="Student_Classroom" component={Student_Classroom}/>
                <Stack.Screen name="Student_Profile" component={Student_Profile}/>
                <Stack.Screen name="Student_settings"  component={Student_settings}/>

                <Stack.Screen name='Student_privacy_settings' component={std_privacy}/>    
                <Stack.Screen name='Student_notification' component={std_notification}/>
                <Stack.Screen name="Student_Account" component={std_Account}/>
                <Stack.Screen name="Student_help" component={std_help}/>

                
                <Stack.Screen name="change_profile" component={change_profile}/>            
                <Stack.Screen name="Join_class" component={Join_class}/>
                <Stack.Screen name="classroom_page" component={classroom_page} options={{headerShown:false}}/>
                <Stack.Screen name="Attachments" component={Attachments} />
                <Stack.Screen name='PDF Attachments' component={pdf_Attachment}/>
                <Stack.Screen name='Edit_post' component={Edit_post}/>
              </Stack.Navigator>
            </NavigationContainer>
          </Live_class_provider>
        </ClassProvider>
      </AuthProvider>
    </Provider>
        
      )
    }
  }
}

export default App
 