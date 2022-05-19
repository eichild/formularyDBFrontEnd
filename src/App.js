import './App.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link } from 'react-router-dom';

const validationPost = yup.object().shape({
  servidor: yup.string().required("O servidor é obrigatório"),
  usuario: yup.string().required("O usuario é obrigatório"),
  senha: yup.string().required("A senha é obrigatório"),
  tipo: yup.string().required("O tipo de Banco de Dados é obrigatório")
})

function App() {
 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationPost)
  })

  const [banco, setBanco] = useState([]);
  const [tipo, setTipo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/tipo-banco-de-dados")
      .then((response) => {
        setTipo(response.data)
      })
  }, [])

  const onSubmit = data => axios.post("http://localhost:8080/api/banco-de-dados", data)
    .then(() => {
      console.log(data)
    })
    .catch(error => console.log("Não foi possível cadastrar credenciais de banco de dados: " + error))


return (
    <div>
      <main>
        <div className='formulario'>
          <form onSubmit={handleSubmit(onSubmit)} action="/form" method="post">
            <div>
              <label>Servidor:</label>
              <input type="text" name="servidor" {...register("servidor")}
                value={banco.servidor}
                onChange={(e) => setBanco(e.target.value)}
              />
              <p className='error-message'>{errors.servidor?.message}</p>
            </div>
            <div>
              <label>Tipo :</label>
              <select className="tipo" name='id_tipo'{...register("tipo")}
               value={tipo.id_tipo}
               onChange={(e) => setBanco(e.event.value)}
              >
                <option value='' className='option-select'>--Selecione o Tipo de Banco de Dados--</option>
                {tipo.map((tipo, key) => {
                  return (
                    <option key={key.id_tipo} value={tipo.id_tipo}>
                      {tipo.id_tipo}
                      
                    </option>
                    
                  )
                })}
              </select>
            </div>

            <div>
              <label>Usuario:</label>
              <input type="text" name="usuario" {...register("usuario")}
                value={banco.usuario}
                onChange={(e) => setBanco(e.target.value)}
              />
              <p className='error-message'>{errors.usuario?.message}</p>
            </div>

            <div>
              <label>Senha:</label>
              <input type="text" name="senha" {...register("senha")}
                value={banco.senha}
                onChange={(e) => setBanco(e.target.value)}
              />
              <p className='error-message'>{errors.senha?.message}</p>
            </div>

            <div className="botoes">
              <button type="submit">Cadastrar</button>
              < Link to="/consulta"><button>Consultar</button></Link>
            </div>
          </form>
        </div>
      </main>
    </div>

  );
}

export default App
