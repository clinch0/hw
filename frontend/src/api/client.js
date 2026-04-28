const BASE_URL = 'http://localhost:3001/api/tasks';

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  
  return data;
};

export const getTasks = () => request('/');

export const createTask = (title) => 
  request('/', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });

export const updateTask = (id, status) => 
  request(`/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

export const deleteTask = (id) => 
  request(`/${id}`, {
    method: 'DELETE',
  });