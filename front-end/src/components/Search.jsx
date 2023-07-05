import React, { useContext, useState } from 'react';
import { Topics } from './Topics';
import { Activity } from './Activity';
import { SearchContext } from '../context/SearchContext';
import { Mypost } from './Mypost';
import { BASE_URL } from '../Constants';

export default function Search() {
  let { searchResults } = useContext(SearchContext);
  let { users, posts, groups } = searchResults;
  let [pageData, setPageData] = useState('users');

  function userChoice(e) {
    if (e.target.textContent === 'Users') {
      setPageData('users');
    } else if (e.target.textContent === 'Groups') {
      setPageData('groups');
    } else if (e.target.textContent === 'Posts') {
      setPageData('posts');
    }
  }

  let userCards = users.map((user) => {
    return (
      <div className="roomListRoom">
        <div className="roomListRoom__header">
          <a href="profile.html" className="roomListRoom__author">
            <div className="avatar avatar--small">
              <img
                src={
                  user.avatar
                    ? `${BASE_URL}${user.avatar}`
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt=""
              />
            </div>
            <a href={`profile/${user.id}`}>@{user.username}</a>
          </a>
        </div>
        <div className="roomListRoom__content">
          <h3>{`${user.firstname} ${user.lastname}`}</h3>
          <div href="room.html">Techbin: {user.techbin}</div>
          <p>{user.bio}</p>
        </div>
      </div>
    );
  });

  let groupCards = groups.map((group) => {
    return (
      <div className="roomListRoom">
        <div
          className="roomListRoom__content"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <a href={`/group/${group.id}`}>{group.name}</a>
        </div>
        <div style={{ color: '#5dd693' }}>min Techbin: {group.min_techbin}</div>
        <p>{group.description}</p>
      </div>
    );
  });
  let postCards = posts.map((post) => {
    return <Mypost post={post} />;
  });
  let h4Style = {
    backgroundColor: '#6c757d',
    padding: '5px',
    borderRadius: '15px',
    cursor: 'pointer',
  };
  return (
    <main className="layout layout--3">
      <div className="container">
        <Topics />
        <div className="roomList">
          <div className="roomList__header">
            <div style={{ display: 'flex', gap: '10px' }}>
              <h4 style={h4Style} onClick={userChoice}>
                Users
              </h4>
              <h4 style={h4Style} onClick={userChoice}>
                Groups
              </h4>
              <h4 style={h4Style} onClick={userChoice}>
                Posts
              </h4>
            </div>
          </div>

          {pageData === 'users' ? (
            userCards.length === 0 ? (
              <div>we couldn’t find any matching results</div>
            ) : (
              userCards
            )
          ) : null}
          {pageData === 'groups' ? (
            groupCards.length === 0 ? (
              <div>we couldn’t find any matching results</div>
            ) : (
              groupCards
            )
          ) : null}
          {pageData === 'posts' ? (
            postCards.length === 0 ? (
              <div>we couldn’t find any matching results</div>
            ) : (
              postCards
            )
          ) : null}
        </div>
        <Activity />
      </div>
    </main>
  );
}
