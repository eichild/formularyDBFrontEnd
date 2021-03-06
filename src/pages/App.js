import '../App.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { Axios } from 'axios'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';


const validationPost = yup.object().shape({
  servidor: yup.string().required("* O servidor é obrigatório").max(100, "O Servidor precisa ter menos de 100 caracteres"),
  usuario: yup.string().required("* O usuario é obrigatório").max(100, "O Usuario precisa ter menos de 100 caracteres"),
  senha: yup.string().required("* A senha é obrigatório").max(100, "O Senha precisa ter menos de 100 caracteres"),
  tipo_banco: yup.string().required("* O Tipo de Banco é obrigatório"),
})

function App() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationPost)
  })

  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleCloseError = () => setShowError(false);

  const handleShow = () => setShow(true);
  const handleShowError = () => setShowError(true);


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

  function onSubmit() {
    axios.post("http://localhost:8080/api/banco-de-dados", banco)
      .then(response => {
        reset({
          servidor: "",
          tipo_banco: "",
          usuario: "",
          senha: ""
        })
        handleShow()
        console.log(response)
      })
      .catch(() => {
        handleShowError()
      })
  }

  return (
    <div>
      <main>
        <div className='formulario'>
          <div className='mensagem'>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Sucesso!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Informações cadastradas com sucesso!</Modal.Body>
              <Modal.Footer>
                <button className='buttonContinuar' onClick={handleClose}>
                  Continuar
                </button>
              </Modal.Footer>
            </Modal>

            <Modal show={showError} onHide={handleCloseError}>
              <Modal.Header closeButton>
                <Modal.Title>Falha!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Não foi possível cadastrar informações fornecidas. Por favor verificar campos!</Modal.Body>
              <Modal.Footer>
                <button className='buttonDeletar' onClick={handleCloseError}>
                  Voltar
                </button>
              </Modal.Footer>
            </Modal>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} action="/form" method="post">
            <div>
              <label>Servidor:</label>
              <input type="servidor" name="servidor" id='servidor'
                {...register("servidor")}

                onChange={onChange}
              />
              <p className='error-message'>{errors.servidor?.message}</p>
            </div>
            <div>
              <label>Tipo :</label>
              <select type="tipo" name="tipo_banco"
                {...register("tipo_banco")}
                onChange={onChange}
              >
                <option value='' className='option-select'>--Selecione o Tipo de Banco de Dados--</option>
                <option value="Oracle" name="">Oracle</option>
                <option value="SQL Server">SQL Server</option>
              </select>
              <p className='error-message'>{errors.tipo_banco?.message}</p>
            </div>


            <div>
              <label>Usuario:</label>
              <input type="text" name="usuario" id='usuario'
                {...register("usuario")}
                onChange={onChange}
              />
              <p className='error-message'>{errors.usuario?.message}</p>
            </div>

            <div>
              <label>Senha:</label>
              <input type="text" name="senha" id='senha'
                {...register("senha")}
                onChange={onChange}
              />
              <p className='error-message'>{errors.senha?.message}</p>
            </div>

            <div className="botoes">
              <button className='button' type="submit">Cadastrar</button>
              < Link to="/consulta"><button className='button'>Consultar</button></Link>
            </div>
          </form>
        </div>
      </main >
    </div >

  );
}



export default App
