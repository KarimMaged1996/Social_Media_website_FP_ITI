import React from 'react';
import { useState, useEffect } from 'react';
import { GroupApi } from '../API/groupsAPI';

export function Topics() {
  const [userGroups, setUserGroups] = useState([]);

  const getGroups = async () => {
    try {
      const res = await GroupApi.getUserGroups();
      setUserGroups(res.data);
      console.log('wwwwww', userGroups);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div class="topics">
      <div class="topics__header">
        <h2>Your Communities</h2>
      </div>
      <ul className="topics__list">
        {userGroups.length === 0 ? (
          <li>
            <a href="/explore" className="active">
              Explore Communities
            </a>
          </li>
        ) : (
          userGroups.map((element) => (
            <li key={element.group_id.id}>
              <a href={`/group/${element.group_id.id}/`}>
                {element.group_id.name}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
