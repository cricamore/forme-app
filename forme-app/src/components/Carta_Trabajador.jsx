import React, { useState, useEffect } from 'react';
import { Box, Button, Rating, Stack, Typography } from '@mui/material';
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

const Carta_Trabajador = ({ nombre, apellido, rating, }) => {
  const [stars, setStars] = useState(0);




  return (
    <Box sx={{ padding: '1%', backgroundColor: '#362900', width: '30%', height: '25%', borderRadius: '16px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gridTemplateAreas: '"name job" "rating button"' }}>

        <Stack
        direction="row"
        spacing={2}

        >
          <Typography variant="h6" color='white'>{nombre}</Typography>
          <Typography variant="h6" color='white'>{apellido}</Typography>
        </Stack>
      <Box sx={{ gridArea: 'job', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '-1px', marginRight: '16px', textAlign: 'center', color: 'white' }}>
        <JobNameWrapper>
          <Typography variant="subtitle1">Carpintero</Typography>
        </JobNameWrapper>
      </Box>
      <Box sx={{ gridArea: 'rating', display: 'flex', alignItems: 'center', padding: '16px', marginLeft: '18px' }}>
        <Rating name="rating" value={stars} defaultValue={0} max={3} size='large' sx={{ '& .MuiRating-iconEmpty': { color: 'white' }, '& .MuiRating-icon': { fontSize: '50px' } }} onChange={(event, value) => handleStarClick(value)} />
      </Box>
      <Button variant="contained" sx={{ width: '140px', gridArea: 'button', backgroundColor: '#FF8A00', borderRadius: '999px', alignSelf: 'flex-end', marginBottom: '18px', marginRight: '16px', right: '-40px' }}>Ver más</Button>
    </Box>

  );
};

export default Carta_Trabajador;




