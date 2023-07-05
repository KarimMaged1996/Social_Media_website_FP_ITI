import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "../css/editProfile.css";
import { AuthContext } from "../context/AuthContext";
import { PostApi } from "../API/PostAPI";
import axios from "axios";
import {BASE_URL} from '../Constants'
import { useRef } from 'react';
// import { useHistory } from 'react-router-dom';

export function EditPost() {

    const{user}= useContext(AuthContext);
    console.log(user)

    let { id } = useParams();
    let post_id = id
    const [images, setImages] = useState([
        "1"
    ])
    const navigate = useNavigate()

    const [imagesfile, setImagesfile] = useState([
        {"image": null},
        {"image": null},
        {"image": null},
        {"image": null},
    ])

    const admin_id = 1
    const [formValues, setFormValues] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    // const [submitValues, setSubmitValues] = useState({
    //     title:"",
    //     content: "",
    //     author: admin_id,
    //     video: null,
    //     image1: null,
    //     image2: null,
    //     image3: null,
    //     image4: null,
    // })
    const [submitValues, setSubmitValues] = useState({})
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [error, setError] = useState({
        title: "",
        content: "",
        image: ""
    })

    
    // const history = useHistory();

    // function goback() {
    //     history.goBack();
    // }
    // const location = useLocation();
    // const previousLocation = useRef(null);

    // useEffect(() => {
    //     previousLocation.current = location;
    // }, [location]);


    useEffect(() => {

        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
            axios
            .get(`${BASE_URL}/post/${post_id}`,
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(res => {
                setFormValues(res.data);
                // console.log(formValues)
                if (res.data.image1) {
                    setCheckbox1(true);
                    setImagesfile([
                        {"image": res.data.image1},
                        {"image": res.data.image2},
                        {"image": res.data.image3},
                        {"image": res.data.image4},
                    ])

                } else if (res.data.video) {
                    setCheckbox2(true);
                    setImagesfile([
                        {"video": res.data.video},
                        {"image": null},
                        {"image": null},
                        {"image": null},
                        {"image": null},
                    ])
                }
                else {
                    setImagesfile([
                        {"image": null},
                        {"image": null},
                        {"image": null},
                        {"image": null},
                    ])
                }

                if(res.data.image2){
                    setImages(["1","2"])
                }

                if(res.data.image3){
                    setImages(["1","2","3"])
                }

                if(res.data.image4){
                    setImages(["1","2","3","4"])
                }



                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        };
    }, []);


    console.log(imagesfile)
    
    console.log((imagesfile[2]).image!=null)
    console.log((imagesfile[0]).image!=null)
    console.log(imagesfile[1])

    // console.log(formValues)
    




    // ****** Handle form input changes
    const inputHandler = (e) => {
    if (e.target.name == "image1" || e.target.name == "image2" || e.target.name == "image3" || e.target.name == "image4" || e.target.name == "video") {
        setSubmitValues({
            ...submitValues,
            [e.target.name]: e.target.files[0],

        });
    } else {
        
        setSubmitValues({
        ...submitValues,
        [e.target.name]: e.target.value,
        });

        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }
    console.log(formValues)
    console.log(formValues)
    };

    // checkbox one handeler 
    const handleCheckbox1Change = (event) => {
        if (checkbox2 && event.target.checked)
        {
            setCheckbox1(event.target.checked);
            setCheckbox2(!event.target.checked);
        }
        else {
            setImages([
                "1"
            ])
            // setFormValues({
            //     ...formValues,
            //     image1:"",
            //     image2:"",
            //     image3:"",
            //     image4:"",
            //     });
            setSubmitValues({
                ...submitValues,
                image1:"",
                image2:"",
                image3:"",
                image4:"",
            })

            setCheckbox1(event.target.checked);
        }
    };
    
    // checkbox two handeler 
    const handleCheckbox2Change = (event) => 
    {
        if (checkbox1 && event.target.checked)
        {
            setCheckbox2(event.target.checked);
            setCheckbox1(!event.target.checked);
            setImages([])
        }
        else
        {
            setImages([]);
            setSubmitValues({
                ...submitValues,
                video: '',
            });
            setCheckbox2(event.target.checked);
        }
    };

    // adding images 
    const addimage = () => 
    {
        // setIsLoading(true)
        let length = images.length;

        let next = (length + 1).toString()
        console.log(next)
        if (images.length+1 <= 4)
        {
            setImages([
                ...images,
                next
            ])
            // setIsLoading(false)
        }
        else{
            
            setError({
                image : "Maximum number of images is four"
            })
        }
    }
    console.log(images)
    
    // REMOVING AN IMAGE
    const removeimage = (e) => {
        let name = e.target.name
        const imagenumber = parseInt(name.slice(-1), 10);
        setError({
            image : ""
        })

        let copy = images
        copy.pop()
        setImages([...copy])

        setFormValues({
            ...formValues,
            [e.target.name]:null,
        });
        setSubmitValues({
            ...submitValues,
            [e.target.name]:"",
        });
        
        setImagesfile(imagesfile.map((obj, index) => {
            if (index === (imagenumber-1)) {
                return { image: null };
            }
            return obj;
        }));
    }

    // console.log(formValues)
    // console.log(imagesfile)
    // console.log(submitValues)

  // ***** On submit form
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios
            .patch(`${BASE_URL}/post/update/${post_id}`, submitValues,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response)
                console.log("done!");
            })
            .catch((err) => {
                console.log(err);
            })

        // let res = await PostApi.editpost(post_id,formValues)
        navigate (`/post/${post_id}`)
    };

    if (isLoading) {
        return <div className="d-flex jsutify-content-center m-5 align-items-center"><h1>Loading...</h1></div>;
    }
    

    return (
        <div  style={{ width:"75vw"}} >
            <main className="create-room layout edit-profile-container">
            <div className="container">
                <div className="layout__box">
                <div className="layout__boxHeader d-flex justify-content-between ">
                    <a href={`/post/${post_id}`} >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                        <title>arrow-left</title>
                        <path
                        d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                        </path>
                    </svg>
                    </a>
                    <div className="layout__boxTitle">
                        <h3>Edit Post </h3>
                    </div>
                </div>
    
                {formValues.author.id == user.id?
                <div className="settings layout__body">
                    {/* Post Form */}
                    <form onSubmit={onSubmitHandler} encType="multipart/form-data" className="form" >
    
                    {/* Post Title */}
                    <div className="form__group">
                        <label htmlFor="title">Title</label>
                        <input
                        id="title"
                        required
                        name="title"
                        type="text"
                        placeholder="e.g. OOP"
                        onChange={inputHandler}
                        value={formValues.title ? formValues.title : ""}
                        />
                    </div>

                    {/* Post COntent*/}
                    <div className="form__group">
                        <label htmlFor="content">Post Content</label>
                        <textarea
                        required
                        id="postContent"
                        name="content"
                        onChange={inputHandler}
                        value={formValues.content ? formValues.content : ""}
                        />
                    </div>

                    <div className="form__group">
                        <div className="d-flex justify-content-between">
                            <label className="" htmlFor="">Media</label>
                            <span>Optional</span>
                        </div>
                        <hr className="my-3"/>
                        
                        <div className="d-flex justify-content-center ">

                            <div className="d-flex justify-content-center w-50 ">
                                <label htmlFor="image">Image</label>
                                <input
                                id="image"
                                name="image"
                                type="checkbox"
                                value="image"
                                checked={checkbox1} 
                                onChange={handleCheckbox1Change}
                                />
                            </div>

                            <div className="d-flex justify-content-center w-50 ">
                                <label htmlFor="video">Video</label>
                                <input
                                id="video "
                                name="video"
                                type="checkbox"
                                value="video"
                                checked={checkbox2} 
                                onChange={handleCheckbox2Change}
                                />
                            </div>

                        </div>
                    </div>

                    { checkbox1 ?  
                    <div className="d-flex justify-content-between">

                        <div className="form__group d-flex flex-column ">
                            <label htmlFor="avatar">Upload Images </label>


                            {/* for each existing image  */}
                            {images.map((imagenum) => 
                                <div key={`${admin_id}${imagenum}`} className="d-flex align-items-center">

                                    {/* image */}

                                    {(imagesfile[parseInt(imagenum)-1]).image!=null? 
                                        <div class="avatar avatar--small">
 
                                            <img src={`${(imagesfile[parseInt(imagenum)-1]).image}`} alt="pp" />
                                        </div> 
                                    :null}

                                    {/* input field  */}
                                    <div className="m-2">{`Image ${imagenum}: `}</div>
                                    <input
                                    className="w-75 m-2"
                                    type="file"
                                    name={`image${imagenum}`}
                                    id="avatar"
                                    placeholder="add image"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={inputHandler}
                                    />
                                    {/* delete button */}
                                    { imagenum == images.length && imagenum != 1 ? <div className="p-1" >
                                        <input className="btn bg-danger fs-3  " type="button" name={`image${imagenum}`} value="x" onClick={removeimage} />
                                    </div> : null}
                                </div>
                            )}

                        </div>

                        <div className="d-flex align-items-center m-2">
                            <i
                                className="btn btn--main fs-2 bi bi-plus-square-fill m-1"
                                onClick={addimage}
                            ></i>
                        </div>
                    </div> : null}

                    { checkbox2 ?
                        <div className="form__group form__avatar">
                            <label htmlFor="video">Upload Video</label>
                            <input
                                className=""
                                type="file"
                                name="video"
                                id="video"
                                accept="video/mp4, video/webm, video/ogg"
                                onChange={inputHandler}
                                />
                        </div>
                    : null}
                    { error.image? <div className="text-danger d-flex justify-content-center">{error.image}</div> : null}
                    <div className="form__action m-5 d-flex justify-content-center">
                        <input className="btn btn--main" type="submit" value='Save Post' />
                    </div>
                    </form>
                    {/* End Profile Form */}
                </div>
                : <div className="d-flex justify-content-center align-items-center"><h1>not allowed </h1></div>}
                </div>
            </div>
            </main>
      </div>
    )
}
