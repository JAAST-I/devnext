import * as React from 'react';
import ProductItem from './ProductItem';
import Grid from '@mui/material/Grid';

/**
 * ProductContainer - Returns Grid component that contains ProductItems
 * @param {object} State
 * @returns {component} Grid component
 */
export default function ProductContainer({
  handleOpen,
  itemData,
  setCurrentItemDetails,
}) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
    >
      {itemData.map(
        ({ name, price, url, details, type, _id, username }, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <ProductItem
              name={name}
              price={price}
              url={url}
              details={details}
              type={type}
              id={_id}
              username={username}
              handleOpen={handleOpen}
              setItem={() => {
                setCurrentItemDetails({ name, price, url, details, type, _id });
              }}
            />
          </Grid>
        )
      )}
    </Grid>
  );
}
