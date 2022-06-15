import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cover from '../assets/cover.png';

export default function Login() {
  const [state, setState] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 600,
    margin: '20px auto',
  };

  const avatarStyle = { backgroundColor: '#FF6F61' };
  const btnStyle = { margin: '8px 0' };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(state);
    if (!state.username) alert('Please enter the Username');
    else if (!state.password) alert('Please enter the Password');
    else {
      const url = 'api/user/login';
      const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      };
      fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data.data);
            navigate('/home', { state: data.data });
          } else {
            alert(data.message);
            setState({ ...state, password: '' });
          }
        });
    }
  };

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
