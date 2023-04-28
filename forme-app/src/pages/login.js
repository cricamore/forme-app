import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import Image from "next/image";
import user from '../images/user.svg'
import flag from '../images/flag.svg'
import backGround from '../images/FORME.png'
import styles from '@project/styles/login.module.css'

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              sx={{ padding: '30px', width: '100%' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '40px' }}>
                <Image src={flag} width='100' height='60' />
                <Typography variant="h2" sx={{ color: '#fff', fontWeight:'bold' }}>LOGIN</Typography>
              </Box>
              <Image src={user} width='200' height='100' />
              <div>
                <TextField
                  type="email"
                  id="email"
                  label="Email"
                  variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div>
                <TextField 
                  type="password"
                  id="password"
                  label="Password"
                  variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <Button sx={{ width: '60%' }} variant="contained" type="submit" color="warning">Sign-in</Button>
              <br />
              <Button type="button" color="primary">Register</Button>
            </Stack>
          </Box>
        </Stack>
      </ThemeProvider>
    </div>
  );
};

export default Login;
