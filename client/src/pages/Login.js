import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    const res = await Axios({
      method: 'POST',
      data: {
        username,
        password
      },
      withCredentials: true,
      url: '/api/user/login'
    });
    window.localStorage.setItem('currentUser', res.data._id);
    window.location.href = '/';
  };

  return (
    <div>
      <div className="mx-auto w-50">
        <h1 className="mb-4">Login as a customer</h1>
        <div className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            placeholder="username"
            required
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            required
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-primary" onClick={login}>
          Login
        </button>
        <p className="mt-2">
          Don't have an account? <Link to="/register">Create one!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
