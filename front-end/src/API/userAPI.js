import axios from "axios";
import { BASE_URL } from "../Constants";

const token = localStorage.getItem('access_token')

const myProfile = async () => {
   let content = {}
    try{

        let res = await axios.get(`${BASE_URL}/api/myProfile/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'Application/json'
            }
        })
        
        if(res.status === 200){
            res.data.data['avatar'] = `${BASE_URL}${res.data.data['avatar']}`
            // res.data.data['avatar'] = null
            content = {
                'status': res.data.status,
                'data': res.data.data
            }
        }
        
    }catch(e){
        content = {
            'data': e
        }
    }

    return content
}
const userProfile = async ({id}) => {
    let content = {}
     try{
 
         let res = await axios.get(`${BASE_URL}/api/profile/${id}/`, {
             headers: {
                 'Authorization': `Bearer ${token}`,
                 // 'Content-Type': 'Application/json'
             }
         })
         
         if(res.status === 200){
            //  res.data.data['avatar'] = `${BASE_URL}${res.data.data['avatar']}`
             // res.data.data['avatar'] = null
             content = {
                 'status': res.status,
                 'data': res.data
             }
         }
         
     }catch(e){
         content = {
             'data': e
         }
     }
 
     return content
 }

const editMyProfile = async (formData) => {
   let content = {}
    try{
        
        let res = await axios.put(`${BASE_URL}/api/myProfile/`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        
        if(res.status === 200){
            console.log(res.data)
        }
        
    }catch(e){
        content = {
            'data': e
        }
    }

    return content
}



export const UserApi = {
    myProfile,
    editMyProfile,
    userProfile
}