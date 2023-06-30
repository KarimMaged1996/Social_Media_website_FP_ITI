import axios from "axios";

const BASE_URL = 'http://localhost:8000'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4MDY1ODcyLCJpYXQiOjE2ODgwNTk4NzIsImp0aSI6ImY0OGIzNjgyZDhhZjQ2NTM5NTlhZmI3Yzk5ODc2YTFlIiwidXNlcl9pZCI6MX0.fMXI4X-obsIswjzF7k3HPd_oR6hGdPLgqnAQYiWyVPs'

const AllComments = async () => {
   let content = {}
    try{

        let res = await axios.get(`${BASE_URL}/comment/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'Application/json'
            }
        })
        
        if(res.status === 200){
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
export const commentApi = {
    AllComments
}