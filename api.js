import axios from 'axios';

const API = "http://192.168.1.6:3000" ; /* coloca el " /" */

export const inicioSesion = async (datos) => {
 /*  console.log("entro a inicios de sesion" )
  console.log({datos}) */
 
  const apiUrl= `${API}/api/movil/inicioSesion`;
  const response =  await axios.post(apiUrl , datos)
  console.log(response)
  console.log("se logeo correctamente :"  + response.data._id)
  return  response;
};

export const listaHorarios = async (id_persona) => {
  const apiUrl= `${API}/api/movil/listarHorarios/${id_persona}`;
  const response =  await axios.get(apiUrl)
  console.log(response)
  console.log("se logeo correctamente :"  + response.data)
  return response;
};

export const validarCodigo = async (url) =>{
  const response = await axios.get(url)
  console.log(response.data._id)
  console.log("ha finalizado validar codigo")
  return response
}

export const validarHorario = async (id_aula , id_persona) => {
  const data = {
    idPersona:id_persona,
    idAula:id_aula
  }
  const apiUrl = `${API}/api/movil/validarHorario`
  const response = await axios.post(apiUrl , data);
  return response
};

