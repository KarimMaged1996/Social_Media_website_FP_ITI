import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4MDY1ODcyLCJpYXQiOjE2ODgwNTk4NzIsImp0aSI6ImY0OGIzNjgyZDhhZjQ2NTM5NTlhZmI3Yzk5ODc2YTFlIiwidXNlcl9pZCI6MX0.fMXI4X-obsIswjzF7k3HPd_oR6hGdPLgqnAQYiWyVPs'
const headers = { Authorization: `Bearer ${token}` };

const Categories = async () => {
    const url = `${BASE_URL}/groups/categories/`;
    let content = {}
    try{
        let res = await axios.get(url, { headers });
        if(res.status === 200){
            content = {
                'status': res.status,
                'data': res.data
            }
            console.log("Success")
        }
    }catch(e){
        content = {
            'data': e
        }
    }
    console.log(content)
    return content
}

const singleCategory = async (categoryId) => {
    const url = `${BASE_URL}/groups/single_category/${categoryId}/`;
    let content = {}
    try{

        let res = await axios.get(url, { headers });
        if(res.status === 200){
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

const getCategoryGroups = async (categoryId) => {
    const url = `${BASE_URL}/groups/category_groups/${categoryId}/`;
    let content = {}
    try{

        let res = await axios.get(url, { headers });
        if(res.status === 200){
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

const getSingleGroup = async (groupId) => {
    const url = `${BASE_URL}/groups/single_group/${groupId}/`;
    let content = {}
    try{

        let res = await axios.get(url, { headers });
        if(res.status === 200){
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

const getGroupMembers = async (groupId) => {
    const url = `${BASE_URL}/groups/group_members/${groupId}/`;
    let content = {}
    try{

        let res = await axios.get(url, { headers });
        if(res.status === 200){
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




export const GroupApi = {
    Categories,
    singleCategory,
    getCategoryGroups,
    getSingleGroup,
    getGroupMembers
}