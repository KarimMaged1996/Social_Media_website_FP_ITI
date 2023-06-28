import axios from "axios";

const BASE_URL = 'http://192.168.1.14:8000'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3OTEzNzQxLCJpYXQiOjE2ODc5MDc3NDEsImp0aSI6ImVkM2I3ZDZkMDVjYzQzMjA4ZTA1NzUzYjQxYmUzZGYzIiwidXNlcl9pZCI6N30.1588cSfibR9u4wlaz5997sa0ouQA4eppt4IdlWz7Zes'

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
    editMyProfile
}