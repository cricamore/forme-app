import * as React from 'react';
import { AppBar, Badge, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountCircle, Adb, Notifications, Title } from "@material-ui/icons";
import flag from '../images/flag.svg'
import Image from 'next/image';

export default function Worker(){
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElNoti, setAnchorElNoti] = React.useState(null);
    const [showBox, setShowBox] = React.useState(false);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuNoti = (event) => {
        setAnchorElNoti(event.currentTarget);
    };
    const handleCloseNoti = () => {
        setAnchorElNoti(null);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAcept = () => {
        setShowBox(false);
    }

    const handleNotificationClick = () => {
        setShowBox(true);
        handleCloseNoti();
    };
      
    return (
        <Container maxWidth="xl" sx={{padding:0}}>
            <AppBar position="fixed" sx={{ backgroundColor: '#362900', width: '100%', left: 0 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Image src={flag} width='100' height='60' alt="icon"/>
        
                        <Typography
                           variant="h3"
                           sx={{ color: '#fff', fontWeight: 'bold' }}
                        >
                            FORME
                        </Typography>
        
                        <Box sx={{ flexGrow: 1 }} />
        
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenuNoti}
                            color="inherit"
                        > 
                            <Notifications />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorElNoti={anchorElNoti}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorElNoti)}
                            onClose={handleCloseNoti}
                        >
                            <MenuItem onClick={handleNotificationClick}>Nueva Solicitud: Matemáticas Básicas</MenuItem>
                            <MenuItem onClick={handleCloseNoti}>Nueva Solicitud: Cálculo I</MenuItem>
                        </Menu>   
                        
                        <Typography
                           variant="p"
                           sx={{ color: '#fff' }}
                           fontStyle="italic"
                        >
                            Trabajador
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
                </Container>
            </AppBar>

            {showBox && (
                <Box
                  sx={{
                    position: 'relative',
                    top: '120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 460,
                    height: 500,
                    backgroundColor: '#F6BE00', 
                    display: 'flex', 
                    padding: '2%',
                    borderRadius: '4%',
                    boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)'
                  }}
                >
                    <Stack sx={{ alignItems: 'flex-start' }}>
                        <Typography sx={{ 
                            fontFamily: 'Arial',
                            fontSize: '20px', 
                            fontWeight: 'bold', 
                            color:'#362900'
                            }}
                        >
                            <Box sx={{
                                width: 400, 
                                height: 60, 
                                backgroundColor: '#F6BE00',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                                <h1>SOLICITUD</h1>
                            </Box>
                            
                        </Typography>

                        <Typography>
                            <p>Martín Oviedo requiere de tus servicios.</p>
                            <h4>Descripción:</h4>
                            <p>Se requiere de clases acerca del curso de matemáticas básicas para ingenierías.</p>
                            <h4>Dirección:</h4>
                            <p>Carrera 102 #94C-66</p>
                            <h4>Pago en efectivo: $102.000</h4>

                        </Typography>

                        <Box sx={{ marginTop: 'auto', display: 'flex'}}>
                            <Button variant="contained" color="success" onClick={handleCloseAcept}>Aceptar</Button>
                            <Button variant="contained" color="error" onClick={handleCloseAcept}>Rechazar</Button>
                        </Box>

                        
                        
                    </Stack>
                </Box>   
            )}
        </Container>
    );
}