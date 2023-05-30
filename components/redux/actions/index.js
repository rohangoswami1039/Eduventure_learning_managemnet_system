import { USER_CLASSROOM_STATE_CHANGE } from "../constant"
import { USER_STATE_CHANGE } from "../constant"
import { collection, doc, getDoc, getDocs, QuerySnapshot } from "firebase/firestore"
import { auth, db } from "../../../firebase"

export  function fetchUser(){
      return ( async (dispatch)=>{
        const uid = auth.currentUser.uid
        const ref =doc(db,'users',uid)
        await getDoc(ref)
        .then((Snap)=>{
          if(Snap.exists){
            console.log(Snap.data())
            dispatch({type: USER_STATE_CHANGE,currentUser:Snap.data()})
          }
          else {
            console.log('user does not exists')
          }
        })
      })
}

export function fetchClassroom(){
      return (async (dispatch)=>{
        const uid= auth.currentUser.uid
        const ref = collection(db,"users",`${uid}`,"classroom")
 
        const querySnapshot = await getDocs(ref);
        const classrooms =  querySnapshot.docs.map(doc => {
          const data = doc.data()
          const id = doc.id 
          return {id,...data}
        })
        dispatch({type:USER_CLASSROOM_STATE_CHANGE,classroom:classrooms})
      })
}