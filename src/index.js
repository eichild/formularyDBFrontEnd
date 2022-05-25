
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './pages/App';
import Consulta from './pages/Consulta';
import Edit from './pages/Editar';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/consulta' element={<Consulta />} />
        <Route path='/editar/:id_banco' element={<Edit />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);