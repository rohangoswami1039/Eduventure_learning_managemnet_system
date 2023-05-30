import React, { useContext, useState } from 'react';
import { auth ,db} from '../../firebase';
import { createUserWithEmailAndPassword,deleteUser,sendEmailVerification,sendPasswordResetEmail,signInWithEmailAndPassword,signOut,updateProfile } from "firebase/auth";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';



const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export function datauploaded(){
    const [uploaded,set_uploaded]=useState(true)
    return uploaded ;
}

export function AuthProvider({children}){

    const [Error,setError]=useState('')
    const [datauploaded,setdatauploaded]=useState(false)

    // function for creating the user ----> user signup 
    async function createuser(email,password,name,user_type,user_uid){
        await createUserWithEmailAndPassword(auth,email,password)    
        .then((e)=>{
           updateProfile(e.user,{
            displayName: name
           })
           .then(async (e)=>{
            const uid=auth.currentUser.uid
            const ref =doc(db,"users",uid)
            await setDoc(ref,{
                 uid : uid ,
                 name: name,
                 email: email,
                 password: password,
                 user_type: user_type,
                 user_uid:user_uid,
            }).then((e)=>{
                 console.log("User data is uploaded")
                 setdatauploaded(true)
            }).catch((e)=>{
                 console.log(e)
                 setError(e.message)
            })

           })
           .catch((e)=>{
            console.log(e)
            console.log("Error in uploading the user data")
           })
        }).catch((E)=>{
            console.log(E)
            setError(E.message)
        })
    }
  
    //function for user login -----> user signin 
   async function login(email,password){
        await signInWithEmailAndPassword(auth,email,password)
        .then((e)=>{
            console.log("user login success")
        })
        .catch((E)=>{
            setError(E.message)
        })
    }

    //function to send the email verification 
    function send_email_verification_link(){
        sendEmailVerification(auth.currentUser)
        .then((e)=>{
            window.alert("Email Sent")

        })
        .catch((e)=>{
            setError(e.message)
        })
    }
    
    //function to handle the signout which comes from email verification page 
    async function Email_verify_signout(){
        const uid =auth.currentUser.uid    
        const ref =doc(db,"users",uid)
        await deleteDoc(ref).then((e)=>{
            console.log("User data is deleted ")
            const user = auth.currentUser;
            deleteUser(user).then(() => {
                console.log("User delete")
                signOut(auth).then((e)=>{
                    console.log("User Sign out")
                }).catch((e)=>{
                    console.log(e)
                })
            }).catch((error) => {
                setError(error.message)
  
            });
            
        })
    }
    function forget_password(email){
        sendPasswordResetEmail(auth, email)
        .then(() => {
            window.alert("Email is sent... Please check your email for password reset")
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage)
        });
    }
    
    
   
    const value = {
      createuser,
      Error,
      login,
      datauploaded,
      send_email_verification_link,
      Email_verify_signout,
      forget_password,

    }

    return (
        <AuthContext.Provider value={value}>
         {children}
        </AuthContext.Provider>
    )
}