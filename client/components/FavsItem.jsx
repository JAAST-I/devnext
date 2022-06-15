import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

export default function FavsItem({ handleOpen, favs }) {
  return (
    <Card onClick={handleOpen} sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia
        component='img'
        height='194'
        image='https://intl-blog.imgix.net/wp-content/uploads/2021/10/what-is-software-CA-Capterra-Header.png?auto=format%2Cenhance'
        alt='Product Placeholder'
      />
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={0}
        >
          <Typography variant='subtitle1' color='text.primary'>
            Product Name
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            Placeholder
          </Typography>
        </Stack>
        <Chip
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 1,
            backgroundColor: '#d9ed92',
          }}
          size='small'
          label='Product'
        />
      </CardContent>
      <IconButton aria-label='share'>
        <DeleteIcon sx={{ fontSize: 25 }} />
      </IconButton>
    </Card>
  );
}
