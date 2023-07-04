import axios from 'axios';
import { BASE_URL } from '../Constants';

let token = localStorage.getItem('access_token');
console.log(token);
let headers = { Authorization: `Bearer ${token}` };

const Categories = async () => {
  const url = `${BASE_URL}/groups/categories/`;
  let content = {};
  try {
    let res = await axios.get(url, { headers });
    console.log(res);
    if (res.status === 200) {
      content = {
        status: res.status,
        data: res.data,
      };
      console.log('Success');
    }
  } catch (e) {
    content = {
      data: e,
    };
  }
  console.log(content);
  return content;
};

const singleCategory = async (categoryId) => {
  const url = `${BASE_URL}/groups/single_category/${categoryId}/`;
  let content = {};
  try {
    let res = await axios.get(url, { headers });
    if (res.status === 200) {
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

const getCategoryGroups = async (categoryId) => {
  const url = `${BASE_URL}/groups/category_groups/${categoryId}/`;
  let content = {};
  try {
    let res = await axios.get(url, { headers });
    if (res.status === 200) {
      console.log('Print the fucking things', res.data);
      content = {
        status: res.status,
        data: res.data
      };
    }
  } catch (e) {
    content = {
      data: e,
    };
  }

  return content;
};

const getSingleGroup = async (groupId) => {
  const url = `${BASE_URL}/groups/single_group_get/${groupId}/`;
  let content = {};
  try {
    let res = await axios.get(url, { headers });
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

const getGroupMembers = async (groupId) => {
  const url = `${BASE_URL}/groups/group_members/${groupId}/`;
  let content = {};
  try {
    let res = await axios.get(url, { headers });
    if (res.status === 200) {
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

const getUserGroups = async () => {
  const url = `${BASE_URL}/groups/user_groups/`;
  let content = {};
  try {
    let res = await axios.get(url, { headers });
    if (res.status === 200) {
      console.log('sssssssssss', res.data);
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

export const GroupApi = {
  Categories,
  singleCategory,
  getCategoryGroups,
  getSingleGroup,
  getGroupMembers,
  getUserGroups,
};
