import React, { useState } from 'react';
import { Select, TextField, FormControl, Button, Grid, Typography, Container, MenuItem  } from '@mui/material'
const professionOptions = [
  "Profesor/a",
  "Mecánico",
  "Programador",
];

function WorkerForm() {
  const [descripcion, setDescripcion] = useState('');
  const [profession, setProfession] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission here
  }
  
  return (
    <form onSubmit={handleSubmit}>
        <Container sx={{ padding: '2%', background: '#362900',   justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', minHeight:'100vh', minWidth: '100% '  }}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', color: '#F6BE00' }}>Información extra del trabajador</Typography>
            <FormControl sx={{ p:2, border: '1px solid black', borderRadius: '10px', backgroundColor:'#F6BE00' }} variant="standard">
                Elige tu profesión
                <Select value={profession} onChange={(event) => setProfession(event.target.value) } 
                        label = 'Elige tu profesión'>
                <option value="">Selecciona una opción</option>
                {professionOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
                </Select>
                <br/>
                Descripción:
                <br/>
                <TextField type="descripcion" multiline value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
                <br/>
            <Button type="submit" variant='contained'>Registrar</Button>
        </FormControl>
      </Container>
    </form>
  );
}

export default WorkerForm;