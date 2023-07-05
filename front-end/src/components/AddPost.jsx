import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../css/editProfile.css';
import { PostApi } from '../API/PostAPI';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import {BASE_URL} from '../Constants'

export function AddPost() {
  // const {group} = props
  let param = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState(['1']);
  const { user } = useContext(AuthContext);
  const admin_id = user.id
  // const admin_id = 1;

  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    author: admin_id,
    video: '',
  });

  const [submitValues, setSubmitValues] = useState({
    title: '',
    content: '',
    author: admin_id,
    video: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    group: param.id,
  });
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [error, setError] = useState({
    title: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }
}, []);
  // ****** Handle form input changes
  const inputHandler = (e) => {
    if (
      e.target.name == 'image1' ||
      e.target.name == 'image2' ||
      e.target.name == 'image3' ||
      e.target.name == 'image4' ||
      e.target.name == 'video'
    ) {
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
    console.log(submitValues);
    console.log(formValues);
  };

  // checkbox one handeler
  const handleCheckbox1Change = (event) => {
    if (checkbox2 && event.target.checked) {
      setCheckbox1(event.target.checked);
      setCheckbox2(!event.target.checked);
    }
    else {
      setImages(['1']);
      setSubmitValues({
        ...submitValues,
        image1: '',
        image2: '',
        image3: '',
        image4: '',
      });
      setCheckbox1(event.target.checked);
    }
  };

  // checkbox two handeler
  const handleCheckbox2Change = (event) => {
    if (checkbox1 && event.target.checked) {
      setCheckbox2(event.target.checked);
      setCheckbox1(!event.target.checked);
      setImages([]);
    } else {
      setImages([]);
      setSubmitValues({
        ...submitValues,
        video: '',
      });
      setCheckbox2(event.target.checked);
    }
  };

  // adding images
  const addimage = () => {
    let length = images.length;
    let next = (length + 1).toString();
    if (images.length + 1 <= 4) {
      setImages([...images, next]);
    } else {
      setError({
        image: 'Maximum number of images is four',
      });
    }
  };

  // REMOVING AN IMAGE
  const removeimage = (e) => {
    setError({
      image: '',
    });

    let copy = images;
    copy.pop();
    console.log(copy);
    setImages([...copy]);
  };

  // ***** On submit form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios
        .post(`${BASE_URL}/post/create`, submitValues,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response)
            console.log("done!");
        });

    // let res = await PostApi.createpost(submitValues);
    navigate(`/group/${param.id}`);
  };

  return (
    <div>
      <main className="create-room layout edit-profile-container">
        <div className="container">
          <div className="layout__box">
            <div className="layout__boxHeader d-flex justify-content-between ">
              <a href={`/group/${param.id}`}>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                >
                  <title>arrow-left</title>
                  <path d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"></path>
                </svg>
              </a>
              <div className="layout__boxTitle">
                <h3>Add Post </h3>
              </div>
            </div>

            <div className="settings layout__body">
              {/* Post Form */}
              <form
                onSubmit={onSubmitHandler}
                encType="multipart/form-data"
                className="form"
              >
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
                    value={formValues.title ? formValues.title : ''}
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
                    value={formValues.content ? formValues.content : ''}
                  />
                </div>

                <div className="form__group">
                  <div className="d-flex justify-content-between">
                    <label className="" htmlFor="">
                      Media
                    </label>
                    <span>Optional</span>
                  </div>
                  <hr className="my-3" />

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

                {checkbox1 ? (
                  <div className="d-flex justify-content-between">
                    <div className="form__group d-flex flex-column ">
                      <label htmlFor="avatar">Upload Images </label>
                      {images.map((image) => (
                        <div
                          key={`${admin_id}${image}`}
                          className="d-flex align-items-center"
                        >
                          <div className="m-2">{`Image ${image}: `}</div>
                          <input
                            className="w-75 m-2"
                            type="file"
                            name={`image${image}`}
                            id="avatar"
                            placeholder="add image"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={inputHandler}
                          />
                          {image == images.length && image != 1 ? (
                            <div className="p-1" onClick={removeimage}>
                              <input
                                className="btn bg-danger fs-3  "
                                type="button"
                                name={`image${image}`}
                                value="x"
                              />
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="d-flex align-items-center m-2">
                      <i
                        className="btn btn--main fs-2 bi bi-plus-square-fill m-1"
                        onClick={addimage}
                      ></i>
                    </div>
                  </div>
                ) : null}

                {checkbox2 ? (
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
                ) : null}
                {error.image ? (
                  <div className="text-danger d-flex justify-content-center">
                    {error.image}
                  </div>
                ) : null}
                <div className="form__action m-5 d-flex justify-content-center">
                  <input
                    className="btn btn--main"
                    type="submit"
                    value="Add Post"
                  />
                </div>
              </form>
              {/* End Profile Form */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
