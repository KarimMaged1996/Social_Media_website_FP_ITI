import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {  useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../Constants'


export function EditComment() {

    let { id } = useParams();
    let comment_id = id
    const navigate = useNavigate()
    const{user}= useContext(AuthContext);

    const [formValues, setFormValues] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [submitValues, setSubmitValues] = useState({})
    const [error, setError] = useState({
        content: "",
    })

    useEffect(() => {

        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{

            axios
            .get(`${BASE_URL}/comment/${comment_id}`,
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(res => {
                setFormValues(res.data);
                setIsLoading(false);

            })
            .catch(err => {
                console.log(err);
            });
        };
    }, []);

    if (isLoading) {
        return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading.....</h1></div>;
    }

    // ****** Handle form input changes
    const inputHandler = (e) => {

        setSubmitValues({
            ...submitValues,
            [e.target.name]: e.target.value,
        });

        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });

    };
    console.log(formValues);
    console.log(submitValues);


  // ***** On submit form
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios
            .patch(`${BASE_URL}/comment/update/${comment_id}`, submitValues,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                
                // console.log(response)
                // console.log("done!");
            })
            .catch((err) => {
                console.log(err);
            })
        navigate (`/post/${formValues.post.id}`)

        // let res = await PostApi.editpost(post_id,formValues)
        // window.location.reload()
    };


    return (
        <div >
            <main className="create-room layout edit-profile-container">
            <div className="container">
                <div className="layout__box">
                <div className="layout__boxHeader d-flex justify-content-between ">
                    <a href="#" onClick={()=>{navigate(`/post/${formValues.post.id}`)}}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                        <title>arrow-left</title>
                        <path
                        d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                        </path>
                    </svg>
                    </a>
                    <div className="layout__boxTitle">
                        <h3>Edit comment </h3>
                    </div>
                </div>
    
                {formValues.author.id == user.id?
                <div className="settings layout__body">
                    {/* commet Form */}
                    <form onSubmit={onSubmitHandler} encType="multipart/form-data" className="form" >


                    {/* comment Content*/}
                    <div className="form__group">
                        <label htmlFor="content">Comment Content</label>
                        <textarea
                        required
                        id="commentContent"
                        name="content"
                        onChange={inputHandler}
                        value={formValues.content ? formValues.content : ""}
                        />
                    </div>

                    <div className="form__action m-5 d-flex justify-content-center">
                        <input className="btn btn--main" type="submit" value='Save Comment' />
                    </div>

                    </form>
                    {/* End Profile Form */}
                </div>
                :<div className="d-flex justify-content-center align-items-center"><h1>not allowed </h1></div>}
                </div>
            </div>
            </main>
    </div>
    )
}
