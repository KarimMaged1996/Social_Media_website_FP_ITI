import React, { useEffect, useState, useContext } from "react";
// import { UserContext } from '../context'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom'


export function Mypost() {

    let post_id = 2
    console.log("start")
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    async function getData() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/post/${post_id}`, {
                headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            console.log(response.data);
            setPost(response.data);
            setIsLoading(false);
            } catch (error) {
            console.error(error);
            }
        }
        

    useEffect(() => {
        // if(localStorage.getItem('access_token') === null){                   
        //     // window.location.href = '/login'
        //     console.log("dadwwd")
        // }
        // else{
        // getData()
            // console.log("here ")
            axios
            .get(`http://127.0.0.1:8000/post/${post_id}`,
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(res => {
                console.log(res.data)
                setPost(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        // };
    }, []);

    const sinceWhen = (created_at) => {
        const date = new Date(created_at);
        const now = new Date();

        const diff = now.getTime() - date.getTime();
        const diffSeconds = Math.round(diff / 1000);
        const diffMinutes = Math.round(diffSeconds / 60);
        const diffHours = Math.round(diffMinutes / 60);
        const diffDays = Math.round(diffHours / 24);

        if (diffSeconds < 60) {
            return "Less than a minute ago"
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minutes ago`
        } else if (diffHours < 24) {
            return `${diffHours} hours ago`
        } else {
            return `${diffDays} days ago`
        }
    }
    


    if (isLoading) {
        return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading...</h1></div>;
    }
    
    
    let NumOfImages = 0
    
    if (post.image4)
    {
        NumOfImages = 4
    }
    else if (post.image3)
    {
        NumOfImages = 3
    }
    else if (post.image2)
    {
        NumOfImages = 2
    }
    else if (post.image1)
    {
        NumOfImages = 1
    }

    console.log(NumOfImages)


    return (
    <div className='roomList container'>

        <div class="roomList__header m-2">
        <div>
            <h2>Recent Posts</h2>
        </div>
        </div>

        <div class="roomListRoom">
                <div class="roomListRoom__header">
                    <a href="profile.html" class="roomListRoom__author">
                        <div class="avatar avatar--small">
                        <img src={post.author.avatar} alt="pp" />
                        </div>
                        <NavLink className="nav-link" to={`/author/addbook`}>
                            <span>@{post.author.username}</span>
                        </NavLink >

                    </a>
                    <div class="roomListRoom__actions">
                        <span>{sinceWhen(post.created_at)}</span>
                    </div>
                    <div className="room__topRight">
                        <a href="#">
                            <svg
                            enable-background="new 0 0 24 24"
                            height="20"
                            viewBox="0 0 24 24"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <title>edit</title>
                            <g>
                                <path d="m23.5 22h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                            </g>
                            <g>
                                <g>
                                <path
                                    d="m2.5 22c-.131 0-.259-.052-.354-.146-.123-.123-.173-.3-.133-.468l1.09-4.625c.021-.09.067-.173.133-.239l14.143-14.143c.565-.566 1.554-.566 2.121 0l2.121 2.121c.283.283.439.66.439 1.061s-.156.778-.439 1.061l-14.142 14.141c-.065.066-.148.112-.239.133l-4.625 1.09c-.038.01-.077.014-.115.014zm1.544-4.873-.872 3.7 3.7-.872 14.042-14.041c.095-.095.146-.22.146-.354 0-.133-.052-.259-.146-.354l-2.121-2.121c-.19-.189-.518-.189-.707 0zm3.081 3.283h.01z"
                                />
                                </g>
                                <g>
                                <path
                                    d="m17.889 10.146c-.128 0-.256-.049-.354-.146l-3.535-3.536c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.536 3.536c.195.195.195.512 0 .707-.098.098-.226.146-.354.146z"
                                />
                                </g>
                            </g>
                            </svg>
                        </a>
                        <a href="#">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                                <title>remove</title>
                                <path
                                    d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                                ></path>
                            </svg>
                        </a>

                    </div>
                    
                </div>
                <div class="roomListRoom__content">
                <a href="room.html">{post.title}</a>
                <p>
                    {post.content}
                </p>
                </div>
                
                {NumOfImages>=1? <hr />: null}

                {NumOfImages == 1? 
                <div className="d-flex justify-content-around flex-wrap ">
                    <div className="d-flex justify-content-center m-2" style={{ width:'50%',  overflow: 'hidden' }} >
                        <img src={post.image1} alt="" style={{ height: 'auto', width: '100%' }}/>
                    </div>                     
                </div>
                : null}

                {NumOfImages == 2? 
                        <Container  >
                        <Row className="d-flex justify-content-center">
                            <Col xs={6}>
                                <img src={post.image1} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                            <Col xs={6}>
                                <img src={post.image1} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                        </Row>
                        </Container>
                : null}

                {NumOfImages == 3? 
                        <Container >
                        <Row className="d-flex justify-content-center">
                            <Col xs={6} md={3}>
                                <img src={post.image1} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                            <Col xs={6} md={3}>
                                <img src={post.image1} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                            <Col xs={6} md={3}> 
                                <img src={post.image1} alt="" style={{ height: 'auto', width: '100%', margin:'10px'}}/>
                            </Col>
                        </Row>
                        </Container>
                : null} 


                {NumOfImages == 4? 
                        <Container>
                        <Row>
                            <Col xs={6} md={3}>
                                <img src={post.image1} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                            <Col xs={6} md={3}>
                                <img src={post.image2} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                            <Col xs={6} md={3}> 
                                <img src={post.image3} alt="" style={{ height: 'auto', width: '100%', margin:'10px'}}/>
                            </Col>
                            <Col xs={6} md={3}>
                                <img src={post.image4} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                        </Row>
                        </Container>
                : null} 

                { post.video? 
                        <Container>
                        <Row>
                            <Col xs={6} md={3}>
                                <img src={post.video} alt="" style={{ height: 'auto', width: '100%', margin:'10px' }}/>
                            </Col>
                        </Row>
                        </Container>
                : null} 


                <div class=" m-3 roomListRoom__meta">
                <a href="room.html" class="roomListRoom__joined">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>user-group</title>
                    <path
                        d="M30.539 20.766c-2.69-1.547-5.75-2.427-8.92-2.662 0.649 0.291 1.303 0.575 1.918 0.928 0.715 0.412 1.288 1.005 1.71 1.694 1.507 0.419 2.956 1.003 4.298 1.774 0.281 0.162 0.456 0.487 0.456 0.85v4.65h-4v2h5c0.553 0 1-0.447 1-1v-5.65c0-1.077-0.56-2.067-1.461-2.584z"
                    ></path>
                    <path
                        d="M22.539 20.766c-6.295-3.619-14.783-3.619-21.078 0-0.901 0.519-1.461 1.508-1.461 2.584v5.65c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-5.651c0-1.075-0.56-2.064-1.461-2.583zM22 28h-20v-4.65c0-0.362 0.175-0.688 0.457-0.85 5.691-3.271 13.394-3.271 19.086 0 0.282 0.162 0.457 0.487 0.457 0.849v4.651z"
                    ></path>
                    <path
                        d="M19.502 4.047c0.166-0.017 0.33-0.047 0.498-0.047 2.757 0 5 2.243 5 5s-2.243 5-5 5c-0.168 0-0.332-0.030-0.498-0.047-0.424 0.641-0.944 1.204-1.513 1.716 0.651 0.201 1.323 0.331 2.011 0.331 3.859 0 7-3.141 7-7s-3.141-7-7-7c-0.688 0-1.36 0.131-2.011 0.331 0.57 0.512 1.089 1.075 1.513 1.716z"
                    ></path>
                    <path
                        d="M12 16c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.859 0-7 3.141-7 7s3.141 7 7 7zM12 4c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5c0-2.757 2.243-5 5-5z"
                    ></path>
                    </svg>
                    5.3k Joined
                </a>
                <p class="roomListRoom__topic">Python</p>
                </div>
            </div>

        </div>
    )
}
