import React, { useState } from 'react';
import Post from './Post';
import ProductModal from './ProductModal';
import ProductContainer from './ProductContainer';
import { Fab, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/Home.css';

/**
 * Home
 * @Represents main container of website
 * @returns {component} Home Component
 */

export default function Home({ itemData, reset, userId, username }) {
  const [openPost, setOpenPost] = useState(false);
  const [openItem, setOpenItem] = useState(false); // true
  const [currentItemDetails, setCurrentItemDetails] = useState(null); //describes what needs to be rendered inside of productModal component { name, url, details, price, type, id, username }

  // TODO: the states can be refactored
  const handleOpenPost = () => setOpenPost(true);
  const handleClosePost = () => setOpenPost(false);

  const handleOpenItem = () => setOpenItem(true);
  const handleCloseItem = () => setOpenItem(false);

  return (
    <div className='home'>
      <div className='container'>
        <ProductContainer
          setCurrentItemDetails={setCurrentItemDetails}
          handleOpen={handleOpenItem}
          itemData={itemData}
        />
      </div>
      <Fab // blue add button
        color='primary'
        sx={{ position: 'absolute', top: 0, right: 0, marginBlock: 1 }}
        aria-label='add'
        onClick={handleOpenPost}
      >
        <AddIcon />
      </Fab>
      <Dialog fullWidth open={openPost} maxWidth='sm'>
        {/* doesn't render until // you click on blue button */}
        <Post
          id={userId}
          username={username}
          handleClose={handleClosePost}
          reset={() => reset()}
        />
      </Dialog>
      {/* doesn't render until you click on product item */}
      <Dialog fullWidth open={openItem} maxWidth='lg'>
        <ProductModal
          currentItemDetails={currentItemDetails}
          handleClose={handleCloseItem}
        />
      </Dialog>
    </div>
  );
}
