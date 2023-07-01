import React, { useContext, useState } from 'react';
import { Topics } from './Topics';
import { Activity } from './Activity';
import { SearchContext } from '../context/SearchContext';

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
              <img src={user.avatar} alt="" />
            </div>
            <span>@{user.username}</span>
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
          <a href="room.html">{group.name}</a>
          <p className="roomListRoom__topic" style={{ alignSelf: 'center' }}>
            Join
          </p>
        </div>
        <div style={{ color: '#5dd693' }}>min Techbin: {group.min_techbin}</div>
        <p>{group.description}</p>
      </div>
    );
  });
  let postCards = posts.map((elem) => {
    return (
      <div className="roomListRoom">
        <div className="roomListRoom__header">
          <a href="profile.html" className="roomListRoom__author">
            <div className="avatar avatar--small">
              <img src="https://randomuser.me/api/portraits/women/11.jpg" />
            </div>
            <span>@amr</span>
          </a>
          <div className="roomListRoom__actions">
            <span>5 days ago</span>
          </div>
        </div>
        <div className="roomListRoom__content">
          <a href="room.html">JavaScript made Simple</a>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            ducimus harum dolorem, obcaecati mollitia omnis quasi aut
            consequuntur enim itaque labore.
          </p>
        </div>
        <div className="roomListRoom__meta">
          <a href="room.html" className="roomListRoom__joined">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <title>user-group</title>
              <path d="M30.539 20.766c-2.69-1.547-5.75-2.427-8.92-2.662 0.649 0.291 1.303 0.575 1.918 0.928 0.715 0.412 1.288 1.005 1.71 1.694 1.507 0.419 2.956 1.003 4.298 1.774 0.281 0.162 0.456 0.487 0.456 0.85v4.65h-4v2h5c0.553 0 1-0.447 1-1v-5.65c0-1.077-0.56-2.067-1.461-2.584z"></path>
              <path d="M22.539 20.766c-6.295-3.619-14.783-3.619-21.078 0-0.901 0.519-1.461 1.508-1.461 2.584v5.65c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-5.651c0-1.075-0.56-2.064-1.461-2.583zM22 28h-20v-4.65c0-0.362 0.175-0.688 0.457-0.85 5.691-3.271 13.394-3.271 19.086 0 0.282 0.162 0.457 0.487 0.457 0.849v4.651z"></path>
              <path d="M19.502 4.047c0.166-0.017 0.33-0.047 0.498-0.047 2.757 0 5 2.243 5 5s-2.243 5-5 5c-0.168 0-0.332-0.030-0.498-0.047-0.424 0.641-0.944 1.204-1.513 1.716 0.651 0.201 1.323 0.331 2.011 0.331 3.859 0 7-3.141 7-7s-3.141-7-7-7c-0.688 0-1.36 0.131-2.011 0.331 0.57 0.512 1.089 1.075 1.513 1.716z"></path>
              <path d="M12 16c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.859 0-7 3.141-7 7s3.141 7 7 7zM12 4c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5c0-2.757 2.243-5 5-5z"></path>
            </svg>
            5.3k Joined
          </a>
          <p className="roomListRoom__topic">Python</p>
        </div>
      </div>
    );
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
