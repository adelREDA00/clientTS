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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ ApiData,data1,open,handleSubmitClub,handleCloseFullModal }) {



  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (data) => {
    const isSelected = selectedCards.some((card) => card._id === data._id) || data1.some((selected) => selected._id === data._id);
    if (isSelected) {
      const updatedCards = selectedCards.filter((card) => card._id !== data._id);
      setSelectedCards(updatedCards);
    } else {
      const updatedCards = [...selectedCards, data];
      setSelectedCards(updatedCards);
    }
  };


  const PF = "https://apiblognode.onrender.com/images/";



  return (
    <div >
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleCloseFullModal}
        TransitionComponent={Transition}
    
      >
        <AppBar className='bg-white dark:bg-neutral-800' sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFullModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} className='tut'
            component="div">
            Choisissez les articles
            

            </Typography>
            <Button autoFocus color="inherit" onClick={()=>{
                handleSubmitClub(selectedCards)
            }}>
              Ajouter
            </Button>
          </Toolbar>
        </AppBar>
       


        <div className="bg-white dark:bg-neutral-800 card_container">


        

    
        <div className="drop">
      <div className="drop__container" id="drop-items">
        {ApiData.map((data) => {
          const isSelected = selectedCards.some((card) => card._id === data._id) || data1.some((selected) => selected._id === data._id);
          const cardClasses = `drop__card ${isSelected ? 'active' : ''}`;

          let imgSrc;
          if(data.id===0){
            imgSrc = PF + data.image_path
          }else{
            imgSrc = data.image_path
          }

          return (
            <div
              key={data._id}
              className={cardClasses}
              onClick={() => handleCardClick(data)}
            >
              <div className="drop__data">
                <img src={imgSrc} alt="" className="drop__img" />
                <div>
                  <h1 className="drop__name">{data.name}</h1>
                  <span className="drop__profession">{data.type}</span>
                </div>
              </div>

              <div>
                <a href="#" className="drop__social">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="drop__social">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#" className="drop__social">
                  <i className="bx bxl-twitter"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>



        </div>

      </Dialog>
    </div>
  );
}
