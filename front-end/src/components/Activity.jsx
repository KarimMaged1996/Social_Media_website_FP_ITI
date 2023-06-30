import React from 'react'
import { useState, useEffect } from 'react';
import { commentApi } from '../API/commentAPI';


export  function Activity() {
  const [activity, setActivity] = useState({});
  const getActivity = async () => {
    try {
      const res = await commentApi.AllComments();
      setActivity({...res.data});
      console.log(res)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  function truncateContent(content, wordLimit) {
    const words = content.split(' ');
  
    if (words.length > wordLimit) {
      const truncatedContent = words.slice(0, wordLimit).join(' ');
      return `${truncatedContent}...`;
    }
  
    return content;
  }
  useEffect(() => {
    getActivity();
  }, []);
  return (
    <div class="activities">
          <div class="activities__header">
            <h2>Recent Activities</h2>
          </div>
          {Object.keys(activity).map((key) => (
          <div class="activities__box" key={key}>
            <div class="activities__boxHeader roomListRoom__header">
              <a href="profile.html" class="roomListRoom__author">
                <div class="avatar avatar--small">
                  <img src="https://randomuser.me/api/portraits/women/11.jpg" />
                </div>
                <p>
                  @{activity[key].author}
                  <span>{activity[key].created_at}</span>
                </p>
              </a>
              <div class="roomListRoom__actions">
                <a href="#">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>remove</title>
                    <path
                      d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="activities__boxContent">
              <p>replied to post “<a href="room.html">{activity[key].post}</a>”</p>
              <div class="activities__boxRoomContent">
                {activity[key].content.slice(0, 30)}...
              </div>
            </div>
          </div>
         ))} 
        </div>
  )
}
