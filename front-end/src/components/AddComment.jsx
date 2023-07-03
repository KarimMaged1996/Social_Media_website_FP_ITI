import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../css/editProfile.css";
import { AuthContext } from "../context/AuthContext";
import { PostApi } from "../API/PostAPI";
import axios from "axios";


export function AddComment(props) {
    
    const admin_id = 1
    let {post_id} = props

    const [formValues, setFormValues] = useState({
        content: "",
        author: admin_id,
        post: post_id,
    });

    const [submitValues, setSubmitValues] = useState({
        content: "",
        author: admin_id,
        post: post_id,
    })

    const [error, setError] = useState({
        content: ""
    })
    // ****** Handle form input changes
    const inputHandler = (e) => {       
        setSubmitValues({
            ...submitValues,
            [e.target.name]: e.target.value,
        });
        setFormValues({
        ...formValues,
        [   e.target.name]: e.target.value,
        });
    };
    console.log(submitValues)

    
  // ***** On submit form
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios
            .post(`http://127.0.0.1:8000/comment/create`, submitValues,{
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response)
                console.log("done!");
                // window.location.reload();
            })
            .catch((err) => {
                console.log("error");
            });
        
    };

    return (
    <div >

        <div className='roomList container' style={{ width:"75vw"}}>
            <div class="roomListRoom ">
                <div class="roomListRoom__header">
                    <div class="roomListRoom__actions">
                        <span>Add Post</span>
                    </div>
                </div>

                <div class="roomListRoom__content">

                    <div className="settings layout__body">
                        {/* Comment Form */}
                        <form onSubmit={onSubmitHandler} encType="multipart/form-data" className="form" >

                            {/* Comment  Content*/}
                            <div className="form__group">
                                <label htmlFor="content">Comment Content</label>
                                <textarea
                                required
                                id="postContent"
                                name="content"
                                row={3}
                                onChange={inputHandler}
                                value={formValues.content ? formValues.content : ""}
                                />
                            </div>
                            
                            <div className="form__action m-5 d-flex justify-content-center">
                                <input className="btn btn--main" type="submit" value='Add Comment' />
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </div>
    </div>
    )
}
