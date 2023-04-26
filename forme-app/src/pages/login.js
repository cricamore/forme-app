import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";

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
    <div className="login-container" align="right">
      <Stack 
      direction="column"
      alignItems="flex-end">
          <ThemeProvider theme={theme}>
            <Box align="center" sx={{
                width: 300,
                height: 500,
                backgroundColor: "secondary.main",
                p: 2,
            }}>
            <Typography variant="h4">LOGIN</Typography>
            <br/> 
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
              <br/>
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
              <br/>
              <Button variant="contained" type="submit" color="warning">Sign-in</Button>
              <br/>              
                <Button type="button" color="primary">Register</Button>
            </Box>
          </ThemeProvider>
      </Stack>
    </div>
  );
};

export default Login;
