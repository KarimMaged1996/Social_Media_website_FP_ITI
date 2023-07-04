import axios from 'axios';
import { BASE_URL } from '../Constants';

let token = localStorage.getItem('access_token');
console.log(token);
let headers = { Authorization: `Bearer ${token}` };

const AllPosts = async () => {
  let content = {};
  try {
    let res = await axios.get(`${BASE_URL}/api/myProfile/`, { headers });

    if (res.status === 200) {
      res.data.data['avatar'] = `${BASE_URL}${res.data.data['avatar']}`;
      // res.data.data['avatar'] = null
      content = {
        status: res.data.status,
        data: res.data.data,
      };
    }
  } catch (e) {
    content = {
      data: e,
    };
  }

  return content;
};

const createpost = async (formData) => {
  let content = {};
  try {
    let res = await axios.post(`${BASE_URL}/post/create`, formData, {
      headers,
    });

    if (res.status === 200) {
      console.log(res.data);
    }
  } catch (e) {
    content = {
      data: e,
    };
  }

  return content;
};

const editpost = async (id, formData) => {
  let content = {};
  try {
    let res = await axios.put(`${BASE_URL}/post/update/${id}`, { headers });

    if (res.status === 200) {
      console.log(res.data);
    }
  } catch (e) {
    content = {
      data: e,
    };
  }

  return content;
};

const homePosts = async () => {
  let content = {};
  try {
    let res = await axios.get(`${BASE_URL}/post/`, { headers });
    if (res.status === 200) {
      res.data.data['avatar'] = `${BASE_URL}${res.data.data['avatar']}`;
      // res.data.data['avatar'] = null
      content = {
        status: res.data.status,
        data: res.data.data,
      };
    }
  } catch (e) {
    content = {
      data: e,
    };
  }

  return content;
};
// User Posts
const userPosts = async ({ id }) => {
  let content = {};
  try {
    let res = await axios.get(`${BASE_URL}/post/user_posts/${id}/`, {
      headers,
    });
    console.log(res.data);
    if (res.status === 200) {
      content = {
        status: res.status,
        data: res.data,
      };
    }
  } catch (e) {
    content = {
      data: e,
    };
  }

  return content;
};

export const PostApi = {
  AllPosts,
  createpost,
  editpost,
  homePosts,
  userPosts,
};
