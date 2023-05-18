import React, { useEffect, useState } from 'react'
import { Trabajadores_info, contratar_trabajador, get_labor } from '../functions/sqlFunctions'
import {
    Box,
    Stack,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';


export default function Home_user() {

    const [trabajadores, setTrabajadores] = useState([])
    const [labor, setLabor] = React.useState('');
    const handleChange = (event) => {
        setLabor(event.target.value);
    };

    const filtro = async () => {
        console.log(labor)
        if (labor == 'Ver todos') {
            const res = await Trabajadores_info(labor)
            console.log(res)
            setTrabajadores(res)
        } else {
            const res = await get_labor(labor)
            console.log(res)
            setTrabajadores(res)

        }

    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await Trabajadores_info();
                setTrabajadores(response);
            } catch (error) {
                console.error(error);
            }
        };



        fetchData();

        console.log(trabajadores)
    }, []);

    return (
        <div style={{ padding: '5rem' }}>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Labor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={labor}
                        label="Labor"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Ver todos'}>Ver todos</MenuItem>
                        <MenuItem value={'Profesor'}>Profesor</MenuItem>
                        <MenuItem value={'Mecanico'}>Mecanico</MenuItem>
                        <MenuItem value={'Programador'}>Programador</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={filtro} >Filtrar</Button>
            </Box>

            <Box sx={{ width: '100%', padding: '5%', display: 'flex', flexWrap: "wrap", justifyContent: 'center', alignItems: 'center' }}>

                {
                    trabajadores && trabajadores.map((trabajadores) => (
                        <Box key={trabajadores.cedula} sx={{ margin: '5%', padding: '5%', background: '#381810', color: "#fff", borderRadius: '30px' }}>
                            <Stack direction='row' spacing={2}>
                                <Typography>{trabajadores.nombre}</Typography>
                                <Typography>{trabajadores.apellido}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <Typography>Calificacion : </Typography>
                                <Typography>{trabajadores.estrellas}</Typography>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <Typography>Estado : </Typography>
                                <Typography>{trabajadores.ocupado ? 'Ocupado' : 'Libre'}</Typography>
                            </Stack>
                            <AlertDialog cedula={trabajadores.cedula} />
                        </Box>
                    ))
                }
            </Box>
        </div>
    )
}

function AlertDialog({ cedula }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        contratar_trabajador(cedula, true)
    };


    return (
        <div>
            <Button variant='contained' sx={{ color: '#362900', fontWeight: 'bold', textDecoration: 'underline' }} onClick={handleClickOpen}>
                Ver mas
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title" sx={{ background: '#F6BE00' }}>
                    {"Mas informacion"}
                </DialogTitle>
                <DialogContent sx={{ background: '#F6BE00' }}>
                    <DialogContent dividers>
                        <p>descripcion</p>
                    </DialogContent>
                </DialogContent>
                <DialogActions sx={{ background: '#F6BE00' }}>
                    <Button variant='contained' sx={{ background: '#40931A', color: '#fff' }} onClick={handleClose} autoFocus>
                        Contratar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

