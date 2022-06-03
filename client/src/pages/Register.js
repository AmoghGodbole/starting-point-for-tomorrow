import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Axios from 'axios';
// import { locations } from "../../helpers/utils";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const register = async () => {
    await Axios({
      method: 'POST',
      data: {
        username,
        password
      },
      withCredentials: true,
      url: '/api/user/register'
    });
    navigate('/login');
  };

  return (
    <div>
      <div className="mx-auto w-50">
        <h1 className="mb-4">Register as a customer</h1>
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
        <button className="btn btn-outline-primary" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
