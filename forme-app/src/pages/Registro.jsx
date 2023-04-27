import React from 'react'
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
    InputLabel
} from '@mui/material';
import { createTrabjador_Front, createCliente_Front } from '../functions/sqlFunctions'
import { useFormik } from 'formik';
import * as Yup from 'yup'


export default function Registro() {
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
            correo: Yup.string().email('*Campo invalido').required("*Complete este campo"),
            contraseña: Yup.string().required("*Complete este campo"),
        }),

        onSubmit: (values) => {
            console.log(formik.values)
            if(tipo == 'cliente') {
                createCliente_Front(values.cedula, values.nombre, values.apellido, values.telefono, values.direccion, values.correo ,values.contraseña)

            }else{
                createTrabjador_Front(values.cedula, values.nombre, values.apellido, values.telefono, values.direccion, values.contraseña)
            }
        }
    });

    console.log(formik.values)



    return (
        <div>
            <Container sx={{ padding: '2%', background: '#362900', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                            <MenuItem value={'Trabajador'}>Trabajador</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.cedula ? true : false}
                                        name="cedula"
                                        label={formik.errors.cedula ? formik.errors.cedula : "Cédula"}
                                        variant="filled"
                                        value={formik.values.cedula}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField

                                        fullWidth
                                        error={formik.errors.nombre ? true : false}
                                        name="nombre"
                                        label={formik.errors.nombre ? formik.errors.nombre : "Nombre"}
                                        variant="filled"
                                        value={formik.values.nombre}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        name="apellido"
                                        value={formik.values.apellido}
                                        onChange={formik.handleChange}
                                        label="Apellido"
                                        variant="filled"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.telefono ? true : false}
                                        name="telefono"
                                        label={formik.errors.telefono ? formik.errors.telefono : "Télefono"}
                                        variant="filled"
                                        value={formik.values.telefono}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.direccion ? true : false}
                                        name="direccion"
                                        label={formik.errors.direccion ? formik.errors.direccion : "Dirección"}
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
                                {/*<Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        error={formik.errors.correo ? true : false}
                                        name="correo"
                                        label={formik.errors.correo ? formik.errors.correo : "Correo electrónico"}
                                        variant="filled"
                                        value={formik.values.correo}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                 <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="Confirmar correo electrónico"
                                        label="Confirmar correo electrónico"
                                        variant="filled"
                                    />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        error={formik.errors.contraseña ? true : false}
                                        fullWidth
                                        name='contraseña'
                                        label={formik.errors.contraseña ? formik.errors.contraseña : "Contraseña"}
                                        variant="filled"
                                        value={formik.values.contraseña}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        fullWidth

                                        label="Confirmar contraseña"
                                        variant="filled" />
                                </Grid> */}

                            </Grid>
                            <Box sx={{ display: 'flex', ustifyContent: 'center', alignItems: 'center' }}>
                                <Checkbox sx={{
                                    color: '#fff',
                                    '&.Mui-checked': {
                                        color: '#fff',
                                    },
                                }} />
                                <Typography>He leído los <span style={{ fontWeight: 'bold' }}>términos y condiciones.</span></Typography>
                            </Box>
                            <Button
                                type='submit'
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
