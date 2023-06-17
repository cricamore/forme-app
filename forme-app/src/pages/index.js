import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import Image from "next/image";
import user from '../images/user.svg'
import flag from '../images/flag.svg'
import { useFormik } from 'formik';
import styles from '@project/styles/login.module.css'
import Link from "next/link";
import { useRouter } from "next/router";
import { login_cliente, login_trabajador } from "@project/functions/sqlFunctions";

import * as Yup from 'yup'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#F6BE00',
    },
  },
});

const Login = () => {
  const router = useRouter();
  const [tipo, setTipo] = useState("");

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  useEffect(() => {
    document.title = 'Forme Home';
  }, []);

  const formik = useFormik({
    initialValues: {
      user: '',
      password: ''
    },

    validationSchema: Yup.object({
    }),

    onSubmit: async (values) => {
      if (tipo == 'cliente') {
        const res = await login_cliente(values.user, values.password)
        if (res == 'existe') {
          router.push({
              pathname: '/RatingPage',
          })
      }
    }else{
      login_trabajador(values.user, values.password)
    }
    }
  });

  console.log(formik.values)

  return (
    <div className={styles.background}>
      <ThemeProvider theme={theme}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{
            width: '28%',
            height: '100vh',
            backgroundColor: "secondary.main",
            p: 2,
          }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
              sx={{ padding: '30px', width: '100%', alignItems: 'center' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '40px' }}>
                <Image src={flag} width='100' height='60' alt="icon"/>
                <Typography variant="h2" sx={{ color: '#fff', fontWeight: 'bold' }}>FUNCIONO</Typography>
              </Box>
              <Image src={user} width='200' height='100'alt='icon2' />


              <FormControl variant="filled" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tipo de usuario</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={tipo}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem id='cliente' value={'cliente'}>Cliente</MenuItem>
                                            <MenuItem value={'trabajador'}>Trabajador</MenuItem>
                                        </Select>
                                    </FormControl>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <TextField
                    name="user"
                    id="email"
                    label="User"
                    variant="filled"
                    value={formik.values.user}
                    onChange={formik.handleChange}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                    variant="filled"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>
                <br />
                <Button id="sel-button" sx={{ width: '100%' }} variant="contained" type="submit" color="warning">Sign-in</Button>
                <br />
              </form>
              <Link href='./Registro'>
                <Button id="reg-button" type="button" color="primary">Register</Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </ThemeProvider>
    </div>
  );
};

export default Login;
