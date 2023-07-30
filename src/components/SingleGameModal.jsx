import * as React from 'react';
import {useState} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SoccerPage from "../containers/MatchDetails"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SingleGameModal({  openSingle,SingleMatch,handleCloseFullModal}) {



 



  return (
    <div >
    
      <Dialog
        fullScreen
        open={openSingle}
        onClose={handleCloseFullModal}
      >
        <AppBar sx={{ backgroundColor: 'black', position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFullModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" >
              Ajouter
            </Button>
          </Toolbar>
        </AppBar>

        {SingleMatch && (
        <SoccerPage SingleMatch={SingleMatch} />

        )}



      </Dialog>
    </div>
  );
}
