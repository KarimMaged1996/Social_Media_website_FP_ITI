import React, { useState, useEffect ,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Topics } from "./Topics";
import { Activity } from "./Activity";
import { UserApi } from '../API/userAPI';
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { PostApi } from '../API/PostAPI';
import { Mypost } from './Mypost';

export  function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo , setUserInfo] = useState({})
  const [userPosts , setUserPosts] = useState([])
  let { id } = useParams();
  const getUserInfo = async () => {
    try {
      const res = await UserApi.userProfile({id});
      setUserInfo(res.data);
    }
    catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
  const getUserPosts = async () => {
    try {
      const res = await PostApi.userPosts({id});
      setUserPosts(res.data);
    }
    catch (error) {
      console.error('Error fetching user info:', error);
    }
  } 
    useEffect(() => {
    getUserInfo();
    getUserPosts();
  }, []);
  return (
    <main className="profile-page layout layout--3 text-white ">
   
    <div className="container">
      {/* Topics Start */}
      <Topics />
  {/* Topics End */}


{/* Room List Start */}
<div className="roomList my-3">
 <div className="profile">
   <div className="profile__avatar">
     <div className="avatar avatar--large active">
     <img
        src={userInfo.avatar? `http://127.0.0.1:8000${userInfo.avatar}`
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
        alt="Avatar"/>
     </div>
   </div>
   <div className="profile__info">
     <h3>{userInfo.username}</h3>

     <div style={{ fontSize: '2rem' }}>Techbin: <span>{userInfo.techbin}</span></div>

     {user?.id === userInfo.id && (
  <NavLink to="/editprofile">
    <p className="btn btn--main btn--pill text-white">Edit Profile</p>
  </NavLink>
)}

   </div>
   <div className="profile__about">
     <h3>About</h3>
     <p>
       {userInfo.bio}
     </p>
   </div>
 </div>
{/* Posts starts here */}
  <div className="roomListRoom">
    {userPosts.map((post) => {
      return <Mypost post={post} />
    })}
</div>
 
{/* Posts ends here */}
</div>
{/* Room List End */}

{/* Activities Start */}
<Activity />
{/* Activities End */}
</div>
</main>     
  )
}
