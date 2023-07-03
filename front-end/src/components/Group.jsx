import React from 'react';
import { Topics } from './Topics';
import { Activity } from './Activity';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GroupApi } from '../API/groupsAPI';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Mypost } from './Mypost';

export default function Group() {
  let param = useParams('id');
  const { user } = useContext(AuthContext);
  let [group, setGroup] = useState({});
  let [isMember, setIsMember] = useState(false);
  let [isOwner, setIsOwner] = useState(false);
  let [posts, setPosts] = useState([]);

  // function to get the group and the userjoinedgroups
  // and set the isMember and isOwner states
  let getGroupContent = async () => {
    try {
      let groupContent = await GroupApi.getSingleGroup(param.id);
      let userJoinedGroups = await GroupApi.getUserGroups();
      setGroup(groupContent.data);
      let UserJoinedGroupsIds = userJoinedGroups.data.map((elem) => {
        return elem.group_id.id;
      });

      UserJoinedGroupsIds.includes(Number(param.id))
        ? setIsMember(true)
        : setIsMember(false);
      user?.id === group.owner ? setIsOwner(true) : setIsOwner(false);
    } catch (error) {
      console.log(error);
    }
  };
  function getPosts() {
    let token = localStorage.getItem('access_token');
    let url = `http://127.0.0.1:8000/post/group_posts/${param.id}/`;
    let headers = { Authorization: `Bearer ${token}` };
    console.log(token);
    axios
      .get(url, { headers })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  useEffect(() => {
    getGroupContent();
    getPosts();
  }, [isMember, isOwner]);
  return (
    <main className="profile-page layout layout--3 text-white ">
      <div className="container">
        <Topics />

        <div>
          <div className="roomList my-3">
            <div className="profile">
              <div className="profile__info">
                <h1>{group.name} </h1>
                <div style={{ fontSize: '2rem' }}>
                  Min Techbin: <span>{group.min_techbin}</span>
                </div>

                {isOwner && (
                  <NavLink to="/editGroup">
                    <p
                      href="edit-user.html"
                      className="btn btn--main btn--pill text-white"
                    >
                      Edit Profile
                    </p>
                  </NavLink>
                )}
                {isMember && !isOwner && (
                  <div
                    style={{
                      backgroundColor: '#6c757d',
                      padding: '5px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    Leave
                  </div>
                )}
                {!isMember && (
                  <div
                    style={{
                      backgroundColor: '#6c757d',
                      padding: '5px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    Join
                  </div>
                )}
              </div>
              <div className="profile__about">
                <h3>About</h3>
                <p>{group.description}</p>
              </div>
            </div>
          </div>
          <div className="roomListRoom">
            {posts.map((post) => {
              return <Mypost post={post} />;
            })}
          </div>
        </div>
        <Activity />
      </div>
    </main>
  );
}
