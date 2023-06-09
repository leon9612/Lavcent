import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { url } from "../layout/url";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function Buscarfactura() {
    const MySwal = withReactContent(Swal)
    let histori = useHistory();
    var nombre = localStorage.getItem("usuario")

    /* useEffect(() => {
        getCierre();
        getFacturas();
    }, []) */

    const [data, setData] = useState({
        nombre: "",
    });


    const getData = (ev) => {
        setData({
            ...data,
            [ev.target.name]: ev.target.value
        })
        //console.log(ev.target.value)
    }
    var consultar = function () {
        getFacturas();
    }


    const [facturasregistradas, setFacturasRegistradas] = useState([]);
    const [abonos, setAbonos] = useState([]);
    const [facturasalientes, setFacturasalientes] = useState([]);
    function getFacturas() {
        fetch(url + "Cfacturas",
            {
                method: "POST",
                body: JSON.stringify({ function: "getSerchFactura", nombre: data.nombre }),
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
                        text: 'Error: Parametros no vaidos.',
                        showConfirmButton: true,
                        confirmButtonColor: '#3085d6',
                        // timer: 1500
                    })
                } else {
                    response.json().then((rta) => {
                        console.log(rta)
                        if(rta.salientes !== null){
                            setFacturasRegistradas(rta.entradas)
                            setAbonos(rta.abonos)
                            setFacturasalientes(rta.salientes)
                        }else{
                            MySwal.fire({
                                position: 'center',
                                icon: 'info',
                                text: 'No se encontro información',
                                showConfirmButton: true,
                                confirmButtonColor: '#3085d6',
                                // timer: 1500
                            })
                        }
                        
                    });
                }

            });
        /* const res = fetch(url + "Ccontabilidad", {
            method: "POST",
            body: JSON.stringify({ function: "getCierreDia", fecha: data.fecha }),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json',
            },
        })
        //const getcierre = await res.json();
        console.log(res)
        setCierre(res.json()); */
    }








    return (
        <ThemeProvider theme={darkTheme}>

            <CssBaseline />
            <Container maxWidth="sm">
                <Box component="form" noValidate sx={{ mt: 1 }}>

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
                        BUSCAR FACTURAS
                    </Typography>
                    <br></br>
                    <Grid container spacing={1} >
                        <Grid item xs={6} sm={6} md={6} lg={6} >
                            <TextField
                                fullWidth
                                id="nombre"
                                variant="outlined"
                                label="Nombre cliente"
                                type="text"
                                name="nombre"
                                onChange={getData}
                                value={data.nombre}
                                style={{ marginTop: "16px" }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} >
                            <Button onClick={consultar} id="btn-camera" style={{ color: "white", backgroundColor: "green", marginTop: "16px", width: "100%", height: "55px" }}><SearchIcon style={{ marginRight: "8px" }} />BUSCAR</Button>
                        </Grid>

                        {
                            facturasregistradas.length > 0 ?
                                <>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <Typography sx={{ fontSize: 20, color: "whitesmoke" }} color="text.secondary" gutterBottom>
                                            Historial usuario: {data.nombre}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>Facturas registradas</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {facturasregistradas !== null ?
                                                    <>
                                                        {facturasregistradas.map((row) => (
                                                            <>
                                                                < Card sx={{ minWidth: 275, border: "solid" }}>

                                                                    <CardContent>
                                                                        <Typography sx={{ fontSize: 20, color: "whitesmoke" }} color="text.secondary" gutterBottom>
                                                                            Factura N° {row.numero_factura}
                                                                        </Typography>
                                                                        {row.imagen ?
                                                                            <div style={{ justifyContent: "center", display: "flex" }}>
                                                                                <img alt='some value' style={{ margin: "5px" }} key={row.imagen} src={row.imagen} width="150px" height="150px" />
                                                                            </div>
                                                                            : ""
                                                                        }

                                                                        <b>Fecha ingreso:</b> {row.fecha}<br></br>
                                                                        <b>Cliente:</b> {row.cliente}<br></br>
                                                                        <b>Numero de prendas:</b> {row.numero_prendas}<br></br>
                                                                        <b>Retirada:</b> {row.estado == 1 ? <label style={{ color: "red" }}>SI</label> : <label style={{ color: "red" }}>NO</label>}<br></br>
                                                                        <b>Observaciones:</b> {row.observaciones}<br></br>
                                                                    </CardContent>
                                                                </Card>
                                                            </>
                                                        ))
                                                        }

                                                    </>
                                                    : ""

                                                }



                                            </AccordionDetails>
                                        </Accordion>

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>Facturas salientes</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {facturasalientes !== null ?
                                                    <>
                                                        {facturasalientes.map((row) => (
                                                            <>
                                                                < Card sx={{ minWidth: 275, border: "solid" }}>

                                                                    <CardContent>
                                                                        <Typography sx={{ fontSize: 20, color: "whitesmoke" }} color="text.secondary" gutterBottom>
                                                                            Factura N° {row.numero_factura}
                                                                        </Typography>
                                                                        {row.imagen ?
                                                                            <div style={{ justifyContent: "center", display: "flex" }}>
                                                                                <img alt='some value' style={{ margin: "5px" }} key={row.imagen} src={row.imagen} width="150px" height="150px" />
                                                                            </div>
                                                                            : ""
                                                                        }

                                                                        <b>Fecha registro salida:</b> {row.fecha}<br></br>
                                                                        <b>Cliente:</b> {row.cliente}<br></br>
                                                                        <b>Observaciones:</b> {row.observaciones}<br></br>
                                                                    </CardContent>
                                                                </Card>
                                                            </>
                                                        ))
                                                        }

                                                    </>
                                                    : ""

                                                }



                                            </AccordionDetails>
                                        </Accordion>

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>Abonos</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {abonos !== null ?
                                                    <>
                                                        {abonos.map((row) => (
                                                            <>
                                                                < Card sx={{ minWidth: 275, border: "solid" }}>

                                                                    <CardContent>
                                                                        <Typography sx={{ fontSize: 20, color: "whitesmoke" }} color="text.secondary" gutterBottom>
                                                                            Factura N° {row.numero_factura}
                                                                        </Typography>
                                                                        

                                                                        <b>Fecha:</b> {row.fecha}<br></br>
                                                                        <b>Valor: $</b>{Number(row.valor).toLocaleString("en-CO")}<br></br>
                                                                    </CardContent>
                                                                </Card>
                                                            </>
                                                        ))
                                                        }

                                                    </>
                                                    : ""

                                                }



                                            </AccordionDetails>
                                        </Accordion>

                                    </Grid>
                                </>
                                :
                                ""
                        }





                    </Grid>
                </Box>
            </Container>
        </ThemeProvider >
    );
}
/*  */