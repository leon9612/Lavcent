import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { url } from "../layout/url";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function ActualizarF() {
    const MySwal = withReactContent(Swal)
    let histori = useHistory();
    var nombre = localStorage.getItem("usuario")
    useEffect(() => {
        getFactura();
    }, [])

    const [factruas, setFacturas] = useState([]);
    const [idfacturas, setIdFacturas] = useState("");
    const getFactura = async () => {
        const res = await fetch(url + "Cfacturas", {
            method: "POST",
            body: JSON.stringify({ function: "getFacturasUpdate" }),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json',
            },
        })
        const getfactura = await res.json();
        setFacturas(getfactura)
        //limpiarForm();
    }


    const [valabono, setvalaabono] = useState({
        valorabono: "",
        fecha: ""
    })
    const [arrAbono, setArrayAbono] = useState([])
    console.log(arrAbono)
    const inputAbono = (ev) => {
        setvalaabono({
            ...valabono,
            [ev.target.name]: ev.target.value
        })
    }


    const agregarAbono = () => {
        const dataAbono = {
            idfacturas_ingresadas: idfacturas.idfacturas_ingresadas,
            idusuarios: localStorage.getItem("idusuario"),
            valorabono: valabono.valorabono,
            fecha: valabono.fecha
        }

        if (dataAbono.valorabono == "" || dataAbono.valorabono == null) {
            MySwal.fire({
                position: 'center',
                icon: 'error',
                text: 'Ingrese el valor.',
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                // timer: 1500
            })
        } else {
            setArrayAbono([...arrAbono, dataAbono]);
        }

    }

    console.log(arrAbono)


    const [data, setData] = useState({
        arrayAbonos: "",
        idfacturas_ingresadas: idfacturas.idfacturas_ingresadas,
        cliente: "",
        valor: "",
        numero_prendas: "",
        observaciones: "",
        valorabono: "",
        idusuarios: localStorage.getItem("idusuario"),
        function: "updateFactura"
    });

    const getData = (ev) => {
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })
        //console.log(ev.target.value)
    }
    if (valabono.fecha == null || valabono.fecha.length <= 0) {
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
        valabono.fecha = fechaFinal;
    }

    data.arrayAbonos = arrAbono;
    data.valor = idfacturas.valorf
    data.cliente = idfacturas.cliente
    data.observaciones = idfacturas.observaciones
    data.numero_prendas = idfacturas.numero_prendas
    data.idfacturas_ingresadas = idfacturas.idfacturas_ingresadas

    const enviarDatos = (ev) => {

        console.log(data)
        ev.preventDefault();
        let validate = true;
        let mesaje = "";

        if (idfacturas.idfacturas_ingresadas == "" || idfacturas.numero_factura == null) {
            mesaje = mesaje + '<br> Debe seleccionar una factura.'
            validate = false;
        }
        if (data.cliente.length <= 0 || data.cliente == null) {
            mesaje = mesaje + '<br> Ingrese nombres y apellidos del usuario que retira la ropa.'
            validate = false;
        }
        if (!validate) {
            MySwal.fire({
                icon: 'info',
                title: '<div style="font-size: 24px">Verificación de datos</div>',
                html: '<div style="color: red; font-size: 18px">Existen datos incompletos:</div> <div style="font-size: 14px">' + mesaje + '</div>',
                confirmButtonColor: 'green',
                //footer: '<div style="color: red">Todos los campos son obligatorios.</div>'
            })
        } else {
            //console.log(data)
            fetch(url + "Cfacturas",
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
                    console.log(rta)
                    if (rta == 1) {
                        getFactura();
                        //limpiarForm();
                        MySwal.fire({
                            position: 'center',
                            icon: 'info',
                            text: 'Dato cargado',
                            showConfirmButton: true,
                            confirmButtonColor: '#3085d6',
                            timer: 1800
                        })

                        setTimeout(function () {
                            histori.push("/Pr");
                        }, 2000);

                        //limpiarForm();
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error) {
                        MySwal.fire({
                            position: 'center',
                            icon: 'error',
                            text: 'Error: ' + error.message,
                            showConfirmButton: true,
                            confirmButtonColor: '#3085d6',
                            // timer: 1500
                        })
                    }
                });
        }
    }



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
                        ACTUALIZAR FACTURA
                    </Typography>
                    <br></br>
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Autocomplete
                                options={factruas}
                                getOptionLabel={(option) => option.numero_factura}
                                id="idfacturas_salientes"
                                name="idfacturas_salientes"
                                onChange={(ev, value) => setIdFacturas(value)}
                                renderInput={(params) => <TextField {...params} label="Numero factura" margin="normal" variant="outlined" />}
                            />
                        </Grid>
                        {idfacturas.numero_factura ?
                            <>
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        disabled
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
                                        id="cliente"
                                        label="Nombre cliente"
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
                                        id="numero_prendas"
                                        label="N° prendas"
                                        type="number"
                                        name="numero_prendas"
                                        value={data.numero_prendas}
                                        onChange={getData}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <Box >
                                        <TextareaAutosize name="observaciones" id="observaciones" onChange={getData} value={data.observaciones} style={{ width: "100%", height: "70px", marginTop: "15px" }} aria-label="minimum height" rowsMin={15} placeholder="Ingrese las observaciones." />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <TextField
                                        fullWidth
                                        id="date"
                                        variant="outlined"
                                        label="Fecha Factura"
                                        type="Date"
                                        name="fecha"
                                        format="yyyy-MM-dd"
                                        value={valabono.fecha}
                                        onChange={inputAbono}
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
                                        id="valorabono"
                                        label="Abono"
                                        type="number"
                                        name="valorabono"
                                        value={valabono.valorabono}
                                        onChange={inputAbono}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    {
                                        arrAbono.length > 0 ?
                                            arrAbono.map(item => (
                                                <Typography gutterBottom style={{ fontSize: "15px" }}>
                                                    <strong>Abono nuevo: {item.valorabono}</strong>
                                                </Typography>
                                            ))
                                            : ""
                                    }
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        id="btnAg"
                                        onClick={() => (agregarAbono())}
                                    >
                                        Agregar abono <LibraryAddIcon style={{ marginRight: "8px" }} />
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        id="btnSave"
                                        variant="contained"
                                        color="success"
                                    >
                                        Guardar <SaveAsIcon style={{ marginRight: "8px" }} />
                                    </Button>
                                </Grid>

                            </>
                            : ""}



                    </Grid>




                </Box>
            </Container>
        </ThemeProvider >
    );
}
