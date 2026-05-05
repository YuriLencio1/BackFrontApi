import { useEffect, useState, useRef, use  } from "react";
import "./App.css";
import Lixeira from "../../assets/lixeira.png";
import api from "../../servers/api";

function App() {
const [users, setUsers] = useState([])
const [editingId, setEditingId] = useState()
const inputName= useRef()
const inputAge = useRef()
const inputEmail=useRef()
const inputPesquisa=useRef()

async function getUsers(params) {
  const usersFromApi = await api.get('/usuarios')  

  setUsers(usersFromApi.data)
}
  async function createUsers() {

    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value

      
    })
    limparInputs();
    getUsers();
  }


    async function deleteUsers(id) {

    await api.delete(`/usuarios/${id}`)
    
    getUsers();
  }

    async function pesquisaUser() {
      
      const usersFromApi = await api.get('/usuarios',{
        params:{
       name: inputPesquisa.current.value,
      }})  
        setUsers(usersFromApi.data);
    }
    
     function prepararEdicao(user) {
      name: inputName.current.value = user.name;
      email: inputEmail.current.value = user.email;
      age: inputAge.current.value = user.age;

     
      setEditingId(user.id);
     }
      async function editarUser() {
            await api.put(`/usuarios/${editingId}`, {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: Number(inputAge.current.value),
      });

      setEditingId(null)
      limparInputs();
      getUsers();
        
      name: inputName.current.value = "";
      email: inputEmail.current.value = "";
      age: inputAge.current.value = "",

       getUsers();
    }

     function limparInputs() {
    inputName.current.value = "";
    inputEmail.current.value = "";
    inputAge.current.value = "";
  }


  
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de usuario</h1>
          <input name="nome" type="text" placeholder="Nome" ref={inputName} />
          <input name="email" type="text" placeholder="Email" ref={inputEmail}/>
          <input name="idade" type="number" placeholder="Idade" ref={inputAge} />
          <button type="button" onClick={editingId ? editarUser : createUsers}>{editingId ? "Salvar edição" : "Cadastrar"}</button>
          
          <input type="text" name="pesquisa" placeholder="Pesquisar" ref={inputPesquisa} />
          <button type="button" onClick={pesquisaUser}>Pesquisar</button>




        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Idade: {user.age}</p>
            </div>
            <button type="button" onClick={() => prepararEdicao(user)}>Editar</button>
            <button type="button" onClick={() => deleteUsers(user.id)}>
              
              <img className="icone-lixeira" src={Lixeira} alt="Excluir" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default App;