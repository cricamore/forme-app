import * as React from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { addReview_Front,getReview_Front } from '../functions/sqlFunctions';
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
      // Actualiza la reseña en el backend
      addReview_Front(values.cedula, values.resenia)
        .then(() => {
          // Actualiza las reseñas en el estado local
          setReviews((prevReviews) => [...prevReviews, { name: values.cedula, text: values.resenia }]);
          setShowForm(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const toggleForm = () => setShowForm(!showForm);



  React.useEffect(() => {
    console.log(formik.values.cedula);
    getReview_Front(formik.values.cedula)
      .then((response) => {
        console.log(response)
        const reviewsArray = response || [];
        setReviews(reviewsArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: '#362900', p: 2}} data-testid="review">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Reseñas de usuarios
        </Typography>
        <Button variant="contained" sx={{ bgcolor: '#F6BE00', '&:hover': { bgcolor: '#FF8A00' } }} onClick={toggleForm}>
          {showForm ? 'Cerrar' : 'Agregar reseña'}
        </Button>
      </Box>
      <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto'}}>
        <List>
          {reviews.map((review, index) => (
            <ListItem key={index} sx={{ border: '4px solid white' }}>
              <ListItemText primary={review.name} secondary={
                <Typography variant="body2" sx={{ color: 'gray' }}>{review.text}</Typography>
              } sx={{ color: 'white' }} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Dialog open={showForm} onClose={toggleForm}>
        <DialogTitle sx={{bgcolor:'#362900', color:'white'}}>Agregar reseña</DialogTitle>
        <DialogContent sx={{bgcolor: '#362900'}}>
          <TextField
            name="resenia"
            value={formik.values.resenia}
            label="Reseña"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            sx={{ bgcolor: 'white' }}
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions sx={{bgcolor:'#362900', alignItems: 'center', justifyContent: 'center'}}>
          <Button onClick={toggleForm} sx={{bgcolor: '#F6BE00', color: 'white', '&:hover': { bgcolor: '#FF8A00' } }}>Cancelar</Button>
          <Button variant="contained" sx={{ bgcolor: '#F6BE00', '&:hover': { bgcolor: '#FF8A00' } }} onClick={formik.handleSubmit}>
            Enviar reseña
          </Button>
        </DialogActions>
      </Dialog>
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