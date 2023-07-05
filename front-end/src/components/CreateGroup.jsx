import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../Constants';
import axios from 'axios';

let name, description, minTech;
export default function CreateGroup() {
  let { user } = useContext(AuthContext);
  let { id } = useParams();
  let navigate = useNavigate();
  let token = localStorage.getItem('access_token');
  let headers = { Authorization: `Bearer ${token}` };
  function getInfo(e) {
    if (e.target.id === 'name') {
      name = e.target.value;
    } else if (e.target.id === 'description') {
      description = e.target.value;
    } else if (e.target.id === 'minTech') {
      minTech = e.target.value;
    }
  }
  function submit(e) {
    e.preventDefault();
    let postObj = {
      category: id,
      name: name,
      description: description,
      min_techbin: minTech,
      owner: user.id,
    };
    axios
      .post(`${BASE_URL}/groups/category_groups/${id}/`, postObj, {
        headers,
      })
      .then((response) => {
        let group_id = response.data.id;
        axios
          .post(
            `${BASE_URL}/groups/join_group/${group_id}/`,
            {},
            { headers }
          )
          .then((response) => {
            navigate(`/group/${group_id}`);
          })
          .catch((errors) => {
            console.log(errors);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container">
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
          <div className="form__group">
            <label htmlFor="minTech">min Techbin</label>
            <input
              id="minTech"
              required
              name="minTech"
              type="number"
              onBlur={getInfo}
            />
          </div>
          <input className="btn btn--main" type="submit" value="Create group" />
        </div>
      </form>
    </div>
  );
}
