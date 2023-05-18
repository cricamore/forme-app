import React, { useEffect, useState } from 'react'
import Carta_Trabajador from '@project/components/Carta_Trabajador'
import { Trabajadores_info } from '../functions/sqlFunctions'
import { 
    Box, 
    Stack, 
    Typography, 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';


export default function Home_user() {

    const [trabajadores, setTrabajadores] = useState([])


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
        <>
            <Box sx={{ width: '100%', padding: '5%', display: 'flex', flexWrap: "wrap", justifyContent: 'center', alignItems: 'center' }}>

                {
                    trabajadores.map((trabajadores) => (
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
                            <AlertDialog />
                        </Box>
                    ))
                }
            </Box>
        </>
    )
}

function AlertDialog({ estado, descripcion }) {
    const handleClick = () => {
        estado("Nuevo dato");
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseAcept = () => {
        estado('valido');
        setOpen(false);
    };

    const handleCloseDenied = () => {
        estado('Novalido');
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
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

