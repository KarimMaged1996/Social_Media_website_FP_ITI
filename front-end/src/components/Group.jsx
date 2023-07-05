import React from 'react';
import { Topics } from './Topics';
import { Activity } from './Activity';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GroupApi } from '../API/groupsAPI';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Mypost } from './Mypost';
import { BASE_URL } from '../Constants';

export default function Group() {
  let token = localStorage.getItem('access_token');
  let headers = { Authorization: `Bearer ${token}` };
  let param = useParams('id');
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let [group, setGroup] = useState({});
  let [isMember, setIsMember] = useState(false);
  let [isOwner, setIsOwner] = useState(false);
  let [posts, setPosts] = useState([]);
  let [joinErr, setJoinErr] = useState(false);
  let buttonStyles = {
    backgroundColor: '#6c757d',
    padding: '5px',
    borderRadius: '15px',
    cursor: 'pointer',
    marginTop: '5px',
  };

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
    let url = `${BASE_URL}/post/group_posts2/${param.id}/`;

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

  function leaveGroup() {
    let url = `${BASE_URL}/groups/leave_group/${param.id}/`;
    axios.delete(url, { headers });
    setIsMember(false);
  }
  function joinGroup() {
    let url = `${BASE_URL}/groups/join_group/${param.id}/`;
    axios
      .post(url, {}, { headers })
      .then((response) => {
        setIsMember(true);
      })
      .catch((errors) => {
        setJoinErr(true);
        console.log(errors);
      });
  }
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
                  <NavLink to={`/editgroup/${param.id}`}>
                    <p
                      href="edit-user.html"
                      className="btn btn--main btn--pill text-white"
                    >
                      Edit Group
                    </p>
                  </NavLink>
                )}
                {(isMember || isOwner) && (
                  <div>
                    {!isOwner && (
                      <div style={buttonStyles} onClick={leaveGroup}>
                        Leave
                      </div>
                    )}
                    <div
                      style={buttonStyles}
                      onClick={() => {
                        navigate(`/addpost/${param.id}`);
                      }}
                    >
                      Add Post
                    </div>
                  </div>
                )}
                {!isMember && !isOwner && (
                  <div>
                    <div style={buttonStyles} onClick={joinGroup}>
                      Join
                    </div>
                    {joinErr && (
                      <div style={{ color: 'red' }}>
                        Your techbin doesn't satisfy the group minimum techbin
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="profile__about">
                <h3>About</h3>
                <p>{group.description}</p>
              </div>
            </div>
          </div>
          {(isMember || isOwner) && (
            <div className="roomListRoom">
              {posts.map((post) => {
                return <Mypost post={post} />;
              })}
            </div>
          )}
        </div>
        <Activity />
      </div>
    </main>
  );
}
