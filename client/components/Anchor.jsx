import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import { nanoid } from 'nanoid';

export default function Anchor({ docs, setCurrentDoc }) {
  const [selected, setSelected] = useState(0);

  const handleClick = () => {
    setSelected(index);
    // setCurrentDoc(docs[index]);
  };

  const docListItem = ['index.md', 'index1.md', 'index2.md', 'index3.md'].map(
    (item, index) =>
      index === selected ? (
        <ListItem disablePadding key={nanoid()}>
          <ListItemButton
            selected
            sx={{ backgroundColor: '#191919 !important' }}
            onClick={handleClick}
          >
            <ListItemText sx={{ color: '#FFFF' }} primary={item} />
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem disablePadding key={nanoid()}>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      )
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label='main markdown files'>
        <List>
          <ListItem disablePadding sx={{ backgroundColor: '#f15025' }}>
            <ListItemButton>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary='Create' />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label='secondary markdown files'>
        <List>{docListItem}</List>
      </nav>
    </Box>
  );
}
