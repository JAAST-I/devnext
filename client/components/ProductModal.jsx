import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import '../styles/ProductModal.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function ProductModal({ currentItemDetails, handleClose }) {
  const { name, price, url, details, type, _id, username } = currentItemDetails;

  const data = { itemId: _id };

  function handleClick() {
    fetch('api/user/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.open(url);
        handleClose();
      })
      .catch((err) => {
        console.log(e.error);
      });
  }

  return (
    <div className='product-modal'>
      <div className='img-container'>
        <div className='inside-image-container'>
          <img className='imgModal' src={url} />
          <h1>Type: {type}</h1>
          <h1>Price: ${price}</h1>
        </div>
        <div className='txt-container'>
          <h1>{name}</h1>
          <Avatar
            alt='Howard Stark'
            src='https://dailysuperheroes.com/wp-content/uploads/2020/02/tony-stark.jpg'
            sx={{ width: 56, height: 56 }}
          />
          By {username}
          <p>{details}</p>
        </div>
      </div>
      <div className='product-modal'>
        <Stack
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          direction='row'
          spacing={2}
        >
          <IconButton>
            {/* <FavoriteIcon
              sx={{ color: red[500], fontSize: 50 }}
              onClick={handleClose}
            /> */}

            <FavoriteBorderOutlinedIcon
              sx={{ color: 'grey', fontSize: 50 }}
              onClick={handleClose}
            />
          </IconButton>

          <Button
            onClick={handleClick}
            sx={{ backgroundColor: '#80ed99' }}
            variant='contained'
          >
            Buy!
          </Button>
          <Button variant='outlined' color='error' onClick={handleClose}>
            CANCEL
          </Button>
        </Stack>
      </div>
    </div>
  );
}
