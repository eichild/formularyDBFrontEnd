import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Table, Button } from "react-bootstrap";
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';


function Consulta() {
    const [banco, setBanco] = useState([])



    useEffect(() => {
        axios.get("http://localhost:8080/api/banco-de-dados")
            .then((response) => {
                setBanco(response.data)
                console.log(response.data)
            })
    }, [])
    

    function deleteBanco(id_banco){
        axios.delete('http://localhost:8080/api/banco-de-dados/' + id_banco)
        setBanco(banco.filter(banco => banco.id_banco !== id_banco))
    }

    return (
        <div>
            <Table  bordered  >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>SERVIDOR</th>
                        <th>TIPO</th>
                        <th>USUARIO</th>
                        <th>SENHA</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {banco.map((banco, key) => {
                        return (
                            <tr key={key}>
                                <td>{banco.id_banco}</td>
                                <td>{banco.servidor}</td>
                                <td>{banco.tipoBanco.tipo}</td>
                                <td>{banco.usuario}</td>
                                <td>{banco.senha}</td>
                                <Link to={{pathname: `/editar/${banco.id_banco}`}}><button variant="primary">Editar</button></Link>
                                <button variant="danger" onClick={() => deleteBanco(banco.id_banco)}>Deletar</button>
                            </tr>
                            
                        )
                    })}

                </tbody>
                <Link to={"/"}><button>Voltar</button></Link>
            </Table>
        </div>
    );
}

export default Consulta
