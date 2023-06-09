import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { url } from "./url";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.google.com/maps/place/Lavanderia+Central/@4.6133865,-74.0762688,3a,75y,341.28h,80.64t/data=!3m6!1e1!3m4!1s3U3GFELrAMc74sbz71WiHA!2e0!7i16384!8i8192!4m10!1m2!2m1!1slavanderia+central!3m6!1s0x8e3f993b588d270d:0xe2a4439376d75399!8m2!3d4.6133386!4d-74.0760191!15sChJsYXZhbmRlcmlhIGNlbnRyYWySAQdsYXVuZHJ54AEA!16s%2Fg%2F11s38nqm3r?hl=es">
                Brayan Leon
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export default function Login() {

    //limpiar variables del local

    localStorage.removeItem("usuario")
    localStorage.removeItem("idusuario")
    localStorage.removeItem("rol")

    let histori = useHistory();
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const MySwal = withReactContent(Swal)
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const getData = (ev) => {
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })
        //console.log(ev.target.value)
    }


    const enviarDatos = (ev) => {
        ev.preventDefault();
        var datos = {
            email: data.email,
            password: data.password,
            function: "login"
        }
        let validate = true;
        let mesaje = "";
        if (data.email.length <= 0 || data.email == null) {
            mesaje = mesaje + '<br> Ingrese el email.'
            validate = false;
        }
        if (data.password.length <= 0 || data.password == null) {
            mesaje = mesaje + '<br> Ingrese la contraseña.'
            validate = false;
        }
        if (!validate) {
            MySwal.fire({
                icon: 'info',
                title: '<div style="font-size: 24px">Verificación de datos</div>',
                html: '<div style="color: red; font-size: 18px">Existen datos incompletos:</div> <div style="font-size: 14px">' + mesaje + '</div>',
                confirmButtonColor: 'green',
                footer: '<div style="color: red">Todos los campos son obligatorios.</div>'
            })
        } else {
            fetch(url + "Clogin",
                {
                    method: "POST",
                    body: JSON.stringify(datos),
                    headers: {
                        'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                        'Content-Type': 'application/json'
                    },
                })
                .then(respuesta => respuesta.json())
                .then((rta) => {
                    if (rta == 0) {
                        var messaje = 'Usuario o contraseña incorrecto.';
                        errorMesaje(messaje, 'error')
                    } else {
                        //console.log(rta.datos)
                        if (rta.datos[0].celuactivo == 0) {
                            localStorage.setItem("token", rta.datos[0].token)
                        }

                        if (rta.datos[0].estado == 0) {
                            var messaje = 'El usuario no esta activo comuniquese con el adminitrador del sistema.';
                            errorMesaje(messaje, 'info')
                        } else {
                            if (localStorage.getItem("token") != rta.datos[0].token) {
                                var messaje = 'El sistema ha detectado un dispositivo que no está registrado, o la aplicación tubo una alteración, por lo tanto, no puede acceder, comuníquese con el administrador del sistema.';
                                errorMesaje(messaje, 'question')
                            } else {
                                if (rta.datos[0].celuactivo == 0) {
                                    activarCelu(rta.datos[0].idusuarios)
                                }
                                localStorage.setItem("rol", rta.datos[0].idrol)
                                localStorage.setItem("usuario", rta.datos[0].nombres)
                                localStorage.setItem("idusuario", rta.datos[0].idusuarios)
                                histori.push("/Pr");
                            }

                        }
                    }


                })
                .catch(error => {
                    console.log(error.message);
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Error en servidor ' + error.message,
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                        // timer: 1500
                    })
                });
        }

        function activarCelu(idusuarios) {
            fetch(url + "Clogin",
                {
                    method: "POST",
                    body: JSON.stringify({ function: "activarCelu", idusuarios: idusuarios }),
                    headers: {
                        'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                        'Content-Type': 'application/json'
                    },
                })
                .then(respuesta => respuesta.json())
                .then((rta) => {
                    return rta;
                })
                .catch(error => {
                    console.log(error.message);
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Error en servidor ' + error.message,
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                        // timer: 1500
                    })
                });

        }

        function errorMesaje(messaje, icon) {
            MySwal.fire({
                position: 'center',
                icon: icon,
                text: messaje,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                // timer: 1500
            })
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Lavanderia central
                    </Typography>

                    <Box component="form" onSubmit={enviarDatos} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="Email"
                            autoFocus
                            value={data.email}
                            onChange={getData}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contrasena"
                            type="password"
                            id="password"
                            autoComplete="Contrasena"
                            value={data.password}
                            onChange={getData}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Ingresar
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link to={"/Re"} style={{ textDecoration: "none", color: "#3991DA" }}>
                                    {"Registrarse"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
