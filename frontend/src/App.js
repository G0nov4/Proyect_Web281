import React from 'react';

import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import DashboardAdmin from './components/DashboarAdministrador';
import DashboardGerencial from './components/DashboardGerencial';
import DashboardCliente from './components/DashboardCliente';
import Nuevo from './components/Nuevo';
import Editar from './components/Editar';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render={props=>(<Login {...props}/>)}></Route>
          <Route path="/admin/dashboard" exact render={props=>(<DashboardAdmin {...props}/>)}></Route>
          <Route path="/gerencial/dashboard" exact render={props=>(<DashboardGerencial {...props}/>)}></Route>
          <Route path="/dashboard" exact render={props=>(<DashboardCliente {...props}/>)}></Route>
          <Route path="/nuevo" exact render={props=>(<Nuevo {...props}/>)}></Route>
          <Route path="/editar" exact render={props=>(<Editar {...props}/>)}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
