import axios from "axios";

const BASE_URL = 'http://localhost:8000'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4MDY1ODcyLCJpYXQiOjE2ODgwNTk4NzIsImp0aSI6ImY0OGIzNjgyZDhhZjQ2NTM5NTlhZmI3Yzk5ODc2YTFlIiwidXNlcl9pZCI6MX0.fMXI4X-obsIswjzF7k3HPd_oR6hGdPLgqnAQYiWyVPs'
const AllPosts = async () => {
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


const createpost = async (formData) => {
   let content = {}
    try{
        
        let res = await axios.post(`${BASE_URL}/post/create`, formData,{
            headers: {
                // 'Authorization': `Bearer ${token}`,
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

const editpost = async (id, formData) => {
    let content = {}
        try{
            
            let res = await axios.put(`${BASE_URL}/post/update/${id}`, formData,{
                headers: {
                    // 'Authorization': `Bearer ${token}`,
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
 


// const postdetails = async () => {
//     let content = {}
//     try{
//         let res = await axios.get(`${BASE_URL}/api/myProfile/`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 // 'Content-Type': 'Application/json'
//             }
//         })
//         if(res.status === 200){
//             res.data.data['avatar'] = `${BASE_URL}${res.data.data['avatar']}`
//             // res.data.data['avatar'] = null
//             content = {
//                 'status': res.data.status,
//                 'data': res.data.data
//             }
//         }
//     }catch(e){
//         content = {
//             'data': e
//         }
//     }

//     return content
// }



export const PostApi = {
    AllPosts,
    createpost,
    editpost
}


