import React, { useEffect, useState } from 'react';
import { activityApi } from '../API/activityAPI';
import moment from 'moment';

export function Activity() {
  const [activity, setActivity] = useState([]);
  const getActivity = async () => {
    try {
      const res = await activityApi.userActivity();
      console.log(res.data);
      setActivity(res.data);
      console.log(activity);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    getActivity();
  }, []);
  return (
    <div className="activities mb-3">
      <div className="activities__header">
        <h2>Recent Activities</h2>
      </div>
      {activity.slice(0, 3).map((item) => (
        <div className="activities__box" key={item.id}>
          <div class="activities__boxHeader roomListRoom__header">
            <a href={`/profile/${item.author.id}`} class="roomListRoom__author">
              <div class="avatar avatar--small">
                <img
                  src={
                    item.author.avatar
                      ? `http://127.0.0.1:8000${item.author.avatar}`
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  }
                  alt="Avatar"
                />
              </div>
              <p>
                @{item.author.username}
                <span>{moment(item.created_at).fromNow(true)} ago</span>
              </p>
            </a>
          </div>
          <div class="activities__boxContent">
            <p>
              posted “<a href={`/post/${item.id}`}>{item.title}</a>”
            </p>
            <div class="activities__boxRoomContent">
              {item.content.slice(0, 40)}...
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
