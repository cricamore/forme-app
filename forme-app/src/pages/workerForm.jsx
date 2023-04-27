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
const professionOptions = [
  "Profesor/a",
  "Mecánico",
  "Programador",
];

function WorkerForm() {
  const router = useRouter()
  const id = router.query.id

  console.log(id)

  const [descripcion, setDescripcion] = useState('');
  const [profession, setProfession] = useState('');

  const formik = useFormik({
    initialValues: {
      cedula: id,
      descripcion: ''
    },


    onSubmit: (values) => {
      console.log(formik.values)
      addDecripcion_Front(id, values.descripcion)

    }
  });

  console.log(formik.values)

  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission here
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container sx={{ padding: '2%', background: '#362900', justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', minWidth: '100% ' }}>
        <Typography sx={{ fontSize: '30px', fontWeight: 'bold', color: '#F6BE00' }}>Información extra del trabajador</Typography>
        <Stack
          spacing={2}
          justifyContent="center"
          direction={'column'}
          alignItems={'center'}
        >

          <FormControl sx={{ p: 2, border: '1px solid black', borderRadius: '10px', backgroundColor: '#F6BE00' }} variant="standard">
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
            <TextField name='descripcion' multiline value={formik.values.descripcion} onChange={formik.handleChange} />
            <br />
            <Button type="submit" variant='contained'>Registrar</Button>
          </FormControl>
        </Stack>
      </Container>
    </form>
  );
}

export default WorkerForm;