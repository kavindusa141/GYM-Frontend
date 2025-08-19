// client/src/api/members.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/members';

export const getMembers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addMember = async (memberData) => {
  const response = await axios.post(API_URL, memberData);
  return response.data;
};