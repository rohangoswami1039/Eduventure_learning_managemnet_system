import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useContext, useState} from 'react';
import { auth, db } from '../../firebase';

const AadminContext = React.createContext()
 
export function useAdmin(){
    return useContext(AadminContext)
}

export function AdminProvider({children}){
    const [loading,setloading]=useState(false)

    async function register_user(email,name,user_type,uid,branch){
        setloading(true)
        //creating user to the database 
            const docRef = doc(db,"Users_database",user_type,branch,uid)
            const get_docRef= await getDoc(docRef)
            if (get_docRef.exists()){
                window.alert("User already exists.")
            }
            else {
                await setDoc(docRef,{
                    uid:uid,
                    name:name,
                    email:email,
                    branch:branch,
                    user_type:user_type,
                }).then((e)=>{
                    console.log("user data uploaded")
                    window.alert("User data uploaded")
                    setloading(false)
                })
    
            }
        }
    async function verify_user_uid(uid,user_type,branch){
        setloading(true)
        const docRef=doc(db,'Users_database',user_type,branch,uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            console.log("Data exists >>> "+ docSnap.data())
            setloading(false)
            return true ;
        }
        else {
            window.alert("Data not exits please try again to register")
            console.log("Data do not exits please try again to register")
            setloading(false)
            return false ;
        }
    }
   
    const value = {
        register_user,
        loading,
        verify_user_uid,

    }

    return (
        <AadminContext.Provider value={value}>
         {children}
        </AadminContext.Provider>
    )
}