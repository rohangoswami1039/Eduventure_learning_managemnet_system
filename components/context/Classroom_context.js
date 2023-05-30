import { collection, doc, Firestore, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useState} from 'react';
import { auth, db, storage } from '../../firebase';

const ClassContext = React.createContext()

export function useClassroom(){
    return useContext(ClassContext)
}

export function ClassProvider({children}){
    const [loading,set_loading]=useState(false)

    async function all_class(){
      const uid=auth.currentUser.uid
      const collection_ref= collection(db,'users',uid,'classroom')
      const get_docRef= await getDocs(collection_ref)
      if(get_docRef.empty){
        window.alert("Classroom does not already exists")
       }
       else {
        get_docRef.forEach((data)=>{
         classrooms.push(data.data())
        })
        console.log(classrooms)
        return (classrooms)
       }
    }

    async function join_classroom(code){
     //join function 
     const docRef = doc(db,"Classrooms",`${code}`)
     const get_docRef = await getDoc(docRef)
     if(!get_docRef.exists()){
      window.alert("Classroom does not already exists")
     }
     else{
      const class_data= get_docRef.data()
      const uid = auth.currentUser.uid
      const user_docRef= doc(db,"users",uid,"classroom",`${code}`)
      await setDoc(user_docRef,{
        created_by:class_data.created_by,
        class_profile:class_data.class_profile,
        Class_Name:class_data.Class_Name,
        Subject:class_data.Subject,
        code:class_data.code,
      }).then((e)=>{
        window.alert("Class Joined")
      })
      .catch((e)=>{
        window.alert("Can't joined the room...Please try again")
        console.log("User data can't be uploaded on user field")
        console.log(e)
      })
      
     }
    }

    async function create_classroom(classname,subject){
      const uid1=(((1+Math.random())*0x10000)|0).toString(16).substring(1)
      const uid2=(((2+Math.random())*0x10000)|0).toString(16).substring(2)
      const uid3=(((2+Math.random())*0x10000)|0).toString(16).substring(3)
      const class_code = uid1+uid2+uid3;
    
      const docRef=doc(db,"Classrooms",`${class_code}`)
      const get_docRef = await getDoc(docRef)
      if (get_docRef.exists()){
        window.alert("Classroom already exists")
      }
      else {
        await setDoc(docRef,{
            created_by:auth.currentUser.uid,
            class_profile:auth.currentUser.photoURL,
            Class_Name :classname,
            Subject : subject,
            code:class_code,
        }).then(async (e)=>{
            const uid=auth.currentUser.uid;
            const docRef=doc(db,"users",uid,"classroom",`${class_code}`)
            const get_docRef = await getDoc(docRef)
            if(get_docRef.exists()){
              window.alert("Classroom already exists")
            }else {
              await setDoc(docRef,{
                created_by:auth.currentUser.uid,
                class_profile:auth.currentUser.photoURL,
                Class_Name :classname,
                Subject : subject,
                code:class_code
              }).then((e)=>{
                console.log("Data uploaded to the users field")
              }).catch((e)=>{
                console.log("data can't be uplod on users field")
                console.log(e)
              })
            }
            console.log("Classroom created")
            window.alert("Classroom created")
            set_loading(false)
        })
      }
    }
    const create_post = async (post,classcode,image,pdf)=>{
      set_loading(true)
      const uid1=(((1+Math.random())*0x10000)|0).toString(16).substring(1)
      const uid2=(((2+Math.random())*0x10000)|0).toString(16).substring(2)
      const uid3=(((2+Math.random())*0x10000)|0).toString(16).substring(3)
      const uid4=(((1+Math.random())*0x10000)|0).toString(16).substring(1)
      const uid5=(((2+Math.random())*0x10000)|0).toString(16).substring(2)
      const uid6=(((2+Math.random())*0x10000)|0).toString(16).substring(3)
      const Post_code = uid1+uid2+uid3+uid4+uid5+uid6;
      if(image.length!=0||pdf.length!=0 || post.length!=0){
        if(image.length!=0){
          const task = ref(storage,`${auth.currentUser.uid}/posts/${classcode}/${Math.random().toString(36)}`)
          const img = await fetch(image)
          const bytes= await img.blob()
          await uploadBytes(task,bytes)
          .then((snapshot)=>{
            console.log("data uploaded")
            getDownloadURL(task).then(async (downloadURL)=>{
              const ref = doc(db,"Classrooms",`${classcode}`,'posts',`${Post_code}`)
              await setDoc(ref,{
                  post_data:post,
                  created_by:auth.currentUser.displayName,
                  profile:auth.currentUser.photoURL,
                  Post_code:Post_code,
                  Created_at: serverTimestamp(),
                  uid:auth.currentUser.uid,
                  attachment:downloadURL,
                  image:true,
                  pdf:false,
              }).then((e)=>{
                  window.alert("Data uploaded")
                  set_loading(false)
              }).catch((e)=>{
                  window.alert("There is some problem in uploading the data")
                  console.log(e)
              })            
            })
          })
        }
        else if (pdf.length!=0){
          const task= ref(storage,`${auth.currentUser.uid}/posts/${classcode}/${Math.random().toString(36)}`)
          const fetch_pdf = await fetch(pdf)
          const bytes = await fetch_pdf.blob()
          const metadata = {
            contentType:'application/pdf'
          }
          
          await uploadBytes(task,bytes,metadata)
          .then((snapshot)=>{
            console.log("data uploaded")
            getDownloadURL(task).then(async(downloadURL)=>{
              const ref = doc(db,"Classrooms",`${classcode}`,'posts',`${Post_code}`)
              await setDoc(ref,{
                post_data:post,
                created_by:auth.currentUser.displayName,
                profile:auth.currentUser.photoURL,
                Post_code:Post_code,
                Created_at: serverTimestamp(),
                uid:auth.currentUser.uid,
                attachment:downloadURL,
                pdf:true,
                image:false,
              }).then((e)=>{
                window.alert("Data uploaded")
                set_loading(false)
              }).catch((e)=>{
                window.alert("There is some problem in uploading the data")
                console.log(e)
              })
            })
          })
        }
        else {
          const ref = doc(db,"Classrooms",`${classcode}`,'posts',`${Post_code}`)
          await setDoc(ref,{
              post_data:post,
              created_by:auth.currentUser.displayName,
              profile:auth.currentUser.photoURL,
              Post_code:Post_code,
              uid:auth.currentUser.uid,
              attachment:'nill',
              Created_at: serverTimestamp(),
    
          }).then((e)=>{
              window.alert("Data uploaded")
              set_loading(false)
          }).catch((e)=>{
              window.alert("There is some problem in uploading the data")
              console.log(e)
          })
        }
      }
    }
    const delete_post=async(Post_code)=>{
      console.log(Post_code)
    }
    const create_assignment=async(classcode,Assignment_title,Description,image,pdf)=>{
      set_loading(true)
      const uid1=(((1+Math.random())*0x10000)|0).toString(16).substring(1)
      const uid2=(((2+Math.random())*0x10000)|0).toString(16).substring(2)
      const uid3=(((2+Math.random())*0x10000)|0).toString(16).substring(3)
      const uid4=(((1+Math.random())*0x10000)|0).toString(16).substring(1)
      const uid5=(((2+Math.random())*0x10000)|0).toString(16).substring(2)
      const uid6=(((2+Math.random())*0x10000)|0).toString(16).substring(3)
      const Assignment_code = uid1+uid2+uid3+uid4+uid5+uid6;
      if(image.length!=0||pdf.length!=0 || Assignment_title.length!=0 || Description.length!=0){
        if(image.length!=0){
          const task = ref(storage,`${auth.currentUser.uid}/Assignements/${classcode}/${Math.random().toString(36)}`)
          const img = await fetch(image)
          const bytes= await img.blob()
          await uploadBytes(task,bytes)
          .then((snapshot)=>{
            console.log("data uploaded")
            getDownloadURL(task).then(async (downloadURL)=>{
              const docref = doc(db,"Classrooms",`${classcode}`,'Assignments',`${Assignment_code}`)
               await setDoc(docref,{
                  Assignment_Title :Assignment_title,
                  Assignment_description:Description,
                  Created_at: serverTimestamp(),
                  attachment:downloadURL,
                  attachment_type:'image'
                }).then((e)=>{
                  console.log("data Uploaded")
                  set_loading(false)
                }).catch((e)=>{
                  console.log(e)
                  window.alert("Something went wrong in uploading the file...Please try again")
                  set_loading(false)
                })
            })
          })
        }
      
      else if (pdf.length!=0){
        const task = ref(storage,`${auth.currentUser.uid}/Assignements/${classcode}/${Math.random().toString(36)}`)
        const fetch_pdf = await fetch(pdf)
        const bytes = await fetch_pdf.blob()
        const metadata = {
          contentType:'application/pdf'
        }
        
        await uploadBytes(task,bytes,metadata)
        .then((snapshot)=>{
          console.log("data uploaded")
          getDownloadURL(task).then(async(downloadURL)=>{
            const docref = doc(db,"Classrooms",`${classcode}`,'Assignments',`${Assignment_code}`)
               await setDoc(docref,{
                  Assignment_Title :Assignment_title,
                  Assignment_description:Description,
                  Created_at: serverTimestamp(),
                  attachment:downloadURL,
                  attachment_type:'pdf'
                }).then((e)=>{
                  console.log("data Uploaded")
                  set_loading(false)
                }).catch((e)=>{
                  console.log(e)
                  window.alert("Something went wrong in uploading the file...Please try again")
                  set_loading(false)
                })
            })
        })
      }
    else {
      const docref = doc(db,"Classrooms",`${classcode}`,'Assignments',`${Assignment_code}`)
      await setDoc(docref,{
        Assignment_Title :Assignment_title,
        Assignment_description:Description,
        Created_at: serverTimestamp(),
        attachment:'nill',
        attachment_type:'nill'
      }).then((e)=>{
        console.log("data Uploaded")
        set_loading(false)
      }).catch((e)=>{
        console.log(e)
        set_loading(false)
      })
      }
    }
    else {
      window.alert("Please fill the reqired form to continue")
      set_loading(false)
    }
    }

    const value = {
    create_classroom,   
    loading,
    join_classroom,
    all_class,
    create_post,
    delete_post,
    create_assignment,
    }

    return (
        <ClassContext.Provider value={value}>
         {children}
        </ClassContext.Provider>
    )
}