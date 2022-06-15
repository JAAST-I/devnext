import React, { useState } from 'react';
import ProductContainer from './ProductContainer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../styles/Home.css';
import Dialog from '@mui/material/Dialog';
import Post from './Post';
import ProductModal from './ProductModal';

export default function Home({ itemData, reset, userId, username }) {
  const [openPost, setOpenPost] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [currentItemDetails, setCurrentItemDetails] = useState(null);

  const handleClosePost = () => setOpenPost(false);
  const handleCloseItem = () => setOpenItem(false);

  const handleOpenItem = () => setOpenItem(true);
  const handleOpenPost = () => setOpenPost(true);

  return (
    <div className='home'>
      <div className='container'>
        <ProductContainer
          setCurrentItemDetails={setCurrentItemDetails}
          handleOpen={handleOpenItem}
          itemData={itemData}
        />
      </div>
      <Fab
        color='primary'
        sx={{ position: 'absolute', top: 0, right: 0, marginBlock: 1 }}
        aria-label='add'
        onClick={handleOpenPost}
      >
        <AddIcon />
      </Fab>
      <Dialog fullWidth open={openPost} maxWidth='sm'>
        <Post
          id={userId}
          username={username}
          handleClose={() => {
            handleClosePost();
            reset();
          }}
        />
      </Dialog>
      <Dialog fullWidth open={openItem} maxWidth='lg'>
        <ProductModal
          currentItemDetails={currentItemDetails}
          handleClose={handleCloseItem}
        />
      </Dialog>
    </div>
  );
}
