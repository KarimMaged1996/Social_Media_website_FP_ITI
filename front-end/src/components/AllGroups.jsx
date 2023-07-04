import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { GroupApi } from '../API/groupsAPI';

export  function AllGroups() {
  const [allGroups, setAllGroups] = useState([]);
  let { id } = useParams();
  console.log(id);
  const getGroups = async () => {
    try {
      const res = await GroupApi.getCategoryGroups(id);
      setAllGroups(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching category Groups:', error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
  return (
    <main class="create-room layout">
      <div class="container">
        <div class="layout__box">
          <div class="layout__boxHeader">
            <div class="layout__boxTitle">
              <a href="/">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <title>arrow-left</title>
                  <path
                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                  ></path>
                </svg>
              </a>
              <h3>Browse Categories</h3>
            </div>
          </div>

          <div class="topics-page layout__body">
            

            <ul class="topics__list">
              {allGroups && allGroups.map((element) => (
                <li>
                <a href={`/group/${element.id}/`}>{element.name}</a>
              </li>
              ))}
              
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
