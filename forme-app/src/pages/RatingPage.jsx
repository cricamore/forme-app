import React, { useState,useEffect } from 'react';
import { Box, Button, Rating, Typography } from '@mui/material';
import { styled } from '@mui/system';


const JobNameWrapper = styled(Box)({
  backgroundColor: '#F6BE00',
  borderRadius: '999px',
  padding: '7px',
  position: 'relative',
  top: '2px',
  left: '0px',
  width: '140px'
});

const RatingPage = () => {
  const [stars, setStars] = useState(0);
  const [trabajador, setTrabajador] = useState(null);

  const handleStarClick = async (value) => {
      try {
        const response = await fetch(`http://localhost:4000/1005965561/estrellas`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ estrellas: value })
        });

        const data = await response.json();

        // Actualiza el valor de las estrellas en el estado
        setStars(data[0].estrellas);
      } catch (error) {
        console.error(error);
      }
   };



  return (
    <Box sx={{ backgroundColor: 'white', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ backgroundColor: '#362900', width: '470px', height: '150px', borderRadius: '16px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gridTemplateAreas: '"name job" "rating button"' }}>
        <Box sx={{ gridArea: 'name', padding: '16px', display: 'flex', marginLeft: '20px', marginTop: '5px' }}>
          <Typography variant="h5" color='white'>Pepito Perez</Typography>
        </Box>
        <Box sx={{ gridArea: 'job', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-1px', marginRight: '16px', textAlign: 'center', color:'white'}}>
          <JobNameWrapper>
            <Typography variant="subtitle1">Carpintero</Typography>
          </JobNameWrapper>
        </Box>
        <Box sx={{ gridArea: 'rating', display: 'flex', alignItems: 'center', padding: '16px', marginLeft: '18px'  }}>
          <Rating name="rating" value={stars} defaultValue={0} max={3} size='large' sx={{ '& .MuiRating-iconEmpty': { color: 'white' }, '& .MuiRating-icon': {fontSize: '50px'} }} onChange={(event, value) => handleStarClick(value)} />
        </Box>
        <Button variant="contained" sx={{ width: '140px',  gridArea: 'button', backgroundColor: '#FF8A00', borderRadius: '999px', alignSelf: 'flex-end', marginBottom: '18px', marginRight: '16px', right:'-40px' }}>Ver más</Button>
      </Box>
    </Box>
  );
};

export default RatingPage;


  
  
