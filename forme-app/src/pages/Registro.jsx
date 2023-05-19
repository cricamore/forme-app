import React, { useState } from 'react'
import {
    Grid,
    Container,
    Box,
    TextField,
    Stack,
    Typography,
    Checkbox,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { createTrabjador_Front, createCliente_Front } from '../functions/sqlFunctions'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import styles from '@project/styles/Registro.module.css'  // forme-app\src\styles\Registro.module.css
import * as Yup from 'yup'
import Link from 'next/link';


export default function Registro() {
    const router = useRouter();
    const [valid, setValido] = useState('')

    const actualizarDato = (nuevoDato) => {
        setValido(nuevoDato);
    };

    const [tipo, setTipo] = React.useState('');




    const handleChange = (event) => {
        setTipo(event.target.value);
    };

    const formik = useFormik({
        initialValues: {
            cedula: '',
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            correo: '',
            contraseña: '',
        },

        validationSchema: Yup.object({
            cedula: Yup.string().required("*Complete este campo"),
            nombre: Yup.string().required("*Complete este campo"),
            apellido: Yup.string().required("*Complete este campo"),
            telefono: Yup.string().required("*Complete este campo"),
            direccion: Yup.string().required("*Complete este campo"),
            // correo: Yup.string().email('*Campo invalido').required("*Complete este campo"),
            contraseña: Yup.string().required("*Complete este campo"),
        }),

        onSubmit: async (values) => {
            if (tipo == 'cliente') {
              let res = await  createCliente_Front(values.cedula, values.nombre, values.apellido, values.telefono, values.direccion, values.correo, values.contraseña)
                if (res == 'success') {
                    router.push({
                        pathname: '/',
                    })
                }
            }


            if (tipo == 'trabajador') {
                let res = await createTrabjador_Front(values.cedula, values.nombre, values.apellido, values.telefono, values.direccion, values.contraseña)
                if (res == 'success') {
                    router.push({
                        pathname: '/workerForm',
                        query: { id: values.cedula },
                    })
                }
            }


        }
    });

    return (
        <div className={styles.miclase}>
            <Container data-testid='container-registro' sx={{ padding: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ borderRadius: '4%', padding: '10%', width: '60%', background: '#F6BE00' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack
                            spacing={2}
                            justifyContent="center"
                            direction={'column'}
                            alignItems={'center'}
                        >
                            <Typography sx={{ fontSize: '50px', fontWeight: 'bold' }}>Registro</Typography>

                            <Grid
                                container
                                spacing={0.5}
                                rowSpacing={3}
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <FormControl variant="filled" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={tipo}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'cliente'}>Cliente</MenuItem>
                                            <MenuItem value={'trabajador'}>Trabajador</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.cedula && formik.touched.cedula ? true : false}
                                        name="cedula"
                                        label={formik.errors.cedula && formik.touched.cedula ? formik.errors.cedula : "Cédula"}
                                        variant="filled"
                                        value={formik.values.cedula}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField

                                        fullWidth
                                        error={formik.errors.nombre && formik.touched.nombre ? true : false}
                                        name="nombre"
                                        label={formik.errors.nombre && formik.touched.nombre ? formik.errors.nombre : "Nombre"}
                                        variant="filled"
                                        value={formik.values.nombre}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.apellido && formik.touched.apellido ? true : false}
                                        name="apellido"
                                        value={formik.values.apellido}
                                        onChange={formik.handleChange}
                                        label={formik.errors.apellido && formik.touched.apellido ? formik.errors.apellido : "Apellido"}
                                        variant="filled"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.telefono && formik.touched.telefono ? true : false}
                                        name="telefono"
                                        label={formik.errors.telefono && formik.touched.telefono ? formik.errors.telefono : "Télefono"}
                                        variant="filled"
                                        value={formik.values.telefono}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.direccion && formik.touched.direccion ? true : false}
                                        name="direccion"
                                        label={formik.errors.direccion && formik.touched.direccion ? formik.errors.direccion : "Dirección"}
                                        variant="filled"
                                        value={formik.values.direccion}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                {tipo == 'cliente' ?
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            error={formik.errors.correo ? true : false}
                                            name="correo"
                                            label={formik.errors.correo ? formik.errors.correo : "correo"}
                                            variant="filled"
                                            value={formik.values.correo}
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    :
                                    ''
                                }

                                <Grid item xs={12}>
                                    <TextField
                                        error={formik.errors.contraseña && formik.touched.contraseña? true : false}
                                        fullWidth
                                        name='contraseña'
                                        label={formik.errors.contraseña && formik.touched.contraseña? formik.errors.contraseña : "Contraseña"}
                                        variant="filled"
                                        value={formik.values.contraseña}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                            </Grid>
                            <Box sx={{ display: 'flex', ustifyContent: 'center', alignItems: 'center' }}>

                               <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={.5}
                                >

                                    <Checkbox
                                        required
                                        checked={valid == 'valido' ? true : false}
                                        sx={{
                                            color: '#fff',
                                            '&.Mui-checked': {
                                                color: '#362900',
                                            },
                                        }}
                                    />
                                    <Typography>He leído los </Typography>
                                    <AlertDialog estado={actualizarDato} />
                                    {/* <span style={{ fontWeight: 'bold' }}> términos y condiciones.</span> */}
                                </Stack>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ background: '#362900', scale: '100%' }}>
                                Registrarme</Button>
                        </Stack>
                    </form>

                </Box>
            </Container>

        </div>
    )
}

function AlertDialog({ estado }) {
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
            <Button sx={{ color: '#362900', fontWeight: 'bold', textDecoration: 'underline' }} variant="text" onClick={handleClickOpen}>
                Terminos y condiciones
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title" sx={{ background: '#F6BE00' }}>
                    {"Terminos y condiciones"}
                </DialogTitle>
                <DialogContent sx={{ background: '#F6BE00' }}>
                    <DialogContent dividers>
                        <h4>
                            Responsabilidades del usuario:
                        </h4>
                        <p>
                            Los usuarios deben aceptar que son responsables de cualquier acción que realicen en la plataforma, y que deben cumplir con todas las leyes y regulaciones aplicables.
                        </p>
                        <h4>
                            Información personal:
                        </h4>
                        <p>
                            La aplicación puede recopilar información personal del usuario, como su nombre, dirección y número de teléfono. Esta información se utilizará únicamente para procesar los pedidos y mejorar la experiencia del usuario.
                        </p>
                        <h4>
                            Pedidos:
                        </h4>
                        <p>
                            Los usuarios pueden realizar pedidos a través de la aplicación, pero deben cumplir con las políticas de la empresa en cuanto a los productos disponibles, los precios y los horarios de entrega.
                        </p>
                        <h4>
                            Pagos:
                        </h4>
                        <p>
                            La aplicación puede requerir que los usuarios proporcionen información de pago, como tarjetas de crédito o cuentas de PayPal, para procesar los pagos de los pedidos. Los usuarios deben aceptar que son responsables de cualquier cargo o transacción realizada en su cuenta.
                        </p>
                        <h4>
                            Cancelaciones:
                        </h4>
                        <p>
                            Los usuarios pueden cancelar sus pedidos en cualquier momento, pero deben cumplir con las políticas de cancelación de la empresa. Esto puede incluir cargos por cancelación o la imposibilidad de cancelar pedidos en ciertos momentos.
                        </p>
                        <h4>
                            Propiedad intelectual:
                        </h4>
                        <p>
                            Todos los derechos de propiedad intelectual de la aplicación y sus contenidos pertenecen a la empresa. Los usuarios no tienen derecho a utilizar estos contenidos sin el permiso expreso de la empresa.
                        </p>

                        <h4>
                            Limitación de responsabilidad:
                        </h4>
                        <p>
                            La empresa no será responsable de ningún daño o pérdida que el usuario pueda sufrir al utilizar la aplicación, excepto en los casos en que la empresa haya actuado con negligencia o incumplido alguna de sus obligaciones legales.
                        </p>

                    </DialogContent>
                </DialogContent>
                <DialogActions sx={{ background: '#F6BE00' }}>
                    <Button variant='contained' sx={{ background: '#C52B2B', color: '#fff' }} onClick={handleCloseDenied}>Cancelar</Button>
                    <Button variant='contained' sx={{ background: '#40931A', color: '#fff' }} onClick={handleCloseAcept} autoFocus>
                        Acepto
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
