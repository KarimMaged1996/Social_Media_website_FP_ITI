import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000'
const token = localStorage.getItem('access_token')

const userActivity = async () => {
    let content = {}
     try{
 
         let res = await axios.get(`${BASE_URL}/post/user_groups_posts/`, {
             headers: {
                 'Authorization': `Bearer ${token}`,
                 // 'Content-Type': 'Application/json'
             }
         })
         
         if(res.status === 200){
            console.log(res.data)
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


export const activityApi = {
    userActivity
}