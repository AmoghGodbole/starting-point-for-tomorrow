// Can only be accessed if a user is logged in. How we can manage this without protected routes
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const TestList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(
      'Test user in window: ',
      window.localStorage.getItem('currentUser')
    );
    console.log(
      'Test user in cookie: ',
      document.cookie
        ?.split('; ')
        ?.find((row) => row.startsWith('currentUser'))
        ?.split('=')[1]
    );
    if (
      !window.localStorage.getItem('currentUser') &&
      !document.cookie
        ?.split('; ')
        ?.find((row) => row.startsWith('currentUser'))
        ?.split('=')[1]
    ) {
      navigate('/login');
    }
  }, []);

  return <div>TestList</div>;
};

export default TestList;
