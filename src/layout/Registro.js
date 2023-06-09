import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { url } from "./url";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";

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


export default function Registro() {
    const MySwal = withReactContent(Swal)
    useEffect(() => {
        getTipoDocumento();
    }, [])

    const [tipodoc, settipoDoc] = useState([]);
    const getTipoDocumento = async () => {
        // debugger
        const res = await fetch(url + "Clogin", {
            method: "POST",
            body: JSON.stringify({ function: "getTipoDocumento" }),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json',
            },
        })
        const rolget = await res.json();
        settipoDoc(rolget)
        function rand_code(chars, lon) {
            var code = "";
            for (var x = 0; x < lon; x++) {
                var rand = Math.floor(Math.random() * chars.length);
                code += chars.substr(rand, 1);
            }
            return code;
        }
    
       var caracteres = "012345678qwertyuiopasdfghjklmnbvcxzASDFGHJKLQWERTYUIOPZXCVBNM";
       var longitud = 8;
       data.token = rand_code(caracteres, longitud)
        

    }

    const theme = createTheme();

    //recogemos los datos del select

   

    const [data, setData] = useState({
        nombres: "",
        identificacion: "",
        email: "",
        password: "",
        idtipo_identificacion: "",
        idrol: 2,
        function: "guardarData",
        token: "",
    });

  


    const getData = (ev) => {
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })

    };

    //envio de datos
    const enviarDatos = (ev) => {
        ev.preventDefault();
        let validate = true;
        let mesaje = "";
        if (data.identificacion.length <= 0 || data.identificacion == null) {
            mesaje = mesaje + '<br> Ingrese el numero de documento.'
            validate = false;
        }
        if (data.nombres.length <= 0 || data.nombres == null) {
            mesaje = mesaje + '<br> Ingrese nombres y apellidos.'
            validate = false;
        }
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
            console.log("envia data")
            fetch(url + "Clogin",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                        'Content-Type': 'application/json'
                    },
                })
                .then(respuesta => respuesta.json())
                .then((rta) => {
                    if (rta == 1) {
                        ev.target.reset();
                        MySwal.fire({
                            position: 'center',
                            icon: 'info',
                            text: 'El usuario se registro con exito.',
                            showConfirmButton: true,
                            confirmButtonColor: '#3085d6',
                        })
                    }
                })
                .catch(error => {
                    console.log(error.message);
                    if (error) {
                        MySwal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Problemas en el registro: ' + error.message,
                            showConfirmButton: true,
                            confirmButtonColor: '#3085d6',
                            // timer: 1500
                        })
                    }
                });
        }
    }




    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box component="form" onSubmit={enviarDatos} noValidate sx={{ mt: 1 }}>
                    <br></br>
                    <Typography component="h1" variant="h4" style={{ textAlign: "center", textShadow: "7px 1px 5px blue" }}>
                        REGISTRO DE USUARIOS
                    </Typography>
                    <br></br>
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="nombres"
                                label="Nombres y apellidos"
                                type="text"
                                name="nombres"
                                value={data.nombres}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl fullWidth style={{ marginTop: "15px" }}>
                                <InputLabel id="demo-simple-select-label">Tipo documento</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="idtipo_identificacion"
                                    value={data.idtipo_identificacion}
                                    label="Tipo documento"
                                    onChange={getData}
                                    name="idtipo_identificacion"
                                >
                                    <MenuItem value="" >
                                        <em>Seleccionar</em>
                                    </MenuItem>
                                    {
                                        tipodoc.map(item => (
                                            <MenuItem key={item.idtipo_identificacion} value={item.idtipo_identificacion}>{item.nombre}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="identificacion"
                                label="Documento"
                                type="number"
                                name="identificacion"
                                value={data.identificacion}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="password"
                                label="Contraseña"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Guardar <SaveAsIcon style={{ marginRight: "8px" }} />
                            </Button>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid container>
                        <Grid item xs>
                            <Link to={"/"} style={{ textDecoration: "none", color: "#3991DA" }}>
                                {"Regresar"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
