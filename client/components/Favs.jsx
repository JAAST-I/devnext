import React from 'react';
import { Grid } from '@mui/material';
import FavsItem from './FavsItem';

/**
 *@represents Entire container for each individual FavsItem
 *@returns {component} Favs
 */

export default function Favs({ favs }) {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <div style={{ width: '80%', marginInline: 'auto' }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
          sx={{ marginInline: 'auto' }}
        >
          {favs.map((id, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <FavsItem id={id} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
