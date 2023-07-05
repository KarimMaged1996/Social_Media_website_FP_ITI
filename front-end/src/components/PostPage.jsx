import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import axios from "axios";
import { Mypost } from './Mypost';
import { Mycomment } from './Mycomment';
import { AddComment } from './AddComment';
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {BASE_URL} from '../Constants'
export function PostPage(props) {

    const{user}= useContext(AuthContext);
    console.log(user)

    let { post_id } = useParams();
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    let postapiUrl = `${BASE_URL}/post/${post_id}`
    let commentsapiUrl = `${BASE_URL}/comment/post_comments/${post_id}/`

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
            axios
            .get(postapiUrl,
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(res => {
                setPost(res.data);
                setIsLoading1(false);
            })
            .catch(err => {
            console.log(err);
            });

            axios
            .get(commentsapiUrl,
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(res => {
                setComments(res.data);
                setIsLoading2(false);
            })
            .catch(err => {
            console.log(err);
            });
    };
}, []);

// console.log(post)
// console.log(comments)

if (isLoading1 || isLoading2) {
    return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading.....</h1></div>;
}

return (
    <div>

        {post.length === 0 
        ? 
        <div>
        <h1>No Posts</h1>
        <NavLink className="nav-link m-5 text-success" to={`/addpost`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </NavLink >
        </div>
        :
        <div className='d-flex justify-content-center'>

            <div className="d-flex justify-content-center w-100">
                <div className="container m-4 d-flex flex-wrap justify-content-center align-items-center">
                        <Mypost key={post.id} post={post} />
                </div>
            </div>

        </div> 
        }



        {comments.length === 0 
        ? 
        <div className='d-flex justify-content-center'>
            <h1> No Comments Yet </h1>
            {/* <div>
                
                <NavLink className="nav-link m-5 text-success" to={`/addpost`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                </NavLink >
            </div> */}
        </div>
        :
        <div className='d-flex justify-content-center'>

            <div className="d-flex justify-content-center w-100">
                <div className="container flex-column m-4 d-flex flex-wrap justify-content-center align-items-center" style={{ width:"75vw"}}>
                        {comments.map((comment) =>  <div><Mycomment key={comment.id} comment={comment} /></div>)}
                </div>
            </div>

        </div> 
        }

        <AddComment post_id={post_id}></AddComment>

    </div>
);
}