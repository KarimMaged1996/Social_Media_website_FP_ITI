import React from 'react';
import { useState, useEffect } from 'react';
import { GroupApi } from '../API/groupsAPI';

export function Topics() {
  const [categories, setCategories] = useState({});

  const getCategories = async () => {
    try {
      const res = await GroupApi.Categories();
      setCategories({...res.data});
      console.log(res)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div class="topics">
          <div class="topics__header">
            <h2>Your Communities</h2>
          </div>
          <ul class="topics__list">
            <li>
              <a href="/" class="active">All <span>553</span></a>
            </li>
            {Object.keys(categories).map((key) => (
                <li key={key}>
                  <a href="/">{categories[key].name} <span>232</span></a>
                </li>
              ))}
          </ul>
          <a class="btn btn--link" href="topics.html">
            More
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>chevron-down</title>
              <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
            </svg>
          </a>
        </div>
  );
}
