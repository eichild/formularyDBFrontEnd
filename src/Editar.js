import './App.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom';

const validationPost = yup.object().shape({
  servidor: yup.string().required("O servidor é obrigatório"),
  usuario: yup.string().required("O usuario é obrigatório"),
  senha: yup.string().required("A senha é obrigatório")
})

function Edit() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationPost)
  })
  const { id_banco } = useParams();
  const [banco, setBanco] = useState([]);
  const [tipo, setTipo] = useState([]);

  const history = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:8080/api/banco-de-dados/${id_banco}`)
      .then((response) => {
        reset(response.data)
        console.log(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8080/api/banco-de-dados")
      .then((response) => {
        setBanco(response.data)

      })
  }, [])
  
  const onSubmit = data => axios.put(`http://localhost:8080/api/banco-de-dados/${id_banco}`, data)
    .then((response) => {
      // history("/consulta")
      console.log(response.data)
    })
    .catch(error => console.log("Não foi possível atualizar as credenciais de banco de dados: " + error))

      // const handleInputChange = (e) => {
      //   const banco = e.banco
      //   setBanco(banco)
      // }
  return (
    <div>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} action="/form">
          <div>
            <label>Servidor:</label>
            <input type="text" name="servidor" {...register("servidor")} />

            <p className='error-message'>{errors.servidor?.message}</p>
          </div>

          <div>
            <label>Tipo :</label>
            <select className="tipo"
              name='tipo_banco' 
              value=""
              onChange={(e) => setBanco(e)}>
               
            </select>
          </div>
          
          <div>
            <label>Usuario:</label>
            <input type="text" name="usuario" {...register("usuario")}

            />
            <p className='error-message'>{errors.usuario?.message}</p>
          </div>

          <div>
            <label>Senha:</label>
            <input type="text" name="senha" {...register("senha")}

            />
            <p className='error-message'>{errors.senha?.message}</p>
          </div>

          <div className="botoes">
            <button type='submit'>Alterar</button>
            < Link to="/consulta"><button>Voltar</button></Link>
          </div>
        </form>
      </main>
    </div >

  );
}

export default Edit
