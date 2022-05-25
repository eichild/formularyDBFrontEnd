import '../App.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom';

const validationPost = yup.object().shape({
  servidor: yup.string().required("O servidor é obrigatório").max(100, "O Servidor precisa ter menos de 100 caracteres"),
  usuario: yup.string().required("O usuario é obrigatório").max(100, "O Usuario precisa ter menos de 100 caracteres"),
  senha: yup.string().required("A senha é obrigatório").max(100, "O Senha precisa ter menos de 100 caracteres"),
  tipo_banco: yup.string().required("o Tipo de Banco é obrigatório"),
})

function Edit() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationPost)
  })
  const { id_banco } = useParams();
  const [banco, setBanco] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/banco-de-dados/${id_banco}`)
      .then((response) => {
        reset(response.data)
      })
  }, [])

  const onSubmit = data => axios.put(`http://localhost:8080/api/banco-de-dados/${id_banco}`, data)
    .then(() => {
      history("/consulta")
    })
    .catch(error => console.log("Não foi possível atualizar as credenciais de banco de dados: " + error))

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
            <select type="tipo" name="tipo_banco"
              {...register("tipo_banco")}>
              <option value="Oracle" name="">Oracle</option>
              <option value="SQL Server">SQL Server</option>
            </select>
            <p className='error-message'>{errors.servidor?.message}</p>
          </div>
          <div>
            <label>Usuario:</label>
            <input type="text" name="usuario" {...register("usuario")} />
            <p className='error-message'>{errors.usuario?.message}</p>
          </div>
          <div>
            <label>Senha:</label>
            <input type="text" name="senha" {...register("senha")}/>
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
