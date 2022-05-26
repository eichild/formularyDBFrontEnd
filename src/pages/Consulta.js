import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Table, Button } from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';


function Consulta() {
    const [banco, setBanco] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/banco-de-dados")
            .then((response) => {
                setBanco(response.data)
            })
    }, [])

    function deleteBanco(id_banco) {
        axios.delete('http://localhost:8080/api/banco-de-dados/' + id_banco)
        setBanco(banco.filter(banco => banco.id_banco !== id_banco))
    }

    return (
        <div>
            <Table bordered  >
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
                                <td>{banco.tipo_banco}</td>
                                <td>{banco.usuario}</td>
                                <td>{banco.senha}</td>
                                <div className='acoes'>
                                    <Link to={{ pathname: `/editar/${banco.id_banco}` }}><button className='buttonEditar'>Editar</button></Link>
                                    <button className='buttonDeletar' onClick={() => deleteBanco(banco.id_banco)}>Deletar</button>
                                </div>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className='div_voltar'>
                <Link to={"/"}><button className='button'>Voltar</button></Link>
            </div>
        </div>
    );
}

export default Consulta
