import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getUser, logout } from '../helpers/auth';

export default function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser(setUser);
  }, []);

  const navLinkStyles = { textDecoration: 'none', color: 'inherit' };

  return (
    <Box sx={{ flexGrow: 1, marginLeft: 0, marginRight: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={navLinkStyles}>
              Website Name
            </NavLink>
          </Typography>
          {!user._id ? (
            <>
              <Button color="inherit">
                <NavLink to="/register" style={navLinkStyles}>
                  Register
                </NavLink>
              </Button>
              <Button color="inherit">
                <NavLink to="/login" style={navLinkStyles}>
                  Login
                </NavLink>
              </Button>
              <Button color="inherit">
                <a style={navLinkStyles} href="/auth/google">
                  Google Login
                </a>
              </Button>
            </>
          ) : (
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
