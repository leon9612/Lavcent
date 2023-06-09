
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Login from "./layout/login";
import Principal from "./layout/principal";
import Registro from "./layout/Registro";
import Rfactura from "./modulos/Rfactura";
import Fentrega from "./modulos/Fentrega";
import Cajamenor from "./modulos/Cajamenor";
import Informelav from "./modulos/Informelav";
import ActualizarF from "./modulos/ActualizarF";
import Consignaciones from "./modulos/Consignaciones";
import HistoricoCierreDia from "./modulos/HistoricoCierreDia";
import Buscarfactura from "./modulos/Buscarfactura";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/Co" component={Consignaciones}></Route>
      <Route exact path="/Act" component={ActualizarF}></Route>
      <Route exact path="/In" component={Informelav}></Route>
      <Route exact path="/Ca" component={Cajamenor}></Route>
      <Route exact path="/Fe" component={Fentrega}></Route>
      <Route exact path="/Rf" component={Rfactura}></Route>
      <Route exact path="/Pr" component={Principal}></Route>
      <Route exact path="/Re" component={Registro}></Route>
      <Route exact path="/Hcd" component={HistoricoCierreDia}></Route>
      <Route exact path="/Serch" component={Buscarfactura}></Route>
        <Route path="/" component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
