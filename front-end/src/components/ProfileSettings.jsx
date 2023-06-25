import React from 'react'

export function ProfileSettings() {
  return (
    <divc lass="update-account layout">
        <div className="container">
            <div className="layout__box text-white">
                <div className="layout__boxHeader">
                    <div className="layout__boxTitle">
                        <a href="profile.html">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                viewBox="0 0 32 32">
                                <title>arrow-left</title>
                                <path
                                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                                </path>
                            </svg>
                        </a>
                        <h3>Edit your profile</h3>
                    </div>
                </div>
                <div className="layout__body">
                    <form className="form" action="#">
                        <div className="form__group">
                            <label for="profile_pic">Avatar</label>
                            <input id="profile_pic" name="profile_pic" type="file" />
                        </div>

            <div className="form__group">
                <label for="username">Username</label>
                <input id="username" name="username" type="text" placeholder="E.g. Mohamed" />
            </div>

            <div className="form__group">
                <label for="email">Email</label>
                <input id="email" name="email" type="text" placeholder="E.g. mohamed@email.com" />
            </div>

                        <div className="form__group">
                            <label for="user_bio">Bio</label>
                            <textarea name="user_bio" id="user_bio" placeholder="Write about yourself..."></textarea>
                        </div>
                        <div className="form__action">
                            <a className="btn btn--dark text-white" href="index.html">Cancel</a>
                            <button className="btn btn--main text-white " type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </divc>
  )
}
