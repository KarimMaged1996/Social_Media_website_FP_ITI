import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import axios from "axios";
import { Mypost } from './Mypost';
import {BASE_URL} from '../Constants'


export function AllPosts() {


    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    let apiUrl = `${BASE_URL}/post/`

    useEffect(() => {
        // if(localStorage.getItem('access_token') === null){                   
        //     window.location.href = '/login'
        // }
        // else{
            axios
            .get(apiUrl,
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(res => {
                setPosts(res.data);
                setIsLoading(false);
            })
            .catch(err => {
            console.log(err);
            });
    // };
}, []);

if (isLoading) {
    return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading.....</h1></div>;
}

return (
    <div>
        {/* {posts.length === 0 
        ? 
        (<div>
        <h1>Write your first post?</h1>
        <NavLink className="nav-link m-5 text-success" to={`/addpost`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </NavLink >
        </div>) 
        :
        <div className='d-flex justify-content-center'>

            <div className="d-flex justify-content-center">
                <div className="container m-4 d-flex flex-wrap justify-content-center align-items-center">
                        {posts.map((post) =>  <div><Mypost key={post.id} post={post} /></div>)}
                </div>
            </div>

        </div> 
        } */}
        allposts
    </div>
);
}