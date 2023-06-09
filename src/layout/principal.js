import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from "react-router-dom";
import { url } from "../layout/url";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function Principal() {
    let histori = useHistory();
    var nombre = localStorage.getItem("usuario")
    useEffect(() => {
        getFacturas();
    }, [])


    
    const [activas, setFacturasActivas] = useState([]);
    const [cerradas, setFacturasCerradas] = useState([]);
    const [gastos, setGastos] = useState([]);
    const getFacturas = async () => {
        const res = await fetch(url + "Ccontabilidad", {
            method: "POST",
            body: JSON.stringify({ function: "getTotaFacturas" }),
            headers: {
                'Autorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Ijg5NnNkYndmZTg3dmNzZGFmOTg0bmc4ZmdoMjRvMTI5MHIi.HraZ7y3eG3dGhKngzOWge-je8Y3lxZgldXjbRbcA7cA',
                'Content-Type': 'application/json',
            },
        })
        //const getcierre = await res.json();
        var data = await res.json();
        console.log(data)
        console.log(data.gastos[0])
        setFacturasActivas(data.activas[0])
        setFacturasCerradas(data.cerradas[0])
        setGastos(data.gastos[0])
    }
    //console.log(fa.activas[0].valac)
    return (
        <ThemeProvider theme={darkTheme}>

            <CssBaseline />
            <Container maxWidth="sm">
                <Typography style={{ textAlign: "left", Color: "whitesmoke" }}>
                    {nombre}
                </Typography>
                {activas !== null ?
                    <>
                        <Typography style={{ textAlign: "left", Color: "whitesmoke" }}>
                           <label>Facturas por cobrar: $</label>{activas.valac == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(activas.valac).toLocaleString("en-CO")}</label>}<br></br>
                           <label>Facturas cerradas: $</label>{cerradas.valacer == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(cerradas.valacer).toLocaleString("en-CO")}</label>}<br></br>
                           <label>Gastos: $</label>{gastos.valGastos == null ? <label style={{ color: "red" }}>0</label> : <label style={{ color: "red" }}>{Number(gastos.valGastos).toLocaleString("en-CO")}</label>}<br></br>
                        </Typography>
                    </>
                    : ""
                }
                
                <br></br>
                <Typography component="h1" variant="h4" style={{ textAlign: "center", textShadow: "7px 1px 5px blue" }}>
                    MODULOS
                </Typography>
                <br></br>
                <Grid container spacing={1} >
                    <Grid item xs={12} sm={12} >
                        <Stack direction="row" spacing={2}>
                            <Button onClick={() => { histori.push("/Rf"); }} variant="contained" style={{ width: "100%", height: "80px", backgroundColor: "#80cbc4" }} endIcon={<FactCheckIcon />}>
                                REGISTRAR FACTURA
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Stack direction="row" spacing={2}>
                            <Button onClick={() => { histori.push("/Act"); }} variant="contained" style={{ width: "100%", height: "80px", backgroundColor: "#80cbc4" }} endIcon={<FactCheckIcon />}>
                                ACTUALIZAR FACTURA
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Stack direction="row" spacing={2}>
                            <Button onClick={() => { histori.push("/Fe"); }} variant="contained" style={{ width: "100%", height: "80px", backgroundColor: "#80cbc4" }} endIcon={<SendIcon />}>
                                SALIDA FACTURA
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Stack direction="row" spacing={2}>
                            <Button onClick={() => { histori.push("/Ca"); }} variant="contained" style={{ width: "100%", height: "80px", backgroundColor: "#80cbc4" }} endIcon={<MonetizationOnIcon />}>
                                CAJA MENOR
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Stack direction="row" spacing={2}>
                            <Button onClick={() => { histori.push("/In"); }} variant="contained" style={{ width: "100%", height: "80px", backgroundColor: "#80cbc4" }} endIcon={<MonetizationOnIcon />}>
                                CIERRE DIA
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Stack direction="row" spacing={2}>
                            <Button onClick={() => { histori.push("/Hcd"); }} variant="contained" style={{ width: "100%", height: "80px", backgroundColor: "#80cbc4" }} endIcon={<MonetizationOnIcon />}>
                                HISTORICO CIERRE DIA
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Stack direction="row" spacing={2}>
                            <Button onClick={() => { histori.push("/Serch"); }} variant="contained" style={{ width: "100%", height: "80px", backgroundColor: "#80cbc4" }} endIcon={<FindInPageIcon />}>
                                BUSCAR FACTURA
                            </Button>
                        </Stack>
                    </Grid>
                    

                    
                </Grid>





            </Container>
        </ThemeProvider>
    );
}
