import React, { useEffect, useState } from 'react';
import { Topics } from './Topics';
import { Activity } from './Activity';
import { PostApi } from '../API/PostAPI';
import { Mypost } from './Mypost';
import { activityApi } from '../API/activityAPI';

export function Home() {
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
    <main class="layout layout--3">
      <div class="container">
        <Topics />
        <div className="roomListRoom">
          {activity.map((post) => {
            return <Mypost post={post} />;
          })}
        </div>
        <Activity />
      </div>
    </main>
  );
}
