import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Constants';
let name, description;


export default function EditGroup() {
  let navigate = useNavigate();
  let param = useParams();
  let token = localStorage.getItem('access_token');
  let headers = { Authorization: `Bearer ${token}` };
  function getInfo(e) {
    if (e.target.id === 'name') {
      name = e.target.value;
    } else if (e.target.id === 'description') {
      description = e.target.value;
    }
  }
  function submit(e) {
    e.preventDefault();
    let postObj = {
      name,
      description,
    };
    axios
      .patch(
        `${BASE_URL}/groups/single_group/${param.id}/`,
        postObj,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        navigate(`/group/${param.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <form className="form" onSubmit={submit}>
        {/* Post Title */}
        <div className="container">
          <div className="form__group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              required
              name="name"
              type="text"
              placeholder="e.g. OOP"
              onBlur={getInfo}
            />
          </div>
          <div className="form__group">
            <label htmlFor="description">description</label>
            <input
              id="description"
              required
              name="description"
              type="text"
              placeholder="e.g. OOP"
              onBlur={getInfo}
            />
          </div>
          <input className="btn btn--main" type="submit" value="Edit group" />
        </div>
      </form>
    </div>
  );
}
