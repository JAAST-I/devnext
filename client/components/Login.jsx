// TODO: STRETCH Feature: Modularize the code to work for Sign up and Login Component

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper,
  Grid,
  Avatar,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Link
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import cover from '../assets/cover.png';

/**
 * Login - Returns Login components
 * @returns {component} Login Component
 */
export default function Login() {
  const [state, setState] = useState({ username: '', password: '' });

  /** 
   * navigate - reroutes user to Route passing in State.
   * @param {string} Route
   * @param {object} State
   */
  const navigate = useNavigate();

    //******************* MUI **************************
    const paperStyle = {
      padding: 20,
      height: '60vh',
      width: 600,
      margin: '20px auto',
    };
    const avatarStyle = { backgroundColor: '#FF6F61' };
    const btnStyle = { margin: '8px 0' };
    // ***********************************************

  /**
   * submitHandler - When login form is submitted, perform a fetch request, and update state.
   * @param {object} event 
   */
  const submitHandler = (event) => {
    event.preventDefault(); // Prevents page from refreshing
    console.log(state);
    if (!state.username) alert('Please enter the Username');
    else if (!state.password) alert('Please enter the Password');
    else {
      // Endpoint for login post request
      const url = 'api/user/login';
      const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state), // stringified to JSON {username: , password: }
      };
      // Post request
      fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
          // On successful login, redirect to MainPage.jsx & inject state into the component
          if (data.success) {
            navigate('/home', { state: data.data });
          } 
          // On unsuccessful login, alert user and reset password field
          else {
            alert(data.message);
            setState({ ...state, password: '' });
          }
        });
    }
  };

  /**
   * changeHandler - Updates state with the username and password as those fields are filled out
   * @param {object} event 
   */
  const changeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              <LockOpenIcon />
            </Avatar>
            <img style={{ width: '500px' }} src={cover} />
            <h1>Sign In</h1>
          </Grid>
          <TextField
            label='Username'
            name='username'
            placeholder='Username'
            variant='standard'
            fullWidth
            required
            onChange={changeHandler}
          />
          <TextField
            label='Password'
            name='password'
            placeholder='Password'
            type='password'
            variant='standard'
            fullWidth
            required
            onChange={changeHandler}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label='Remember me'
            />
          </FormGroup>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            style={btnStyle}
            onClick={submitHandler}
          >
            Sign In
          </Button>
          <Typography>
            {/* nothing happening here with link, # is a default value */}
            <Link href='#'>Forgot Password?</Link>
          </Typography>
          <Typography>
            Don't have an account?
            <Link href='#'>Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
