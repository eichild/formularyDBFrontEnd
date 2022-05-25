import '../App.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { Axios } from 'axios'
import { Link } from 'react-router-dom';

// const validationPost = yup.object().shape({
//   servidor: yup.string().required("O servidor é obrigatório"),
//   usuario: yup.string().required("O usuario é obrigatório"),
//   senha: yup.string().required("A senha é obrigatório"),
//   tipo_banco: yup.string().required("O tipo de Banco de Dados é obrigatório"),

// }
// )
function App() {

  const initialValues = {
    servidor: "",
    usuario: "",
    senha: "",
    tipo_banco: ""
  }

  const [banco, setBanco] = useState(initialValues);

  function onChange(e) {
    const { name, value } = e.target;

    setBanco({ ...banco, [name]: value })
    console.log(banco)
  }

  function onSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:8080/api/banco-de-dados", banco)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log("Não foi possível cadastrar credenciais de banco de dados: " + error))
  }

  return (
    <div>
      <main>
        <div className='formulario'>
          <form onSubmit={onSubmit} action="/form" method="post">
            <div>
              <label>Servidor:</label>
              <input type="servidor" name="servidor" id='servidor'
                onChange={onChange}

              />
              {/* <p className='error-message'>{errors.servidor?.message}</p> */}
            </div>
            <div>
              <label>Tipo :</label>
              <select type="tipo" name="tipo_banco"
                // {...register("servidor")}

                onChange={onChange}
              >
                <option value='' className='option-select'>--Selecione o Tipo de Banco de Dados--</option>
                <option value="Oracle" name="">Oracle</option>
                <option value="SQL Server">SQL Server</option>               
              </select>
              {/* <p className='error-message'>{errors.servidor?.message}</p>*/}
            </div>


            <div>
              <label>Usuario:</label>
              <input type="text" name="usuario" id='usuario'
                // {...register("usuario")}

                onChange={onChange}
              />
              {/* <p className='error-message'>{errors.usuario?.message}</p> */}
            </div>

            <div>
              <label>Senha:</label>
              <input type="text" name="senha" id='senha'
                // {...register("senha")}

                onChange={onChange}
              />
              {/* <p className='error-message'>{errors.senha?.message}</p> */}
            </div>

            <div className="botoes">
              <button type="submit">Cadastrar</button>
              < Link to="/consulta"><button>Consultar</button></Link>
            </div>
          </form>
        </div>
      </main >
    </div >

  );
}



export default App
