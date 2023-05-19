import * as React from 'react';
import { AppBar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { AccountCircle, Adb, Notifications } from "@material-ui/icons";
import flag from '../images/flag.svg'
import Image from 'next/image';
import { useEffect } from 'react';
import { trabajadores_Front } from '@project/functions/sqlFunctions';
import { useFormik } from 'formik';

export default function Client(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showText, setShowText] = React.useState(false); // nuevo estado
    const [trabajadores, setTrabajadores] = React.useState([]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleButtonClick = () => {
        setShowText(true); // mostrar el texto cuando se hace clic en el botón
    };
    
    useEffect(() => {
        async function getTrabajadores() {
          const response = await trabajadores_Front();
          setTrabajadores(response);
        }
        getTrabajadores();
    }, []);      

    return (
        <Container maxWidth="xl" sx={{padding:0}} data-testid="client">
            <AppBar position="fixed" sx={{ backgroundColor: '#362900', width: '100%', left: 0  }}>
                <Toolbar disableGutters>
                    <Image src={flag} width='100' height='60' alt="icon"/>

                    <Typography
                       variant="h3"
                       sx={{ color: '#fff', fontWeight: 'bold' }}
                    >
                        FORME
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Typography
                       variant="p"
                       sx={{ color: '#fff'}}
                       fontStyle="italic"
                    >
                        Cliente
                    </Typography>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    > 
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        
                    >
                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
                    </Menu>   
                </Toolbar>
            </AppBar>

            <Typography
                sx={{ marginTop: '80px', fontWeight: 'bold', fontSize: '24px' }}
            >
                ¿Qué servicio deseas solicitar?
            </Typography>


            

            <Button 
                sx={{ color: '#362900', fontWeight: 'bold', textDecoration: 'underline' }} 
                variant="text"
                onClick={handleButtonClick}
            >
                Profesor
            </Button>

            {showText && ( // nuevo elemento Box con el texto
                <Box sx={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', justifyContent: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Profesores disponibles:
                    </Typography>
                    {trabajadores && trabajadores.map((trabajador) => (
                        <Typography key={trabajador.id} variant="body2">
                            {trabajador.nombre}
                        </Typography>
  ))}
                </Box>       
            )}
        </Container>  
    );
}