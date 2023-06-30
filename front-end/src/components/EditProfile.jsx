import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "../css/editProfile.css";
import { AuthContext } from "../context/AuthContext";
import { UserApi } from "../API/userAPI";

export default function EditProfile() {
  const { user, setUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({});
  const [submitValues, setSubmitValues] = useState({})


  // ****** Call my profile api to get use data
  const getUserProfileData = async () => {
    let res = await UserApi.myProfile();
    setFormValues({ ...res.data });
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  // ****** Handle form input changes
  const inputHandler = (e) => {
    if (e.target.name === "avatar") {
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
  };

  // ***** On submit form
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(submitValues)
    const formData = new FormData()
    for(let ele in submitValues){
        formData.append(ele, submitValues[ele])
    }
    let res = await UserApi.editMyProfile(formData)
    window.location.reload()
  };

 
  return (
    <div >
      <main className="create-room layout edit-profile-container">
        <div className="container">
          <div className="layout__box">
            <div className="layout__boxHeader">
              <div className="layout__boxTitle">
                <NavLink to="/profile">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <title>arrow-left</title>
                    <path d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"></path>
                  </svg>
                </NavLink>
                <h3>Profile</h3>
              </div>
            </div>

            <div className="settings layout__body">
              <div className="settings__avatar">
                <div className="avatar avatar--large active">
                  <img
                    src={
                      formValues.avatar
                        ? formValues.avatar
                        : null
                    }
                    id="preview-avatar"
                  />
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={onSubmitHandler} encType="multipart/form-data" className="form" >
                <div className="form__group form__avatar">
                  <label htmlFor="avatar">Upload Avatar</label>
                  <input
                    className="form__hide"
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={inputHandler}
                  />
                </div>

                  {/* First name */}
                <div className="form__group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="e.g. XYZ"
                    onChange={inputHandler}
                    value={formValues.firstname ? formValues.firstname : ""}
                  />
                </div>
                {/* Last name */}
                <div className="form__group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="e.g. XYZ"
                    onChange={inputHandler}
                    value={formValues.lastname ? formValues.lastname : ""}
                  />
                </div>

                {/* date of birth */}
                <div className="form__group">
                  <label htmlFor="dateofbirth">Date of Birth</label>
                  <input
                    id="dateofbirth"
                    name="dateofbirth"
                    type="date"
                    onChange={inputHandler}
                    value={formValues.dateofbirth ? formValues.dateofbirth : ""}
                  />
                </div>

                {/* Bio */}
                <div className="form__group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    onChange={inputHandler}
                    value={formValues.bio ? formValues.bio : ""}
                  />
                </div>

                {/* Email */}
                <div className="form__group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. user@domain.com"
                    value={formValues.email? formValues.email : ""}
                    readOnly
                    disabled
                  />
                </div>

                {/* User Name */}
                <div className="form__group">
                  <label htmlFor="username">User Name</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="e.g. @XYZ"
                    value={formValues.username? formValues.username : ""}
                    readOnly
                    disabled
                  />
                </div>

                {/* Techbin */}
                <div className="form__group">
                  <label htmlFor="username">Techbin</label>
                  <input
                    id="techbin"
                    name="techbin"
                    type="number"
                    placeholder="e.g. 123"
                    value={formValues.techbin? formValues.techbin : 0}
                    readOnly
                    disabled
                  />
                </div>

                <div className="form__action">
                  <input className="btn btn--main" type="submit" value='Update' />
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
