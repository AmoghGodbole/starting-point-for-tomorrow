import Axios from 'axios';

export const getUser = async (setUser) => {
  const res = await Axios({
    method: 'GET',
    withCredentials: true,
    url: '/api/user'
  });
  if (res.data) {
    setUser(res.data);
  } else return {};
};

export const logout = async () => {
  await Axios({
    method: 'GET',
    withCredentials: true,
    url: '/api/logout'
  });
  await Axios({
    method: 'GET',
    withCredentials: true,
    url: '/api/cookie/delete'
  });
  window.localStorage.clear();
  window.location.href = '/';
};
