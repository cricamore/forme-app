import React, { useState } from 'react';
import {
  Select,
  TextField,
  FormControl,
  Button,
  Stack,
  Typography,
  Container,
  MenuItem
} from '@mui/material'
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import { addDecripcion_Front } from '@project/functions/sqlFunctions';
import styles from '@project/styles/Registro.module.css'

const professionOptions = [
  "Profesor/a",
  "Mecánico",
  "Programador",
];

function WorkerForm() {
  const router = useRouter()
  const id = router.query.id

  const [descripcion, setDescripcion] = useState('');
  const [profession, setProfession] = useState('');

  const formik = useFormik({
    initialValues: {
      cedula: id,
      descripcion: ''
    },


    onSubmit: (values) => {
      addDecripcion_Front(id, values.descripcion)

    }
  });


  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission here
  }

  return (
    <div className={styles.miclase}>
      <form onSubmit={formik.handleSubmit}>
        <Container sx={{ padding: '2%', justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', minWidth: '100% ' }}>
          <Stack
            spacing={2}
            justifyContent="center"
            direction={'column'}
            alignItems={'center'}
            sx={{background:'#F6BE00', padding: '5%', borderRadius: '5%' }}
          >
          <Typography sx={{ color: '#362900', fontSize: '30px', fontWeight: 'bold' }}>Información extra del trabajador</Typography>

            <FormControl  sx={{ p: 2,  borderRadius: '10px', backgroundColor: '#F6BE00', width: '100%' }} variant="standard">
              Elige tu profesión
              <Select value={profession} onChange={(event) => setProfession(event.target.value)}
                label='Elige tu profesión'>
                <option value="">Selecciona una opción</option>
                {professionOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <br />
              Descripción:
              <br />
              <TextField name='descripcion' placeholder='...' multiline rows={5} value={formik.values.descripcion} onChange={formik.handleChange} />
              <br />
              <Button sx={{background: '#362900'}} type="submit" variant='contained'>Registrar</Button>
            </FormControl>
          </Stack>
        </Container>
      </form>
    </div>
  );
}

export default WorkerForm;