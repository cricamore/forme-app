import * as React from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { addReview_Front } from '@project/functions/sqlFunctions';
import { useFormik } from 'formik';

const ReviewWindow = () => {
  const [reviews, setReviews] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      cedula: 1005965561,
      resenia: ''
    },
    onSubmit: (values) => {
      addReview_Front(1005965561, values.resenia);
      setShowForm(false);
    }
  });

  console.log(formik.values)

  const toggleForm = () => setShowForm(!showForm);

  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: '#362900', p: 2}}>
      <Typography variant="h6" gutterBottom sx={{color: 'white'}}>
        Reseñas de usuarios
      </Typography>
      <List>
        {reviews.map((review, index) => (
          <ListItem key={index}>
            <ListItemText primary={review.name} secondary={review.text} sx={{color:'white'}} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" sx={{bgcolor: '#F6BE00','&:hover': { bgcolor: '#FF8A00',}}} fullWidth onClick={toggleForm}>
          {showForm ? 'Ocultar formulario' : 'Agregar reseña'}
        </Button>
        {showForm && (
          <>
            <TextField name="resenia" value={formik.values.resenia} label="Reseña" fullWidth multiline rows={4} margin="normal" sx={{bgcolor: 'white'}} onChange={formik.handleChange}/>
            <Button variant="contained" fullWidth sx={{bgcolor: '#F6BE00','&:hover': { bgcolor: '#FF8A00',}}} onClick={formik.handleSubmit}>
              Enviar reseña
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

const ReviewWindowContainer = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      bgcolor: 'white',
    }}
  >
    <ReviewWindow />
  </Box>
);

export default ReviewWindowContainer;


