import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { url } from "../layout/url";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function Rfactura() {
    const [value, setValue] = React.useState(null);
    const MySwal = withReactContent(Swal)
    let histori = useHistory();
    var nombre = localStorage.getItem("usuario")
    const [image, setImage] = useState([]);
    const [titleImage, setTitleImage] = useState("");



    if (image.length > 0) {
        document.getElementById("btn-camera").disabled = true;
    }

    function getCamera() {
        navigator.camera.getPicture(onSuccess, onFail)
        function onSuccess(imageURI) {
            let fechaHora = new Date();
            let fecha = fechaHora.getDate() + '-' + (fechaHora.getMonth() + 1) + '-' + fechaHora.getFullYear();
            let hora = fechaHora.getHours() + ':' + fechaHora.getMinutes() + ':' + fechaHora.getSeconds();
            var canvas = document.getElementById('cFoto1');
            var context = canvas.getContext('2d');
            var f1 = new Image();
            f1.src = imageURI;
            f1.onload = function () {
                setTitleImage("Imagenes Tomadas");
                context.font = "20px Arial";
                context.drawImage(f1, 0, 0, 640, 480);
                context.fillStyle = "#f5f5f5";
                context.fillRect(10, 8, 270, 33);
                context.strokeStyle = "black";
                context.strokeText(fecha + ' ' + hora, 10, 30);
                // var foto1 = document.getElementById('image1');
                var foto = canvas.toDataURL('image/jpeg', 0.6);//Tamaño
                // foto1.src = foto;
                // foto1.value = '';
                const dataImage = {
                    imagen: foto
                }
                setImage([...image, dataImage]);
            }
        }
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    console.log(value)

    const [data, setData] = useState({
        fecha: "",
        numero_factura: "",
        cliente: "",
        valor: "",
        numero_prendas: "",
        telefono: "",
        cancelada: 0,
        observaciones: "",
        imagen: "",
        abono: "",
        estado: 0,
        idusuarios: localStorage.getItem("idusuario"),
        function: "saveFactura"
    });

    const getData = (ev) => {
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })
        //console.log(ev.target.value)
    }

    //console.log(data)

    const enviarDatos = (ev) => {
        ev.preventDefault();
        if (image.length > 0) {
            data.imagen = image[0].imagen;
        }

        let validate = true;
        let mesaje = "";
        if (data.numero_factura.length <= 0 || data.numero_factura == null) {
            mesaje = mesaje + '<br> Ingrese el numero de factura.'
            validate = false;
        }
        if (data.cliente.length <= 0 || data.cliente == null) {
            mesaje = mesaje + '<br> Ingrese nombres y apellidos del cliente.'
            validate = false;
        }
        if (data.valor.length <= 0 || data.valor == null) {
            mesaje = mesaje + '<br> Ingrese el valor de la factura.'
            validate = false;
        }
        if (data.numero_prendas.length <= 0 || data.numero_prendas == null) {
            mesaje = mesaje + '<br> Ingrese el numero de prendas.'
            validate = false;
        }
        if (data.fecha == null || data.fecha.length <= 0) {
            let date = new Date()
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let fechaFinal = "";
            if (month < 10) {
                fechaFinal = year + '-0' + month + '-' + day;
            } else {
                fechaFinal = year + '-' + month + '-' + day;
            }
            data.fecha = fechaFinal;
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
            console.log(data)
            fetch(url + "Cfacturas",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    var res = response.status;
                    if (res == 500) {
                        MySwal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Error: la factura ya esta registrada.',
                            showConfirmButton: true,
                            confirmButtonColor: '#3085d6',
                            // timer: 1500
                        })
                    } else {
                        response.json().then((rta) => {
                            if (rta == 1) {
                                limpiarForm();
                                MySwal.fire({
                                    position: 'center',
                                    icon: 'info',
                                    text: 'Dato cargado',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#3085d6',
                                })
                            }
                        });
                    }

                });


        }
    }

    function limpiarForm() {
        setData("")
        setData({
            numero_factura: "",
            cliente: "",
            valor: "",
            numero_prendas: "",
            cancelada: 0,
            observaciones: "",
            fecha: "",
            telefono: "",
            imagen: "",
            abono: "",
            estado: 0,
            idusuarios: localStorage.getItem("idusuario"),
            function: "saveFactura"
        })

        document.getElementById("btn-camera").disabled = false;
        document.getElementById("numero_factura").value = "";
        document.getElementById("numero_factura").html = "";
        document.getElementById("cliente").value = "";
        document.getElementById("numero_prendas").value = "";
        document.getElementById("abono").value = "";
        document.getElementById("observaciones").value = "";
        document.getElementById("valor").value = "";
        setImage([]);
    };


    return (
        <ThemeProvider theme={darkTheme}>

            <CssBaseline />
            <Container maxWidth="sm">
                <Box component="form" id="formRfactura" onSubmit={enviarDatos} noValidate sx={{ mt: 1 }}>

                    <Typography style={{ textAlign: "left", Color: "whitesmoke" }}>
                        {nombre}
                    </Typography>
                    <br></br>
                    <Button
                        onClick={() => { histori.push("/Pr"); }}
                        variant="contained"
                        color="primary"
                    ><ArrowBackIcon style={{ marginRight: "8px" }} />
                    </Button>
                    <br></br>
                    <Typography component="h1" variant="h5" style={{ textAlign: "center", textShadow: "7px 1px 5px blue" }}>
                        REGISTRAR FACTURA
                    </Typography>
                    <br></br>
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm={12} md={12} lg={12} >

                            <TextField
                                fullWidth
                                id="date"
                                variant="outlined"
                                label="Fecha Factura"
                                type="Date"
                                name="fecha"
                                format="yyyy-MM-dd"
                                onChange={getData}
                                value={data.fecha}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ marginTop: "16px" }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="numero_factura"
                                label="N° factura"
                                type="number"
                                name="numero_factura"
                                value={data.numero_factura}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="telefono"
                                label="Telefono"
                                type="number"
                                name="telefono"
                                value={data.telefono}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="cliente"
                                label="Cliente"
                                type="text"
                                name="cliente"
                                value={data.cliente}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="valor"
                                label="Valor factura"
                                type="number"
                                name="valor"
                                value={data.valor}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="abono"
                                label="Abono a la factura $"
                                type="number"
                                name="abono"
                                value={data.abono}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="numero_prendas"
                                label="N° prendas"
                                type="number"
                                name="numero_prendas"
                                value={data.numero_prendas}
                                onChange={getData}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <FormControl fullWidth style={{ marginTop: "15px" }}>
                                <InputLabel id="demo-simple-select-label">Cancelada por el cliente</InputLabel>
                                <Select
                                    labelId="Cancelada por el cliente"
                                    id="cancelada"
                                    value={data.cancelada}
                                    label="Cancelada por el cliente"
                                    name="cancelada"
                                    onChange={getData}
                                >
                                    <MenuItem value={0}>NO</MenuItem>
                                    <MenuItem value={1}>SI</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Box >
                                <TextareaAutosize name="observaciones" id="observaciones" onChange={getData} style={{ width: "100%", height: "70px", marginTop: "15px" }} aria-label="minimum height" rowsMin={15} placeholder="Ingrese las observaciones." />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{ justifyContent: "center", display: "flex" }} >
                            <Button onClick={getCamera} id="btn-camera" style={{ color: "white", backgroundColor: "green" }}><PhotoCameraIcon style={{ marginRight: "8px" }} />FOTO</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}  >
                            <Typography variant="body2" color="textSecondary" align="left" style={{ fontSize: "18px" }}>
                                <strong>{titleImage}</strong>
                            </Typography>
                            {
                                image.map(item => (
                                    <img alt='some value' style={{ margin: "5px" }} key={item.imagen} src={item.imagen} width="250px" height="250px" />
                                ))
                            }
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




                </Box>
            </Container>
        </ThemeProvider>
    );
}
